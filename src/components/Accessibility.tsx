import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { useFocusManagement } from '@/hooks/useFocusManagement';
import { cn } from '@/utils';

// Skip to content link
interface SkipLinkProps {
	targetId: string;
	children: React.ReactNode;
	className?: string;
}

export function SkipLink({ targetId, children, className }: SkipLinkProps) {
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		const target = document.getElementById(targetId);
		if (target) {
			target.focus();
			target.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<a
			href={`#${targetId}`}
			onClick={handleClick}
			className={cn(
				'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4',
				'z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md',
				'font-medium transition-all duration-200',
				'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
				className
			)}
		>
			{children}
		</a>
	);
}

// Screen reader only text
interface ScreenReaderOnlyProps {
	children: React.ReactNode;
	className?: string;
}

export function ScreenReaderOnly({ children, className }: ScreenReaderOnlyProps) {
	return (
		<span className={cn('sr-only', className)}>
			{children}
		</span>
	);
}

// Live region for announcements
interface LiveRegionProps {
	message: string;
	politeness?: 'polite' | 'assertive' | 'off';
	atomic?: boolean;
	relevant?: 'additions' | 'removals' | 'text' | 'all';
}

export function LiveRegion({ 
	message, 
	politeness = 'polite', 
	atomic = true,
	relevant = 'all'
}: LiveRegionProps) {
	return (
		<div
			aria-live={politeness}
			aria-atomic={atomic}
			aria-relevant={relevant}
			className="sr-only"
		>
			{message}
		</div>
	);
}

// Announcement system
interface AnnouncementContextType {
	announce: (message: string, politeness?: 'polite' | 'assertive') => void;
}

const AnnouncementContext = React.createContext<AnnouncementContextType | undefined>(undefined);

export function AnnouncementProvider({ children }: { children: React.ReactNode }) {
	const [announcements, setAnnouncements] = useState<Array<{
		id: string;
		message: string;
		politeness: 'polite' | 'assertive';
	}>>([]);

	const announce = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
		const id = Math.random().toString(36).substr(2, 9);
		setAnnouncements(prev => [...prev, { id, message, politeness }]);

		// Remove announcement after a delay
		setTimeout(() => {
			setAnnouncements(prev => prev.filter(a => a.id !== id));
		}, 1000);
	};

	return (
		<AnnouncementContext.Provider value={{ announce }}>
			{children}
			{announcements.map(({ id, message, politeness }) => (
				<LiveRegion
					key={id}
					message={message}
					politeness={politeness}
				/>
			))}
		</AnnouncementContext.Provider>
	);
}

export function useAnnouncement() {
	const context = React.useContext(AnnouncementContext);
	if (!context) {
		throw new Error('useAnnouncement must be used within AnnouncementProvider');
	}
	return context;
}

// Focus trap component
interface FocusTrapProps {
	children: React.ReactNode;
	enabled?: boolean;
	restoreFocus?: boolean;
	autoFocus?: boolean;
	className?: string;
}

export function FocusTrap({ 
	children, 
	enabled = true, 
	restoreFocus = true, 
	autoFocus = true,
	className 
}: FocusTrapProps) {
	const { containerRef } = useFocusManagement({
		restoreFocus,
		autoFocus,
		trapFocus: enabled
	});

	return (
		<div ref={containerRef as React.RefObject<HTMLDivElement>} className={className}>
			{children}
		</div>
	);
}

// Accessible button component
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
	size?: 'sm' | 'md' | 'lg';
	loading?: boolean;
	loadingText?: string;
	children: React.ReactNode;
}

