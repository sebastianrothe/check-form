import { test, expect } from "@playwright/test";

const IS_AJAX_SUBMIT_ENABLED = true;

test("test", async ({ page }) => {
    await page.goto("https://gruseltour-berlin.de/");
    await page.getByRole("link", { name: "🎅 Hier geht es zu unserem" }).click();

    await page.getByLabel("Name *").click();
    await page.getByLabel("Name *").fill("Playwright");

    await page.getByLabel("Nachname").click();
    await page.getByLabel("Nachname").fill("Playwright");

    await page.getByLabel("Anschrift *").click();
    await page.getByLabel("Anschrift *").fill("Straße 1");

    await page.getByLabel("E-Mail-Adresse *").click();
    await page.getByLabel("E-Mail-Adresse *").fill("test@test.com");

    await page.getByLabel("Telefonnummer *").click();
    await page.getByLabel("Telefonnummer *").fill("123");

    await page.getByLabel('Wie viele Adventskalender mö').click();
    await page.getByLabel('Wie viele Adventskalender mö').fill("2");

    await page.getByLabel("Ich bestätige, dass ich").check();

    await page
        .getByRole("button", { name: "Zahlungspflichtig bestellen" })
        .click();

    await page.waitForURL('https://gruseltour-berlin.de/gruseliger-adventskalender/', {waitUntil: "networkidle"});

    const heading = page.getByRole('heading', { name: 'Gruseliger Adventskalender für Erwachsene' });
    await expect(heading).toBeVisible();

    const successElement = page.getByText("Vielen Dank für deine Bestellung");
    await expect(successElement).toBeVisible();
});
