// @ts-nocheck
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import data from '../utils/data/login.json';
import login from '../utils/messages/login.json';
import home from '../utils/messages/home.json';

let loginPage = LoginPage
let homePage = HomePage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page); 

    await loginPage.navigate();
  });

test.describe('Testes de Login', () => {
  test('Login com sucesso credenciais válidas @loginSucess', async ({ page }) => {
    await loginPage.login(data.mailValid, data.passwordValid);
    await homePage.message(home.welcome_message);
  });

  test('Login com credenciais inválidas', async ({ page }) => {
    await loginPage.login(data.mailInvalid, data.passwordInvalid);
    await loginPage.message(login.error_message);
  });

  test('Login com campo email vazio', async ({ page }) => {
    await loginPage.login("", data.passwordValid);
    await loginPage.message(login.required_email_message);
  });

  test('Login com campo senha vazio', async ({ page }) => {
    await loginPage.login(data.mailInvalid, "");
    await loginPage.message(login.required_pass_message);
  });

  test('Login com campos vazios', async ({ page }) => {
    await loginPage.login("", "");
    await loginPage.messages([login.required_email_message, login.required_pass_message]);
  });
});