export function AccessibleButton({
	variant = 'primary',
	size = 'md',
	loading = false,
	loadingText = 'Loading...',
	children,
	className,
	disabled,
	...props
}: AccessibleButtonProps) {
	const isDisabled = disabled || loading;

	return (
		<button
			{...props}
			disabled={isDisabled}
			aria-disabled={isDisabled}
			aria-describedby={loading ? 'loading-description' : undefined}
			className={cn(
				'inline-flex items-center justify-center rounded-md font-medium',
				'transition-colors focus-visible:outline-none focus-visible:ring-2',
				'focus-visible:ring-ring focus-visible:ring-offset-2',
				'disabled:pointer-events-none disabled:opacity-50',
				{
					'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
					'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
					'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
					'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
					'h-9 px-3 text-sm': size === 'sm',
					'h-10 px-4 py-2': size === 'md',
					'h-11 px-8 text-lg': size === 'lg'
				},
				className
			)}
		>
			{loading ? (
				<>
					<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
					{loadingText}
					<ScreenReaderOnly>
						Button is loading, please wait
					</ScreenReaderOnly>
				</>
			) : (
				children
			)}
		</button>
	);
}

// Accessible form field component
interface AccessibleFieldProps {
	label: string;
	id: string;
	error?: string;
	helpText?: string;
	required?: boolean;
	children: React.ReactElement;
	className?: string;
}

export function AccessibleField({
	label,
	id,
	error,
	helpText,
	required = false,
	children,
	className
}: AccessibleFieldProps) {
	const helpId = helpText ? `${id}-help` : undefined;
	const errorId = error ? `${id}-error` : undefined;
	const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined;

	return (
		<div className={cn('space-y-2', className)}>
			<label
				htmlFor={id}
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{label}
				{required && (
					<span className="text-destructive ml-1" aria-label="required">
						*
					</span>
				)}
			</label>
			{React.cloneElement(children, {
				id,
				'aria-describedby': describedBy,
				'aria-invalid': !!error,
				'aria-required': required
			} as React.HTMLAttributes<HTMLElement>)}
			{helpText && (
				<p id={helpId} className="text-sm text-muted-foreground">
					{helpText}
				</p>
			)}
			{error && (
				<p id={errorId} className="text-sm text-destructive" role="alert">
					{error}
				</p>
			)}
		</div>
	);
}

// Accessible modal/dialog component
interface AccessibleModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	description?: string;
	children: React.ReactNode;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	closeOnOverlayClick?: boolean;
	closeOnEscape?: boolean;
}

