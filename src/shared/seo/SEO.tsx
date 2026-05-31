import { Helmet } from "react-helmet-async";
import { SITE, absUrl } from "./config";

interface SEOProps {
	/** Page title; composed as "Title — Saddat Hasan" unless `bare`. */
	title?: string;
	description?: string;
	/** Site-relative path of this page, e.g. "/blog/general/hello-world". */
	path: string;
	/** "website" (default) or "article" for blog posts. */
	type?: "website" | "article";
	image?: string;
	/** Article timestamps (ISO) — emitted as OG article:* tags. */
	publishedTime?: string;
	modifiedTime?: string;
	/** A canonical override (cross-posted content). */
	canonical?: string;
	/** Use `title` verbatim (no " — Saddat Hasan" suffix). */
	bare?: boolean;
	/** JSON-LD object(s) to inject for this page. */
	jsonLd?: object | object[];
}

/* Per-route document head: title, description, canonical, Open Graph + Twitter,
   and optional JSON-LD. Powered by react-helmet-async (HelmetProvider lives in
   App). Modern crawlers render this; the build-time sitemap/RSS complement it. */
export function SEO({
	title,
	description = SITE.description,
	path,
	type = "website",
	image = SITE.ogImage,
	publishedTime,
	modifiedTime,
	canonical,
	bare = false,
	jsonLd,
}: SEOProps) {
	const fullTitle = !title ? SITE.title : bare ? title : `${title} — ${SITE.name}`;
	const url = canonical ?? absUrl(path);
	const ogImageUrl = absUrl(image);
	const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

	return (
		<Helmet prioritizeSeoTags>
			<title>{fullTitle}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={url} />

			{/* Open Graph */}
			<meta property="og:type" content={type} />
			<meta property="og:site_name" content={SITE.name} />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={ogImageUrl} />
			<meta property="og:locale" content={SITE.locale} />
			{publishedTime ? (
				<meta property="article:published_time" content={publishedTime} />
			) : null}
			{modifiedTime ? (
				<meta property="article:modified_time" content={modifiedTime} />
			) : null}

			{/* Twitter / X */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={SITE.twitter} />
			<meta name="twitter:creator" content={SITE.twitter} />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={ogImageUrl} />

			{blocks.map((block, i) => (
				<script key={i} type="application/ld+json">
					{JSON.stringify(block)}
				</script>
			))}
		</Helmet>
	);
}
