"use client";

import { useState } from "react";

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [status, setStatus] = useState("");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("Sending...");

		try {
			const res = await fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
				method: "POST",
				body: JSON.stringify(formData),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const result = await res.json();
			if (result.status === "success") {
				setStatus("✅ Message sent successfully!");
				setFormData({ name: "", email: "", message: "" });
			} else {
				setStatus("❌ Something went wrong");
			}
		} catch (err) {
			console.error(err);
			setStatus("❌ Failed to send");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 p-4 border rounded-md">
			<input
				type="text"
				name="name"
				placeholder="Your Name"
				value={formData.name}
				onChange={handleChange}
				required
				className="border p-2 w-full"
			/>
			<input
				type="email"
				name="email"
				placeholder="Your Email"
				value={formData.email}
				onChange={handleChange}
				required
				className="border p-2 w-full"
			/>
			<textarea
				name="message"
				placeholder="Your Message"
				value={formData.message}
				onChange={handleChange}
				required
				className="border p-2 w-full"
			/>
			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2">
				Send
			</button>
			<p>{status}</p>
		</form>
	);
}
