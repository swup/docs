import { gsap } from "gsap";

export default () => {
	const tl = gsap.timeline({delay: 0.5});
	return {

		async init() {

			await this.$nextTick();

			const popIn = {
				y: 50,
				duration: 0.4,
				autoAlpha: 0,
				ease: "back.out",
				clearProps: 'all',
				transition: 'none'
			}

			tl.from(this.$refs.logo, {
				y: 50,
				scaleY: 3,
				ease: "quint.out",
				duration: 0.7
			}, 0);

			const letterDelay = "<0.1";
			tl.from(this.$refs.s, popIn, 0);
			tl.from(this.$refs.w, popIn, letterDelay);
			tl.from(this.$refs.u, popIn, letterDelay);
			tl.from(this.$refs.p, popIn, letterDelay);

			tl.from(this.$refs.dot1, {...popIn, y: -20}, "<0.3");
			tl.from(this.$refs.dot2, {...popIn, y: -20}, letterDelay);

			const fadeIn = {
				autoAlpha: 0,
				y: 20,
				ease: "quart.easeOut",
				duration: 0.4,
				clearProps: 'all',
			};
			tl.from(this.$refs.slogan, fadeIn, "<0.3");

			tl.from(this.$refs.button1, fadeIn, letterDelay);
			tl.from(this.$refs.button2, fadeIn, letterDelay);

		}

	}
}
