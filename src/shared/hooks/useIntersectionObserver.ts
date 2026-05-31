import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
	root?: Element | null;
	rootMargin?: string;
	threshold?: number | number[];
	freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
	options: UseIntersectionObserverOptions = {}
): [React.RefObject<Element>, boolean] {
	const {
		root = null,
		rootMargin = '0px',
		threshold = 0,
		freezeOnceVisible = false
	} = options;

	const elementRef = useRef<Element>(null);
	const [isIntersecting, setIsIntersecting] = useState(false);
	const frozen = useRef(false);

	useEffect(() => {
		const element = elementRef.current;
		if (!element) return;

		// If frozen and once visible, don't update
		if (frozen.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				const isElementIntersecting = entry.isIntersecting;
				setIsIntersecting(isElementIntersecting);

				// Freeze if element becomes visible and freezeOnceVisible is true
				if (isElementIntersecting && freezeOnceVisible) {
					frozen.current = true;
				}
			},
			{ root, rootMargin, threshold }
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	}, [root, rootMargin, threshold, freezeOnceVisible]);

	return [elementRef as React.RefObject<Element>, isIntersecting];
}