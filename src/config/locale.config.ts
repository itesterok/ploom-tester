export type LocaleCode = 'uk' | 'ua' | 'pl' | 'sl';

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
    ua: {
        code: 'ua',
        baseDomain: 'https://www.ploom.ua',
        languageCode: 'uk',
        paths: {
            home: '/uk',
            shop: '/uk/shop',
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
    return LocaleConfigs[locale];
}

export function getLocaleConfig(code: LocaleCode): LocaleConfig {
    return LocaleConfigs[code];
}
