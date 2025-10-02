import { useEffect, useState } from 'react';
import type { AnimationProps } from '@/types';

interface UseAnimationOptions extends AnimationProps {
	enabled?: boolean;
	triggerOnce?: boolean;
	threshold?: number;
}

// Simplified animation variants for minimal aesthetic
export const animationVariants = {
	fadeIn: {
		hidden: { opacity: 0 },
		visible: { opacity: 1 }
	},
	fadeInUp: {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 }
	}
} as const;

export type AnimationVariantName = keyof typeof animationVariants;

// Simplified hook for managing animations
export function useAnimation({
	animate = true,
	delay = 0,
	duration = 0.3,
	enabled = true,
	triggerOnce = true
}: UseAnimationOptions = {}) {
	const [isInView, setIsInView] = useState(false);
	const [hasTriggered, setHasTriggered] = useState(false);

	// Check if animations should be disabled based on user preference
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		setPrefersReducedMotion(mediaQuery.matches);

		const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	// Determine if animation should be active
	const shouldAnimate = enabled && animate && !prefersReducedMotion;
	const shouldShow = shouldAnimate ? (triggerOnce ? hasTriggered : isInView) : true;

	// Handle intersection
	const handleIntersection = (inView: boolean) => {
		setIsInView(inView);
		if (inView && !hasTriggered) {
			setHasTriggered(true);
		}
	};

	return {
		isInView,
		hasTriggered,
		shouldAnimate,
		shouldShow,
		prefersReducedMotion,
		handleIntersection,
		
		// Minimal animation props
		getAnimationProps: (variantName: AnimationVariantName = 'fadeInUp') => ({
			initial: shouldAnimate ? 'hidden' : 'visible',
			animate: shouldShow ? 'visible' : 'hidden',
			variants: {
				hidden: animationVariants[variantName].hidden,
				visible: {
					...animationVariants[variantName].visible,
					transition: {
						duration: prefersReducedMotion ? 0.1 : duration,
						delay: prefersReducedMotion ? 0 : delay,
						ease: 'easeOut'
					}
				}
			}
		})
	};
}

// Simplified scroll animation hook
export function useScrollAnimation(threshold: number = 0.1) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold }
		);

		return () => observer.disconnect();
	}, [threshold]);

	return { isVisible };
}

// Minimal hover animation hook
export function useHoverAnimation() {
	const [isHovered, setIsHovered] = useState(false);

	const hoverProps = {
		onMouseEnter: () => setIsHovered(true),
		onMouseLeave: () => setIsHovered(false)
	};

	return {
		isHovered,
		hoverProps,
		animateState: isHovered ? 'hover' : 'idle'
	};
}