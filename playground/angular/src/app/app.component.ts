import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <header class="app-header">
        <h1>🅰️ Angular Playground</h1>
        <p>Standalone Angular Application - Can also be loaded as a microfrontend</p>
      </header>
      <main class="app-main">
        <app-widget></app-widget>
      </main>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background: linear-gradient(135deg, #dd0031 0%, #c3002f 100%);
      color: white;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .app-header h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .app-main {
      flex: 1;
      padding: 2rem;
      max-width: 1000px;
      width: 100%;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {
  title = 'playground-angular';
}
