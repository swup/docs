'use strict';

const { readFileSync, existsSync } = require('fs');
const { join } = require('path');

const RAW_PATH = join(__dirname, 'typedoc.json');

// TypeDoc kind bitmask values
const KIND_MAP = {
	128: 'class',
	256: 'interface',
	64: 'function',
	2097152: 'typeAlias',
	4194304: 'reference'
};

const KIND_LABELS = {
	class: 'Class',
	interface: 'Interface',
	function: 'Function',
	typeAlias: 'Type Alias'
};

/** Extract plain-text summary from a TypeDoc comment node */
function getSummary(node) {
	if (!node?.comment?.summary?.length) return '';
	return node.comment.summary
		.map((s) => s.text)
		.join('')
		.trim();
}

/** Recursively convert a TypeDoc type node to a human-readable string */
function typeToString(type, depth = 0) {
	if (!type) return '...';
	if (depth > 4) return '...';
	switch (type.type) {
		case 'intrinsic':
			return type.name;
		case 'literal':
			return JSON.stringify(type.value);
		case 'reference': {
			const args = (type.typeArguments || []).map((a) => typeToString(a, depth + 1)).join(', ');
			return args ? `${type.name}<${args}>` : type.name;
		}
		case 'array':
			return `${typeToString(type.elementType, depth + 1)}[]`;
		case 'union': {
			const parts = (type.types || []).map((t) => typeToString(t, depth + 1));
			const str = parts.join(' | ');
			return depth > 0 && parts.length > 1 ? `(${str})` : str;
		}
		case 'intersection':
			return (type.types || []).map((t) => typeToString(t, depth + 1)).join(' & ');
		case 'typeOperator':
			return `${type.operator} ${typeToString(type.target, depth + 1)}`;
		case 'reflection': {
			const decl = type.declaration;
			if (!decl) return '{}';
			if (decl.signatures?.length) {
				const sig = decl.signatures[0];
				const params = (sig.parameters || [])
					.filter((p) => p.name !== 'this')
					.map(
						(p) =>
							`${p.name}${p.flags?.isOptional ? '?' : ''}: ${typeToString(p.type, depth + 1)}`
					)
					.join(', ');
				return `(${params}) => ${typeToString(sig.type, depth + 1)}`;
			}
			if (decl.children?.length) {
				if (depth >= 2) return '{ ... }';
				const props = decl.children
					.map(
						(c) =>
							`${c.name}${c.flags?.isOptional ? '?' : ''}: ${typeToString(c.type, depth + 1)}`
					)
					.join('; ');
				return `{ ${props} }`;
			}
			return '{}';
		}
		case 'tuple':
			return `[${(type.elements || []).map((e) => typeToString(e, depth + 1)).join(', ')}]`;
		case 'templateLiteral':
			return '`...`';
		case 'conditional':
			if (depth >= 2) return '...';
			return (
				`${typeToString(type.checkType, depth + 1)} extends ` +
				`${typeToString(type.extendsType, depth + 1)} ? ` +
				`${typeToString(type.trueType, depth + 1)} : ` +
				`${typeToString(type.falseType, depth + 1)}`
			);
		case 'inferred':
			return `infer ${type.name}`;
		case 'predicate':
			return type.targetType
				? `${type.name} is ${typeToString(type.targetType, depth + 1)}`
				: type.name;
		case 'rest':
			return `...${typeToString(type.elementType, depth + 1)}`;
		case 'optional':
			return `${typeToString(type.elementType, depth + 1)}?`;
		case 'mapped':
			return '{ [K in ...]: ... }';
		case 'named-tuple-member': {
			const elem = type.element || type.elementType;
			return type.name ? `${type.name}: ${typeToString(elem, depth + 1)}` : typeToString(elem, depth + 1);
		}
		default:
			return type.name || '...';
	}
}

/** Get the type string for a member node (property or method) */
function getMemberTypeString(member) {
	if (member.type) return typeToString(member.type);
	if (member.signatures?.length) {
		const sig = member.signatures[0];
		const typeParams = sig.typeParameter?.length
			? `<${sig.typeParameter.map((t) => t.name).join(', ')}>`
			: '';
		const params = (sig.parameters || [])
			.filter((p) => p.name !== 'this')
			.map((p) => `${p.name}${p.flags?.isOptional ? '?' : ''}: ${typeToString(p.type)}`)
			.join(', ');
		return `${typeParams}(${params}) => ${typeToString(sig.type)}`;
	}
	return '';
}

/** Normalize a member (property or method) node */
function normalizeMember(member) {
	return {
		name: member.name,
		type: getMemberTypeString(member),
		optional: !!member.flags?.isOptional,
		isReadonly: !!member.flags?.isReadonly,
		summary: getSummary(member)
	};
}

/** Normalize function signatures */
function normalizeSignatures(node) {
	const sigs = node.signatures || [];
	return sigs.map((sig) => {
		const typeParams = (sig.typeParameter || []).map((tp) => ({
			name: tp.name,
			constraint: tp.type ? typeToString(tp.type) : null
		}));
		const params = (sig.parameters || [])
			.filter((p) => p.name !== 'this')
			.map((p) => ({
				name: p.name,
				type: typeToString(p.type),
				optional: !!p.flags?.isOptional,
				summary: getSummary(p)
			}));
		return {
			summary: getSummary(sig) || getSummary(node),
			typeParams,
			params,
			returns: typeToString(sig.type)
		};
	});
}

/** Normalize a top-level TypeDoc declaration node into a template-ready object */
function normalize(node) {
	const kind = KIND_MAP[node.kind] || 'unknown';
	const summary = getSummary(node);
	const slug = node.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

	// Members: present on class/interface, and on typeAlias that is an object literal
	const rawMembers = node.children || [];
	const hasMembers = rawMembers.length > 0;

	// Source location from first sources entry
	const src = node.sources?.[0];
	const sourceUrl = src?.url || null;
	const sourceFile = src ? `src/${src.fileName}` : null;

	return {
		name: node.name,
		slug,
		kind,
		kindLabel: KIND_LABELS[kind] || kind,
		summary,
		sourceUrl,
		sourceFile,
		// For class/interface or object-literal typeAlias
		members: hasMembers
			? rawMembers
					.filter((m) => !m.flags?.isPrivate && !m.flags?.isProtected)
					.map(normalizeMember)
			: [],
		// For function
		signatures: kind === 'function' ? normalizeSignatures(node) : [],
		// For simple typeAlias (no children)
		typeExpr: kind === 'typeAlias' && !hasMembers && node.type ? typeToString(node.type) : ''
	};
}

module.exports = function () {
	if (!existsSync(RAW_PATH)) {
		console.warn(
			'[swupTypes] src/_data/typedoc.json not found — run `npm run build:types` first'
		);
		return [];
	}

	const raw = JSON.parse(readFileSync(RAW_PATH, 'utf8'));
	const children = raw.children || [];

	return children
		.filter((c) => c.kind !== 4194304) // exclude re-export references
		.map(normalize)
		.sort((a, b) => a.name.localeCompare(b.name));
};
