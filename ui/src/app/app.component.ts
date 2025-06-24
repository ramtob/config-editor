import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  config: any;

  loadConfig() {
    window.electronAPI.readConfig().then(cfg => {
      this.config = cfg;
    });
  }
}