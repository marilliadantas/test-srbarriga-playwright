import { expect } from '@playwright/test';
import { login } from '../elements/loginElements.js';

export class LoginPage {
  
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(mail, password) {
    if(mail !== null) {
      await this.page.fill(login.inputEmail, mail);
    }

    if(password !== null) {
      await this.page.fill(login.inputPassword, password);
    }

    await this.page.click(login.btnEnter);
  }

  async message(expectMessage) {
    await expect(this.page.locator(login.errorAlert)).toBeVisible();
    await expect(this.page.locator(login.errorAlert)).toHaveText(expectMessage);
  }

  async messages(expectMessages) {
    expect(await this.page.locator(login.errorAlert).allTextContents()).toEqual(expectMessages);
  }
}