import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  config: any = null;
  error: string | null = null;

  ngOnInit(): void {
    this.loadConfig();
  }

  loadConfig() {
    this.error = null;
    window.electronAPI.readConfig()
      .then(cfg => this.config = cfg)
      .catch(err => {
        console.error('Failed to read config:', err);
        this.error = 'Could not read config file.';
      });
  }

  saveConfig() {
    window.electronAPI.saveConfig(this.config)
      .then(() => alert('Configuration saved!'))
      .catch(err => {
        console.error('Failed to save config:', err);
        this.error = 'Could not save config file.';
      });
  }
}
