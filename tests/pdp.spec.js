// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.ozon.ru/product/planshet-apple-ipad-pro-2021-wi-fi-12-9-128gb-serebristyy-258505191/?asb=cpltCmMm71f3Im3hj%252Fg3sJUSRneiUFnCvebKbjG9dOI%253D&asb2=FOFqXrhpEkKbIxOwPE0xIzqGnGHFXybw3PRKcbsxCaFP8b_fe229bTkJONHt3NGn&sh=YAo6-hrJYw');
});

const itemHeader = 'Планшет Apple iPad Pro (2021) Wi-Fi, 12.9", 128GB, серебристый';
const firstAddress = 'Невский проспект, 88, Санкт-Петербург, Россия';
const secondAddress = 'Невский проспект, 100, Санкт-Петербург, Россия';

test.describe('Product page', () => {
  test('should show correct item header', async ({ page }) => {
    await expect(page.locator('//div[@data-widget="webProductHeading"]')).toHaveText(itemHeader);
  });

  test('should add item to favorites', async ({ page }) => {
    await page.locator('[data-widget="webAddToFavorite"] button').first().click();
    await expect(page.locator('[data-widget="webAddToFavorite"]').first()).toHaveText('В избранном');
  });

  test('should add item to compare list', async ({ page }) => {
    await page.locator('[data-widget="webAddToCompare"] button').first().click();
    await expect(page.locator('[data-widget="webAddToCompare"]').first()).toHaveText('Перейти в сравнение');
  });

  test('should set up delivery address', async ({ page }) => {
    await page.locator('[data-widget="webDelivery"] button').click();
    await page.locator('[data-widget="addressPopup"]  input').fill(firstAddress);
    await page.locator('[data-widget="addressPopup"]  input').press('Tab');
    await page.locator('[data-widget="addressPopup"]  input').press('Enter');
    await expect(page.locator('[data-widget="addressPopup"]  input')).toHaveValue(firstAddress);
    await page.locator('.p0f').first().click();
    await page.locator('[data-widget="addressPopup"] button').click();
  });

  test('should edit delivery address', async ({ page }) => {
    await page.locator('[data-widget="webDelivery"] button').click();
    await page.locator('[data-widget="addressPopup"]  input').fill(secondAddress);
    await page.locator('[data-widget="addressPopup"]  input').press('Tab');
    await page.locator('[data-widget="addressPopup"]  input').press('Enter');
    await expect(page.locator('[data-widget="addressPopup"]  input')).toHaveValue(secondAddress);
    await page.locator('.p0f').first().click();
    await page.locator('[data-widget="addressPopup"] button').click();
  });

  test('should put item to bag', async ({ page }) => {
    await page.locator('//div[@data-widget="webAddToCart"]//button').click();
    await expect(page.locator('//div[@data-widget="webAddToCart"]//button').first()).toHaveText('В корзинеПерейти');
  });
});
