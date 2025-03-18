import { expect } from '@playwright/test';

export class HomePage {
    constructor(page) {
      this.page = page;
      this.error_alert = '.alert.alert-success'
    }
  
    async message(expectMessage) {
      await expect(this.page.locator(this.error_alert)).toHaveText(expectMessage);
    }
  }