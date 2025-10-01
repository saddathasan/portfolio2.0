import React from 'react';
import { Helmet } from 'react-helmet-async';
import { config } from '@/config';
import { useApp } from '@/context/AppContext';

// SEO component props interface
interface SEOProps {
	title?: string;
	description?: string;
	keywords?: string[];
	image?: string;
	url?: string;
	type?: 'website' | 'article' | 'profile';
	author?: string;
	publishedTime?: string;
	modifiedTime?: string;
	noIndex?: boolean;
	noFollow?: boolean;
	canonical?: string;
	alternateLanguages?: Array<{ hrefLang: string; href: string }>;
	schemaMarkup?: Record<string, unknown>;
	customMeta?: Array<{ name?: string; property?: string; content: string }>;
}

// Default SEO values
const defaultSEO: Required<Omit<SEOProps, 'customMeta' | 'alternateLanguages' | 'schemaMarkup'>> = {
	title: config.seo.defaultTitle,
	description: config.seo.defaultDescription,
	keywords: [...config.app.keywords],
	image: `${config.seo.siteUrl}${config.seo.ogImage}`,
	url: config.seo.siteUrl,
	type: 'website',
	author: config.app.author,
	publishedTime: '',
	modifiedTime: '',
	noIndex: false,
	noFollow: false,
	canonical: ''
};

// SEO component
export function SEO({
	title,
	description = defaultSEO.description,
	keywords = defaultSEO.keywords,
	image = defaultSEO.image,
	url = defaultSEO.url,
	type = defaultSEO.type,
	author = defaultSEO.author,
	publishedTime,
	modifiedTime,
	noIndex = defaultSEO.noIndex,
	noFollow = defaultSEO.noFollow,
	canonical,
	alternateLanguages,
	schemaMarkup,
	customMeta
}: SEOProps = {}) {
	const { currentPath } = useApp();

	// Generate full title
	const fullTitle = title 
		? config.seo.titleTemplate.replace('%s', title)
		: defaultSEO.title;

	// Generate full URL
	const fullUrl = url.startsWith('http') 
		? url 
		: `${config.seo.siteUrl}${currentPath}`;

	// Generate canonical URL
	const canonicalUrl = canonical || fullUrl;

	// Generate robots content
	const robotsContent = [
		noIndex ? 'noindex' : 'index',
		noFollow ? 'nofollow' : 'follow'
	].join(', ');

	// Generate keywords string
	const keywordsString = Array.isArray(keywords) 
		? keywords.join(', ') 
		: keywords;

	// Generate structured data
	const generateStructuredData = () => {
		if (schemaMarkup) {
			return JSON.stringify(schemaMarkup);
		}

		// Default structured data for the website
		const structuredData = {
			'@context': 'https://schema.org',
			'@type': type === 'profile' ? 'Person' : 'WebSite',
			name: config.app.author,
			url: config.seo.siteUrl,
			description: description,
			author: {
				'@type': 'Person',
				name: config.app.author
			},
			sameAs: [
				config.social.linkedin,
				config.social.github,
				config.social.twitter
			]
		};

		if (type === 'article') {
			return JSON.stringify({
				...structuredData,
				'@type': 'Article',
				headline: title,
				datePublished: publishedTime,
				dateModified: modifiedTime || publishedTime,
				image: image,
				url: fullUrl
			});
		}

		return JSON.stringify(structuredData);
	};

	return (
		<Helmet>
			{/* Basic Meta Tags */}
			<title>{fullTitle}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywordsString} />
			<meta name="author" content={author} />
			<meta name="robots" content={robotsContent} />
			<link rel="canonical" href={canonicalUrl} />

			{/* Open Graph Meta Tags */}
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta property="og:url" content={fullUrl} />
			<meta property="og:type" content={type} />
			<meta property="og:site_name" content={config.app.name} />
			<meta property="og:locale" content="en_US" />

			{/* Twitter Card Meta Tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />
			<meta name="twitter:site" content={config.seo.twitterHandle} />
			<meta name="twitter:creator" content={config.seo.twitterHandle} />

			{/* Article specific meta tags */}
			{type === 'article' && publishedTime && (
				<meta property="article:published_time" content={publishedTime} />
			)}
			{type === 'article' && modifiedTime && (
				<meta property="article:modified_time" content={modifiedTime} />
			)}
			{type === 'article' && author && (
				<meta property="article:author" content={author} />
			)}

			{/* Alternate language links */}
			{alternateLanguages?.map(({ hrefLang, href }) => (
				<link
					key={hrefLang}
					rel="alternate"
					hrefLang={hrefLang}
					href={href}
				/>
			))}

			{/* Custom meta tags */}
			{customMeta?.map((meta, index) => (
				<meta
					key={index}
					{...(meta.name ? { name: meta.name } : { property: meta.property })}
					content={meta.content}
				/>
			))}

			{/* Structured Data */}
			<script type="application/ld+json">
				{generateStructuredData()}
			</script>
		</Helmet>
	);
}

