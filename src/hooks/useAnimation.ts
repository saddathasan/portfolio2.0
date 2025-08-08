import { useEffect, useState } from 'react';
import type { AnimationProps } from '@/types';

interface UseAnimationOptions extends AnimationProps {
	enabled?: boolean;
	triggerOnce?: boolean;
	threshold?: number;
}

interface AnimationVariants {
	hidden: {
		opacity: number;
		y?: number;
		x?: number;
		scale?: number;
		rotate?: number;
	};
	visible: {
		opacity: number;
		y?: number;
		x?: number;
		scale?: number;
		rotate?: number;
		transition?: {
			duration?: number;
			delay?: number;
			ease?: string | number[];
			staggerChildren?: number;
		};
	};
}

// Predefined animation variants
export const animationVariants = {
	fadeIn: {
		hidden: { opacity: 0 },
		visible: { opacity: 1 }
	},
	fadeInUp: {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 }
	},
	fadeInDown: {
		hidden: { opacity: 0, y: -20 },
		visible: { opacity: 1, y: 0 }
	},
	fadeInLeft: {
		hidden: { opacity: 0, x: -20 },
		visible: { opacity: 1, x: 0 }
	},
	fadeInRight: {
		hidden: { opacity: 0, x: 20 },
		visible: { opacity: 1, x: 0 }
	},
	scaleIn: {
		hidden: { opacity: 0, scale: 0.8 },
		visible: { opacity: 1, scale: 1 }
	},
	rotateIn: {
		hidden: { opacity: 0, rotate: -10 },
		visible: { opacity: 1, rotate: 0 }
	},
	slideInUp: {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0 }
	},
	slideInDown: {
		hidden: { opacity: 0, y: -50 },
		visible: { opacity: 1, y: 0 }
	}
} as const;

export type AnimationVariantName = keyof typeof animationVariants;

// Hook for managing animations
export function useAnimation({
	animate = true,
	delay = 0,
	duration = 0.6,
	enabled = true,
	triggerOnce = true,
	threshold = 0.1
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

	// Create animation variants with custom timing
	const createVariants = (variantName: AnimationVariantName): AnimationVariants => {
		const baseVariant = animationVariants[variantName];
		return {
			hidden: baseVariant.hidden,
			visible: {
				...baseVariant.visible,
				transition: {
					duration: prefersReducedMotion ? 0.1 : duration,
					delay: prefersReducedMotion ? 0 : delay,
					ease: [0.25, 0.1, 0.25, 1] // Custom easing
				}
			}
		};
	};

	// Determine if animation should be active
	const shouldAnimate = enabled && animate && !prefersReducedMotion;
	const shouldShow = shouldAnimate ? (triggerOnce ? hasTriggered : isInView) : true;

	// Viewport options for intersection observer
	const viewportOptions = {
		once: triggerOnce,
		margin: '0px 0px -10% 0px',
		amount: threshold
	};

	// Handle intersection
	const handleIntersection = (inView: boolean) => {
		setIsInView(inView);
		if (inView && !hasTriggered) {
			setHasTriggered(true);
		}
	};

	return {
		// Animation state
		isInView,
		hasTriggered,
		shouldAnimate,
		shouldShow,
		prefersReducedMotion,
		
		// Viewport options
		viewportOptions,
		handleIntersection,
		
		// Variant creators
		createVariants,
		
		// Common animation props
		getAnimationProps: (variantName: AnimationVariantName = 'fadeInUp') => ({
			initial: shouldAnimate ? 'hidden' : 'visible',
			animate: shouldShow ? 'visible' : 'hidden',
			variants: createVariants(variantName),
			viewport: viewportOptions
		}),
		
		// Stagger animation props for containers
		getStaggerProps: (staggerDelay: number = 0.1) => ({
			initial: shouldAnimate ? 'hidden' : 'visible',
			animate: shouldShow ? 'visible' : 'hidden',
			variants: {
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: {
						staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
						delayChildren: prefersReducedMotion ? 0 : delay
					}
				}
			},
			viewport: viewportOptions
		})
	};
}

// Hook for scroll-triggered animations
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

// Hook for hover animations
export function useHoverAnimation() {
	const [isHovered, setIsHovered] = useState(false);

	const hoverProps = {
		onMouseEnter: () => setIsHovered(true),
		onMouseLeave: () => setIsHovered(false)
	};

	const getHoverVariants = (scale: number = 1.05) => ({
		idle: { scale: 1 },
		hover: { scale, transition: { duration: 0.2 } }
	});

	return {
		isHovered,
		hoverProps,
		getHoverVariants,
		animateState: isHovered ? 'hover' : 'idle'
	};
}

// Hook for focus animations
export function useFocusAnimation() {
	const [isFocused, setIsFocused] = useState(false);

	const focusProps = {
		onFocus: () => setIsFocused(true),
		onBlur: () => setIsFocused(false)
	};

	const getFocusVariants = () => ({
		idle: { scale: 1, boxShadow: '0 0 0 0px rgba(59, 130, 246, 0)' },
		focus: { 
			scale: 1.02, 
			boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
			transition: { duration: 0.2 }
		}
	});

	return {
		isFocused,
		focusProps,
		getFocusVariants,
		animateState: isFocused ? 'focus' : 'idle'
	};
}