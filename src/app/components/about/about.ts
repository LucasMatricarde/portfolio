import { Component, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { TiltDirective } from '@shared/directives/tilt.directive';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    icon: '⚙️',
    title: 'Backend & Arquitetura',
    desc: 'Java, Spring Boot, APIs REST, arquitetura hexagonal, DDD, microsserviços e monólitos bem estruturados.',
  },
  {
    icon: '🔗',
    title: 'Integrações Externas',
    desc: 'PIX, Receita Federal, Correios, NFS-e, ViaCEP e serviços externos com rastreabilidade e resiliência.',
  },
  {
    icon: '🗄️',
    title: 'Oracle & PL/SQL',
    desc: 'Procedures, packages, otimização de queries, troubleshooting em produção e modernização de rotinas legadas.',
  },
  {
    icon: '🚀',
    title: 'Cloud & DevOps',
    desc: 'AWS, Docker, Kubernetes, versionamento, releases e práticas DevOps em sistemas corporativos.',
  },
];

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TiltDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  cards = CARDS;
  private el = inject(ElementRef);
  private triggers: ScrollTrigger[] = [];

  ngAfterViewInit() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    this.triggers.push(
      ScrollTrigger.create({
        trigger: this.el.nativeElement.querySelector('.about__text'),
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.from('.about__text > *', {
            opacity: 0, y: 24, stagger: 0.12, duration: 0.7, ease: 'power3.out',
          });
        },
      }),
      ScrollTrigger.create({
        trigger: this.el.nativeElement.querySelector('.about__grid'),
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.from('.about__card', {
            opacity: 0, y: 32, stagger: 0.1, duration: 0.6, ease: 'power3.out',
          });
        },
      })
    );
  }

  ngOnDestroy() {
    this.triggers.forEach(t => t.kill());
  }
}
