import { onCLS, onINP, onLCP, type Metric } from "web-vitals";

/* Core Web Vitals reporting. In dev we log to the console with the budget
   verdict; in prod the same hook can POST to an endpoint (left as a no-op so
   nothing ships by default). Budgets: LCP < 2.5s, INP < 200ms, CLS < 0.1. */

const BUDGETS: Record<string, number> = { LCP: 2500, INP: 200, CLS: 0.1 };

function report(metric: Metric) {
	if (import.meta.env.DEV) {
		const budget = BUDGETS[metric.name];
		const verdict = budget !== undefined ? (metric.value <= budget ? "✓" : "✗ over budget") : "";
		// eslint-disable-next-line no-console
		console.log(`[web-vitals] ${metric.name} ${metric.value.toFixed(metric.name === "CLS" ? 3 : 0)} ${verdict}`);
	}
	// prod: hook up an analytics endpoint here if desired.
}

export function reportWebVitals() {
	onLCP(report);
	onINP(report);
	onCLS(report);
}
