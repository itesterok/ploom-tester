export type LocaleCode = 'uk' | 'pl' | 'sl';

export interface LocaleConfig {
    code: LocaleCode;
    baseDomain: string;
    languageCode: string;
    paths: {
        home: string;
        shop: string;
    };
}

export const LocaleConfigs: Record<LocaleCode, LocaleConfig> = {
    uk: {
        code: 'uk',
        baseDomain: 'https://www.ploom.co.uk',
        languageCode: 'en',
        paths: {
            home: '/en',
            shop: '/en/shop',
        },
    },
    pl: {
        code: 'pl',
        baseDomain: 'https://www.ploom.pl',
        languageCode: 'pl',
        paths: {
            home: '/pl',
            shop: '/pl/shop',
        },
    },
    sl: {
        code: 'sl',
        baseDomain: 'https://www.si.ploom.com',
        languageCode: 'es',
        paths: {
            home: '/sl',
            shop: '/es/katalog',
        },
    },
};

export function getCurrentLocale(): LocaleConfig {
    const localeEnv = process.env.LOCALE as LocaleCode | undefined;
    const locale = localeEnv && LocaleConfigs[localeEnv] ? localeEnv : 'uk';
    return getLocaleConfig(locale);
}

export function getLocaleConfig(code: LocaleCode): LocaleConfig {
    return LocaleConfigs[code];
}

export function getMarketsToTest(): LocaleCode[] {
    const marketsEnv = process.env.MARKETS;
    const localeEnv = process.env.LOCALE as LocaleCode | undefined;
    
    // If a specific market is provided via MARKETS (and it's not 'all-markets'), use only that market
    if (marketsEnv && marketsEnv !== 'all-markets') {
        const market = marketsEnv as LocaleCode;
        if (getLocaleConfig(market)) {
            return [market];
        }
    }
    
    // If LOCALE is set (e.g., from GitHub Actions matrix), use only that market
    // This takes precedence over MARKETS=all-markets when both are set
    if (localeEnv && LocaleConfigs[localeEnv]) {
        return [localeEnv];
    }
    
    // If MARKETS is set to 'all-markets' (and LOCALE is not set), return all available markets
    if (marketsEnv === 'all-markets') {
        return ['pl', 'uk', 'sl'];
    }
    
    // Default: return all markets (for local runs)
    return ['pl', 'uk', 'sl'];
}
