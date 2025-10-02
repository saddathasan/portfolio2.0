import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface ContactFormProps {
	className?: string;
	title?: string;
	responseTime?: string;
}

interface FormFieldProps {
	label: string;
	id: string;
	name?: string;
	type?: "text" | "email";
	placeholder: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	className?: string;
}

interface TextareaFieldProps {
	label: string;
	id: string;
	name?: string;
	placeholder: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	rows?: number;
	required?: boolean;
	className?: string;
}

interface SubmitButtonProps {
	children?: React.ReactNode;
	isLoading?: boolean;
	status?: 'idle' | 'success' | 'error';
	className?: string;
}

// Root Contact Form component
function ContactForm({
	className,
	title = "Send a Message",
	responseTime,
	...props
}: ContactFormProps) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	});
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
	const [errorMessage, setErrorMessage] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setStatus('idle');
		setErrorMessage('');

		try {
			// Determine API endpoint based on environment
			const isDevelopment = import.meta.env.DEV;
			let apiEndpoint: string;
			
			if (isDevelopment) {
				// Development: use local dev server
				apiEndpoint = '/api/send-email-dev';
			} else {
				// Production: use Cloudflare Pages Functions
				apiEndpoint = '/api/send-email';
			}

			// Make API call to send email
			const response = await fetch(apiEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const responseData = await response.json();

			if (response.ok && responseData.success) {
				setStatus('success');
				setFormData({ name: '', email: '', subject: '', message: '' });
				toast.success('Email sent successfully');
			} else {
				setStatus('error');
				const errorMsg = responseData.message || 'Failed to send email';
				setErrorMessage(errorMsg);
				toast.error(errorMsg);
			}
		} catch (error) {
			setStatus('error');
			const errorMsg = 'Network error. Please try again.';
			setErrorMessage(errorMsg);
			toast.error(errorMsg);
			console.error('Email sending error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className={className}
			{...props}>
			<h2 className="text-xl font-medium mb-6">{title}</h2>
			<Card className="h-full border-0 shadow-none">
				<CardContent className="pt-0 h-full px-0">
					<form
						onSubmit={handleSubmit}
						className="space-y-8">
						<div className="space-y-6">
							<FormField
								label="Name"
								id="name"
								name="name"
								placeholder="Your name"
								value={formData.name}
								onChange={handleInputChange}
								required
							/>
							<FormField
								label="Email"
								id="email"
								name="email"
								type="email"
								placeholder="your@email.com"
								value={formData.email}
								onChange={handleInputChange}
								required
							/>
							<FormField
								label="Subject"
								id="subject"
								name="subject"
								placeholder="What's this about?"
								value={formData.subject}
								onChange={handleInputChange}
								required
							/>
							<TextareaField
								label="Message"
								id="message"
								name="message"
								placeholder="Your message..."
								value={formData.message}
								onChange={handleInputChange}
								rows={6}
								required
							/>
						</div>
						{status === 'error' && (
							<div className="text-destructive text-sm text-center">
								{errorMessage}
							</div>
						)}
						{status === 'success' && (
							<div className="text-green-600 text-sm text-center">
								Message sent successfully! I'll get back to you soon.
							</div>
						)}
						<SubmitButton isLoading={isLoading} status={status} />
						{responseTime && (
							<p className="text-sm text-muted-foreground text-center">
								{responseTime}
							</p>
						)}
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

// Form field component - Modern shadcn/ui styling
function FormField({
	label,
	id,
	name,
	type = "text",
	placeholder,
	value,
	onChange,
	required = false,
	className,
	...props
}: FormFieldProps) {
	return (
		<div
			className={cn("space-y-1", className)}
			{...props}>
			<label
				htmlFor={id}
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
				{label}
				{required && <span className="text-destructive ml-1">*</span>}
			</label>
			<Input
				type={type}
				id={id}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
			/>
		</div>
	);
}

// Textarea field component - Modern shadcn/ui styling
function TextareaField({
	label,
	id,
	name,
	placeholder,
	value,
	onChange,
	rows = 5,
	required = false,
	className,
	...props
}: TextareaFieldProps) {
	return (
		<div
			className={cn("space-y-1", className)}
			{...props}>
			<label
				htmlFor={id}
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
				{label}
				{required && <span className="text-destructive ml-1">*</span>}
			</label>
			<Textarea
				id={id}
				name={name}
				rows={rows}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="resize-none"
				required={required}
			/>
		</div>
	);
}

// Submit button componenssN Lee Robinson ultra-minimal styling
function SubmitButton({ children = "Send Message", isLoading = false, status = 'idle', className, ...props }: SubmitButtonProps) {
	const getButtonText = () => {
		if (isLoading) return "Sending...";
		if (status === 'success') return "Message Sent!";
		if (status === 'error') return "Try Again";
		return children;
	};

	return (
		<Button
			type="submit"
			disabled={isLoading}
			className={cn(
				"w-full bg-foreground text-background hover:bg-foreground/90 border-0 font-medium",
				status === 'success' && "bg-green-600 hover:bg-green-700",
				status === 'error' && "bg-destructive hover:bg-destructive/90",
				className,
			)}
			size="lg"
			{...props}>
			{getButtonText()}
		</Button>
	);
}

// Compound component structure
ContactForm.Field = FormField;
ContactForm.TextareaField = TextareaField;
ContactForm.SubmitButton = SubmitButton;

export { ContactForm };
