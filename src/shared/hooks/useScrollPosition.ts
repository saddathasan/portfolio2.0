import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

interface ScrollPosition {
	x: number;
	y: number;
}

export function useScrollPosition(delay: number = 100): ScrollPosition {
	const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
	const debouncedPosition = useDebounce(position, delay);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const handleScroll = () => {
			setPosition({
				x: window.scrollX,
				y: window.scrollY
			});
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return debouncedPosition;
}