import { gsap } from "gsap";

export default () => {
	const tl = gsap.timeline({delay: 0.2});
	return {

		init() {
			const popIn = {
				y: 50,

				duration: 1.2,
				autoAlpha: 0,
				ease: "elastic.out"
			}
			tl.from(this.$refs.logo, {
				y: 50,
				scaleY: 3,
				ease: "quint.out",
				duration: 0.7
			});
			const letterDelay = "<0.1";
			tl.from(this.$refs.s, popIn, 0);
			tl.from(this.$refs.w, popIn, letterDelay);
			tl.from(this.$refs.u, popIn, letterDelay);
			tl.from(this.$refs.p, popIn, letterDelay);

			tl.from(this.$refs.dot1, {...popIn, y: 20}, letterDelay);
			tl.from(this.$refs.dot2, {...popIn, y: 20}, letterDelay);

			const fadeIn = {...popIn, y: 20, ease: "quart.easeOut", duration: 0.4};
			tl.from(this.$refs.slogan, fadeIn, "<0.5");
			tl.from(this.$refs.buttons, fadeIn, letterDelay);
			// tl.from(this.$refs.button2, fadeIn, letterDelay);
		}

	}
}
