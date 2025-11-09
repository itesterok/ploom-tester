import {Locator} from '@playwright/test';

export async function waitForVisible(locator: Locator, timeout: number): Promise<boolean> {
    try {
        await locator.waitFor({ state: 'visible', timeout });
        return true;
    } catch {
        return false;
    }
}