export function AccessibleModal({
	isOpen,
	onClose,
	title,
	description,
	children,
	size = 'md',
	closeOnOverlayClick = true,
	closeOnEscape = true
}: AccessibleModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);
	const { announce } = useAnnouncement();

	// Handle escape key
	useEffect(() => {
		if (!isOpen || !closeOnEscape) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [isOpen, closeOnEscape, onClose]);

	// Announce modal state changes
	useEffect(() => {
		if (isOpen) {
			announce(`${title} dialog opened`);
		} else {
			announce('Dialog closed');
		}
	}, [isOpen, title, announce]);

	// Handle overlay click
	const handleOverlayClick = (e: React.MouseEvent) => {
		if (closeOnOverlayClick && e.target === e.currentTarget) {
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
				onClick={handleOverlayClick}
			>
				<div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
					<FocusTrap>
						<motion.div
							ref={modalRef}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-title"
							aria-describedby={description ? 'modal-description' : undefined}
							className={cn(
								'bg-background border rounded-lg shadow-lg',
								'focus:outline-none focus:ring-2 focus:ring-ring',
								{
									'max-w-sm': size === 'sm',
									'max-w-md': size === 'md',
									'max-w-lg': size === 'lg',
									'max-w-xl': size === 'xl'
								}
							)}
						>
							<div className="p-6">
								<div className="flex items-center justify-between mb-4">
									<h2 id="modal-title" className="text-lg font-semibold">
										{title}
									</h2>
									<button
										onClick={onClose}
										aria-label="Close dialog"
										className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
									>
										<span className="sr-only">Close</span>
										<svg
											width="15"
											height="15"
											viewBox="0 0 15 15"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="m11.7816 4.03157c.0824-.07446.0824-.19618 0-.27064L11.4926 3.46226c-.0824-.07446-.2186-.07446-.301 0L7.50002 7.14832 3.80844 3.46226c-.08246-.07446-.21814-.07446-.30061 0L3.21916 3.76093c-.08246.07446-.08246.19618 0 .27064L6.91074 7.50002 3.21916 11.2391c-.08246.0745-.08246.1962 0 .2707l.28867.2896c.08247.0745.21815.0745.30061 0L7.50002 8.14171l3.69158 3.68896c.0824.0745.2186.0745.301 0l.2887-.2896c.0824-.0745.0824-.1962 0-.2707L8.08929 7.50002 11.7816 4.03157Z"
												fill="currentColor"
												fillRule="evenodd"
												clipRule="evenodd"
											/>
										</svg>
									</button>
								</div>
								{description && (
									<p id="modal-description" className="text-sm text-muted-foreground mb-4">
										{description}
									</p>
								)}
								{children}
							</div>
						</motion.div>
					</FocusTrap>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}

// Accessible progress indicator
interface AccessibleProgressProps {
	value: number;
	max?: number;
	label?: string;
	showValue?: boolean;
	size?: 'sm' | 'md' | 'lg';
	variant?: 'default' | 'success' | 'warning' | 'error';
	className?: string;
}

export function AccessibleProgress({
	value,
	max = 100,
	label,
	showValue = false,
	size = 'md',
	variant = 'default',
	className
}: AccessibleProgressProps) {
	const percentage = Math.round((value / max) * 100);
	const progressId = React.useId();

	return (
		<div className={cn('space-y-2', className)}>
			{label && (
				<div className="flex justify-between items-center">
					<label htmlFor={progressId} className="text-sm font-medium">
						{label}
					</label>
					{showValue && (
						<span className="text-sm text-muted-foreground">
							{percentage}%
						</span>
					)}
				</div>
			)}
			<div
				id={progressId}
				role="progressbar"
				aria-valuenow={value}
				aria-valuemin={0}
				aria-valuemax={max}
				aria-label={label || `Progress: ${percentage}%`}
				className={cn(
					'w-full bg-secondary rounded-full overflow-hidden',
					{
						'h-1': size === 'sm',
						'h-2': size === 'md',
						'h-3': size === 'lg'
					}
				)}
			>
				<div
					className={cn(
						'h-full transition-all duration-300 ease-out',
						{
							'bg-primary': variant === 'default',
							'bg-green-500': variant === 'success',
							'bg-yellow-500': variant === 'warning',
							'bg-red-500': variant === 'error'
						}
					)}
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</div>
	);
}

// High contrast mode toggle
export function HighContrastToggle() {
	const { highContrast, setHighContrast } = useApp();
	const { announce } = useAnnouncement();

	const handleToggle = () => {
		const newValue = !highContrast;
		setHighContrast(newValue);
		announce(`High contrast mode ${newValue ? 'enabled' : 'disabled'}`);
	};

	return (
		<AccessibleButton
			variant="ghost"
			size="sm"
			onClick={handleToggle}
			aria-pressed={highContrast}
			aria-label={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
		>
			<span className="sr-only">
				{highContrast ? 'Disable' : 'Enable'} high contrast mode
			</span>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
				<path d="M8 1 A7 7 0 0 1 8 15 Z" fill="currentColor" />
			</svg>
		</AccessibleButton>
	);
}

// Reduced motion toggle
export function ReducedMotionToggle() {
	const { preferences, setPreferences } = useApp();
	const { announce } = useAnnouncement();

	const handleToggle = () => {
		const newValue = !preferences.animationsEnabled;
		setPreferences({ animationsEnabled: newValue });
		announce(`Animations ${newValue ? 'enabled' : 'disabled'}`);
	};

	return (
		<AccessibleButton
			variant="ghost"
			size="sm"
			onClick={handleToggle}
			aria-pressed={preferences.animationsEnabled}
			aria-label={`${preferences.animationsEnabled ? 'Disable' : 'Enable'} animations`}
		>
			<span className="sr-only">
				{preferences.animationsEnabled ? 'Disable' : 'Enable'} animations
			</span>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M8 2L10 6H14L11 9L12 13L8 11L4 13L5 9L2 6H6L8 2Z"
					stroke="currentColor"
					strokeWidth="2"
					fill={preferences.animationsEnabled ? 'currentColor' : 'none'}
				/>
			</svg>
		</AccessibleButton>
	);
}