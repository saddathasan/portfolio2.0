import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
			// Make API call to send email (works in both development and production)
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setStatus('success');
				setFormData({ name: '', email: '', subject: '', message: '' });
			} else {
				const errorData = await response.json();
				setStatus('error');
				setErrorMessage(errorData.message || 'Failed to send email');
			}
		} catch (error) {
			setStatus('error');
			setErrorMessage('Network error. Please try again.');
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
						className="space-y-4 h-full flex flex-col"
						onSubmit={handleSubmit}>
						<div className="flex-1 space-y-4">
							<FormField
								label="Name"
								id="name"
								name="name"
								type="text"
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
								placeholder="your.email@example.com"
								value={formData.email}
								onChange={handleInputChange}
								required
							/>
							<FormField
								label="Subject"
								id="subject"
								name="subject"
								type="text"
								placeholder="What's this about?"
								value={formData.subject}
								onChange={handleInputChange}
								required
							/>
							<TextareaField
								label="Message"
								id="message"
								name="message"
								placeholder="Tell me about your project, ideas, or just say hello!"
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

// Form field component - Lee Robinson ultra-minimal styling
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
			className={className}
			{...props}>
			<label
				htmlFor={id}
				className="block text-sm font-medium mb-2 text-foreground">
				{label}
			</label>
			<Input
				type={type}
				id={id}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="border-0 border-b border-muted-foreground/20 rounded-none focus:border-foreground focus:ring-0 bg-transparent px-0"
				required={required}
			/>
		</div>
	);
}

// Textarea field component - Lee Robinson ultra-minimal styling
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
			className={className}
			{...props}>
			<label
				htmlFor={id}
				className="block text-sm font-medium mb-2 text-foreground">
				{label}
			</label>
			<Textarea
				id={id}
				name={name}
				rows={rows}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="border-0 border-b border-muted-foreground/20 rounded-none focus:border-foreground focus:ring-0 bg-transparent px-0 resize-none"
				required={required}
			/>
		</div>
	);
}

// Submit button component - Lee Robinson ultra-minimal styling
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
