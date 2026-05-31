import { profile } from "@/data/site";
import { SITE, absUrl } from "./config";

/* Schema.org JSON-LD builders. Person on Home/About; BlogPosting per article;
   WebSite for the search-ready root. Kept as plain objects so <SEO jsonLd> can
   serialise them. */

export const personLd = () => ({
	"@context": "https://schema.org",
	"@type": "Person",
	name: profile.name,
	jobTitle: profile.title,
	description: profile.summary,
	email: `mailto:${profile.email}`,
	url: SITE.url,
	address: { "@type": "PostalAddress", addressLocality: profile.location },
	sameAs: SITE.sameAs,
});

export const websiteLd = () => ({
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: SITE.name,
	url: SITE.url,
	author: { "@type": "Person", name: profile.name },
});

export const blogPostingLd = (post: {
	title: string;
	description: string;
	path: string;
	publishedAt: string;
	updatedAt?: string;
	image?: string;
	tags?: string[];
}) => ({
	"@context": "https://schema.org",
	"@type": "BlogPosting",
	headline: post.title,
	description: post.description,
	url: absUrl(post.path),
	mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(post.path) },
	datePublished: post.publishedAt,
	dateModified: post.updatedAt ?? post.publishedAt,
	image: absUrl(post.image ?? SITE.ogImage),
	keywords: post.tags?.join(", "),
	author: { "@type": "Person", name: profile.name, url: SITE.url },
	publisher: { "@type": "Person", name: profile.name, url: SITE.url },
});
