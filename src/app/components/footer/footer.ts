import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer__inner">
        <p class="footer__text">
          Desenvolvido por <strong>Lucas Matricarde</strong> — Java, Angular e boas ideias.
        </p>
        <div class="footer__links">
          <a href="#" aria-label="GitHub" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.scss',
})
export class FooterComponent {}
