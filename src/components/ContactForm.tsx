import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ContactFormProps {
	className?: string;
	title?: string;
	responseTime?: string;
}

interface FormFieldProps {
	label: string;
	id: string;
	type?: "text" | "email";
	placeholder: string;
	required?: boolean;
	className?: string;
}

interface TextareaFieldProps {
	label: string;
	id: string;
	placeholder: string;
	rows?: number;
	required?: boolean;
	className?: string;
}

interface SubmitButtonProps {
	children: React.ReactNode;
	className?: string;
}

// Root Contact Form component
function ContactForm({
	className,
	title = "Send a Message",
	responseTime,
	children,
	...props
}: ContactFormProps & { children?: React.ReactNode }) {
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			whileInView={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.6 }}
			viewport={{ once: true }}
			className={className}
			{...props}>
			<h2 className="text-2xl font-semibold mb-6">{title}</h2>
			<Card className="h-full border-border/50 hover:border-accent/20 transition-all duration-300">
				<CardContent className="pt-6 h-full">
					<form
						className="space-y-4 h-full flex flex-col"
						onSubmit={(e) => e.preventDefault()}>
						<div className="flex-1 space-y-4">{children}</div>
						{responseTime && (
							<p className="text-sm text-muted-foreground text-center">
								{responseTime}
							</p>
						)}
					</form>
				</CardContent>
			</Card>
		</motion.div>
	);
}

// Form field component
function FormField({
	label,
	id,
	type = "text",
	placeholder,
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
				placeholder={placeholder}
				className="border-border/50 focus:border-primary focus:ring-primary"
				required={required}
			/>
		</div>
	);
}

// Textarea field component
function TextareaField({
	label,
	id,
	placeholder,
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
				rows={rows}
				placeholder={placeholder}
				className="border-border/50 focus:border-primary focus:ring-primary"
				required={required}
			/>
		</div>
	);
}

// Submit button component
function SubmitButton({ children, className, ...props }: SubmitButtonProps) {
	return (
		<Button
			type="submit"
			className={cn(
				"w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300",
				className,
			)}
			size="lg"
			{...props}>
			{children}
		</Button>
	);
}

// Compound component structure
ContactForm.Field = FormField;
ContactForm.TextareaField = TextareaField;
ContactForm.SubmitButton = SubmitButton;

export { ContactForm };
