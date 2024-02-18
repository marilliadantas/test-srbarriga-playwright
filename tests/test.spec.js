// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://seubarriga.wcaquino.me/login');
})

test('Teste de login com sucesso @loginSucess', async ({ page }) => {
  // test.setTimeout(200000);
  await page.screenshot({ path: 'screenshots/screenshot1.png' });
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('castro@teste.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('1234');
  await page.screenshot({ path: 'screenshots/screenshot2.png' });
  await page.getByRole('button', { name: 'Entrar' }).press('Enter');

  await expect(page.locator('div[class="alert alert-success"]')).toBeVisible()
  await expect(page.locator('.alert.alert-success')).toHaveText('Bem vindo, Breno Castro!');
  await page.screenshot({ path: 'screenshots/screenshot3.png' });
});

test('Teste de login com email inválido @loginEmailInvalido', async ({ page }) => {
  await page.screenshot({ path: 'screenshots/screenshot1.png' });
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('testesdkjds@teste.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('1234');
  await page.screenshot({ path: 'screenshots/screenshot2.png' });
  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(page.locator('//div[@class="alert alert-danger"]')).toBeVisible()
  await expect(page.locator('div[class="alert alert-danger"]')).toHaveText('Problemas com o login do usuário');
  await page.screenshot({ path: 'screenshots/screenshot3.png' });
});
