import React from "react";

interface CopyrightProps {
	name?: string;
	className?: string;
}

export const Copyright: React.FC<CopyrightProps> = ({
	name = "Saddat Hasan",
	className = "",
}) => {
	// Function to get current year dynamically
	//   const getCurrentYear = (): number => {
	//     return new Date().getFullYear();
	//   };

	return (
		<section className={`${className}`}>
			<p className="font-cabinet-grotesk text-sm text-muted-foreground text-center">
				{/* &copy; {getCurrentYear()} - Present {name}. All rights reserved. */}
				&copy; 2020-present {name}. All rights reserved.
			</p>
		</section>
	);
};

export default Copyright;
