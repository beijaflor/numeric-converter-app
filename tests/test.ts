import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1')).toBe('HEX DECIMAL CONVERTER');
});

test('disable to input wrong number to fields', async ({ page }) => {
	await page.goto('/');
	expect(await page.locator(`label`, { hasText: 'DECIMAL' }).inputValue()).toBe('0');
	await page.locator(`label`, { hasText: 'DECIMAL' }).fill('xxx');
	expect(await page.locator(`label`, { hasText: 'DECIMAL' }).inputValue()).toBe('0');

	expect(await page.locator(`label`, { hasText: 'HEX' }).inputValue()).toBe('0');
	await page.locator(`label`, { hasText: 'DECIMAL' }).fill('xxx');
	expect(await page.locator(`label`, { hasText: 'HEX' }).inputValue()).toBe('0');
});

test('convert decimal to hex', async ({ page }) => {
	await page.goto('/');
	expect(await page.locator(`label`, { hasText: 'DECIMAL' }).inputValue()).toBe('0');
	await page.locator(`label`, { hasText: 'DECIMAL' }).locator('input').fill('123');
	expect(await page.locator(`label`, { hasText: 'DECIMAL' }).inputValue()).toBe('123');
	expect(await page.locator(`label`, { hasText: 'HEX' }).inputValue()).toBe(
		(123).toString(16).toUpperCase()
	);
});

test('convert hex to decimal', async ({ page }) => {
	await page.goto('/');
	expect(await page.locator(`label`, { hasText: 'HEX' }).inputValue()).toBe('0');
	await page.locator(`label`, { hasText: 'HEX' }).locator('input').fill('ff');
	expect(await page.locator(`label`, { hasText: 'HEX' }).inputValue()).toBe('FF');
	expect(await page.locator(`label`, { hasText: 'DECIMAL' }).inputValue()).toBe(
		parseInt('FF', 16).toString()
	);
});
