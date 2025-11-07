import {test as base} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import {LocaleCode} from '../config/locale.config';

type TestFixtures = {
    locale: LocaleCode;
    homePage: HomePage;
};

export const test = base.extend<TestFixtures>({
    locale: async ({}, use) => {
        await use('uk');
    },

    homePage: async ({page, locale}, use) => {
        const homePage = await HomePage.navigateTo(page, locale);
        await use(homePage);
    },
});

export {expect} from '@playwright/test';
