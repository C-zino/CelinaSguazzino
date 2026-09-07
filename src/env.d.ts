/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface PortfolioI18n {
	getLanguage: () => string;
	setLanguage: (language: string) => void;
	getText: (key: string) => unknown;
	formatLocalTime: (date: Date) => string;
}

interface Window {
	portfolioI18n: PortfolioI18n;
}
