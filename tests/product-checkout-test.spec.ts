import {test, expect} from '../src/fixtures/testFixtures';
import {LocaleCode} from '../src/config/locale.config';

const productSku = 'ploom-x-a';
const expectedCartCount = 1;
const expectedProductName = 'Ploom X Advanced Black';

// Run teest for different markets
const locales: LocaleCode[] = ['pl', 'uk', 'sl'];

test.describe('Product checkout test', () => {
    locales.forEach((localeCode) => {
        const testWithLocale = test.extend({
            locale: async ({}, use) => {
                await use(localeCode);
            },
        });

        testWithLocale(`should add product to cart and verify whether it was added - ${localeCode.toUpperCase()} market`, async ({page, homePage}) => {
            // given
            const navigationMenu = await homePage.getNavigationMenu();
            const shopPage = await navigationMenu.navigateToShopPage();
            const productPage = await shopPage.navigateToProductPage(productSku);

            const myCart = await productPage.getMyCart();
            expect(await myCart.isPresent(), 'Cart icon should be visible on the page.').toBeTruthy();
            if (! await myCart.isCartEmpty()) {
                await myCart.removeAllProducts();
            }

            // when
            await productPage.addThisProductToMyCart();

            // then
            expect(await myCart.getNumberOfProducts(), 'Number of added products should ne equal to 1').toBe(expectedCartCount,);
            expect(await myCart.isProductPresent(expectedProductName), 'Product should be present in the cart').toBeTruthy();
        });
    });
});
