import {
  Component, OnInit, OnDestroy, HostListener,
  signal, inject, PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const NAV_LINKS = [
  { label: 'Início',        href: '#hero'        },
  { label: 'Sobre',         href: '#sobre'        },
  { label: 'Experiência',   href: '#experiencia'  },
  { label: 'Projetos',      href: '#projetos'     },
  { label: 'Tecnologias',   href: '#tecnologias'  },
  { label: 'Formação',      href: '#formacao'     },
  { label: 'Contato',       href: '#contato'      },
];

const SECTION_IDS = NAV_LINKS.map(l => l.href.slice(1));

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  links        = NAV_LINKS;
  scrolled     = signal(false);
  menuOpen     = signal(false);
  activeSection = signal('hero');

  private observers: IntersectionObserver[] = [];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 60);
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) this.activeSection.set(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      this.observers.push(obs);
    });
  }

  ngOnDestroy() {
    this.observers.forEach(o => o.disconnect());
  }

  scrollTo(href: string) {
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.menuOpen.set(false);
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }
}
