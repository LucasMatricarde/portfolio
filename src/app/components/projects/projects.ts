import { Component, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '@shared/models/portfolio.models';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS: Project[] = [
  {
    title: 'ERP de Eventos',
    subtitle: 'Farfalla',
    description: 'Sistema em desenvolvimento para centralizar gestão de eventos, contratos, fornecedores, financeiro e operações, com arquitetura hexagonal, APIs REST, Angular e integrações fiscais.',
    tags: ['Java', 'Spring Boot', 'Angular', 'Docker', 'AWS', 'Arq. Hexagonal', 'MapStruct', 'APIs REST'],
    status: 'in-development',
    svgId: 'erp',
  },
  {
    title: 'SIO',
    subtitle: 'Sistema Integrado Odontológico — Wise Systems',
    description: 'Sistema corporativo crítico com módulos de atendimento, cadastro, faturamento, cobrança, integrações externas, PIX, Receita Federal, Correios e rotinas Oracle/PLSQL.',
    tags: ['Java', 'JSP', 'Struts', 'Spring Boot', 'Hibernate', 'Oracle', 'PL/SQL', 'APIs', 'Integrações'],
    status: 'corporate',
    svgId: 'sio',
  },
];

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  projects = PROJECTS;
  private el = inject(ElementRef);
  private trigger!: ScrollTrigger;
  private reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ngAfterViewInit() {
    if (this.reducedMotion) return;

    this.trigger = ScrollTrigger.create({
      trigger: this.el.nativeElement.querySelector('.projects__grid'),
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.from('.project-card', {
          opacity: 0, y: 36, stagger: 0.15, duration: 0.7, ease: 'power3.out',
        });
      },
    });
  }

  onCardEnter(event: MouseEvent) {
    if (this.reducedMotion) return;
    const card = (event.currentTarget as HTMLElement);
    gsap.to(card, { rotateY: 4, y: -8, duration: 0.35, ease: 'power2.out',
      transformPerspective: 900, transformStyle: 'preserve-3d' });
  }

  onCardLeave(event: MouseEvent) {
    if (this.reducedMotion) return;
    const card = (event.currentTarget as HTMLElement);
    gsap.to(card, { rotateY: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.6)' });
  }

  ngOnDestroy() {
    this.trigger?.kill();
  }
}
