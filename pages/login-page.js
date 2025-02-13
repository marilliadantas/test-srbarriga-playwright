import { expect } from '@playwright/test';

export class LoginPage {
  
  constructor(page) {
    this.page = page;
    this.email = "#email",
    this.password = "#senha",
    this.button_enter = 'button[class="btn btn-primary"]',
    this.error_alert = '.alert.alert-danger'
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(mail, password) {
    if(mail !== null) {
      await this.page.fill(this.email, mail);
    }

    if(password !== null) {
      await this.page.fill(this.password, password);
    }

    await this.page.click(this.button_enter);
  }

  async message(expectMessage) {
    await expect(this.page.locator(this.error_alert)).toBeVisible();
    await expect(this.page.locator(this.error_alert)).toHaveText(expectMessage);
  }

  async messages(expectMessages) {
    expect(await this.page.locator(this.error_alert).allTextContents()).toEqual(expectMessages);
  }
}