// Hook for managing page SEO
export function usePageSEO(seoProps: SEOProps) {
	const { trackPageView } = useApp();

	React.useEffect(() => {
		// Track page view when SEO changes
		trackPageView(window.location.pathname, seoProps.title);
	}, [seoProps.title, trackPageView]);

	return seoProps;
}

// Predefined SEO configurations for common pages
export const pageSEO = {
	home: {
		title: 'Home',
		description: 'Welcome to my portfolio. I\'m a software engineer passionate about building scalable applications.',
		keywords: ['portfolio', 'software engineer', 'react', 'typescript', 'frontend', 'backend'],
		type: 'website' as const
	},

	about: {
		title: 'About Me',
		description: 'Learn more about my background, skills, and passion for software development.',
		keywords: ['about', 'biography', 'skills', 'background', 'software engineer'],
		type: 'profile' as const
	},

	experience: {
		title: 'Work Experience',
		description: 'Explore my professional journey and the impact I\'ve made in various roles.',
		keywords: ['experience', 'work history', 'career', 'professional', 'achievements'],
		type: 'website' as const
	},

	projects: {
		title: 'Projects',
		description: 'Discover the projects I\'ve built and the technologies I\'ve used.',
		keywords: ['projects', 'portfolio', 'development', 'applications', 'code'],
		type: 'website' as const
	},

	certificates: {
		title: 'Certifications',
		description: 'View my professional certifications and continuous learning achievements.',
		keywords: ['certifications', 'credentials', 'learning', 'professional development'],
		type: 'website' as const
	},

	contact: {
		title: 'Contact Me',
		description: 'Get in touch with me for opportunities, collaborations, or just to say hello.',
		keywords: ['contact', 'hire', 'collaboration', 'opportunities', 'get in touch'],
		type: 'website' as const
	}
};

// Helper function to generate project SEO
export function generateProjectSEO(project: {
	title: string;
	description: string;
	technologies: string[];
	image?: string;
}): SEOProps {
	return {
		title: project.title,
		description: project.description,
		keywords: [...project.technologies, 'project', 'portfolio', 'development'],
		image: project.image,
		type: 'article',
		schemaMarkup: {
			'@context': 'https://schema.org',
			'@type': 'CreativeWork',
			name: project.title,
			description: project.description,
			author: {
				'@type': 'Person',
				name: config.app.author
			},
			image: project.image,
			keywords: project.technologies.join(', ')
		}
	};
}

// Helper function to generate experience SEO
export function generateExperienceSEO(experience: {
	company: string;
	position: string;
	description: string;
	startDate: string;
	endDate?: string;
}): SEOProps {
	return {
		title: `${experience.position} at ${experience.company}`,
		description: experience.description,
		keywords: ['experience', 'work', 'career', experience.company.toLowerCase(), experience.position.toLowerCase()],
		type: 'article',
		publishedTime: experience.startDate,
		modifiedTime: experience.endDate,
		schemaMarkup: {
			'@context': 'https://schema.org',
			'@type': 'WorkExperience',
			name: experience.position,
			description: experience.description,
			employer: {
				'@type': 'Organization',
				name: experience.company
			},
			startDate: experience.startDate,
			endDate: experience.endDate
		}
	};
}

// Helper function to generate certificate SEO
export function generateCertificateSEO(certificate: {
	name: string;
	issuer: string;
	issueDate: string;
	description?: string;
}): SEOProps {
	return {
		title: `${certificate.name} - ${certificate.issuer}`,
		description: certificate.description || `${certificate.name} certification from ${certificate.issuer}`,
		keywords: ['certification', 'credential', certificate.issuer.toLowerCase(), 'professional development'],
		type: 'article',
		publishedTime: certificate.issueDate,
		schemaMarkup: {
			'@context': 'https://schema.org',
			'@type': 'EducationalOccupationalCredential',
			name: certificate.name,
			credentialCategory: 'Professional Certification',
			recognizedBy: {
				'@type': 'Organization',
				name: certificate.issuer
			},
			dateCreated: certificate.issueDate
		}
	};
}

// Export default SEO component
export default SEO;