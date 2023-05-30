import { test, expect } from '@playwright/test';

const IS_AJAX_SUBMIT_ENABLED = true;

test('test', async ({ page }) => {
  await page.goto('https://gruseltour-goerlitz.de/');

  await page.getByLabel('Wann möchtest du die Tour buchen? Die Touren finden Freitag, Samstag und auch an Feiertagen statt. *').click();
  await page.locator('a').filter({ hasText: 'Vor&#x3E;' }).click();
  await page.locator('a').filter({ hasText: 'Vor&#x3E;' }).click();
  await page.locator('a').filter({ hasText: 'Vor&#x3E;' }).click();
  await page.locator('a').filter({ hasText: 'Vor&#x3E;' }).click();
  await page.locator('a').filter({ hasText: 'Vor&#x3E;' }).click();
  await page.locator('a').filter({ hasText: 'Vor&#x3E;' }).click();
  await page.getByRole('link', { name: '15' }).click();

  await page.getByLabel('Wie heißt du (Vorname)? *').click();
  await page.getByLabel('Wie heißt du (Vorname)? *').fill('Playwright');

  await page.getByLabel('Wie viele Personen wollen an der Tour teilnehmen? *').click();
  await page.getByLabel('Wie viele Personen wollen an der Tour teilnehmen? *').fill('2');

  await page.getByLabel('Für die Bestätigung benötigen wir deine E-Mail-Adresse: *').click();
  await page.getByLabel('Für die Bestätigung benötigen wir deine E-Mail-Adresse: *').fill('kontakt@gruseltour-goerlitz.de');

  await page.getByLabel('Und deine Handynummer, damit wir dich im Notfall erreichen können: *').click();
  await page.getByLabel('Und deine Handynummer, damit wir dich im Notfall erreichen können: *').fill('123');

  await page.getByRole('button', { name: 'Anmelden' }).click()

  const URL_SUCCESS = "https://gruseltour-goerlitz.de/anmeldung-erfolgreich/"

  if (IS_AJAX_SUBMIT_ENABLED) {
      await page.waitForURL(URL_SUCCESS);
  } else {
      await expect(page).toHaveURL(URL_SUCCESS);
  }

  await page.getByRole('heading', { name: 'Anmeldung erfolgreich' }).click();
});
