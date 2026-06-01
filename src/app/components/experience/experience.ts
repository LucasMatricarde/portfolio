import { Component, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Experience } from '../../shared/models/portfolio.models';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES: Experience[] = [
  {
    period: '2026 — atual',
    company: 'Farfalla',
    role: 'Desenvolvedor Java Full Stack — ERP de Eventos',
    description: 'ERP para gestão de eventos, contratos, orçamentos, fornecedores e financeiro. Arquitetura hexagonal com ports/adapters, integrações fiscais externas e organização por módulos de domínio.',
    tags: ['Java', 'Spring Boot', 'Angular', 'Arq. Hexagonal', 'Docker', 'AWS', 'MapStruct'],
    isCurrent: true,
  },
  {
    period: '2018 — atual',
    company: 'Wise Systems',
    role: 'Desenvolvedor Java Full Stack Sênior — SIO',
    description: 'Sustentação e evolução de sistema corporativo crítico com mais de 1.500 usuários. Modernização de módulos legados, APIs e integrações externas, troubleshooting em produção e mentoria técnica.',
    tags: ['Java', 'Spring Boot', 'JSP', 'Struts', 'Oracle', 'PL/SQL', 'PIX', 'Receita Federal', 'Correios'],
    isCurrent: false,
  },
  {
    period: '2020 — 2021',
    company: 'Oi Ana',
    role: 'Desenvolvedor Java Pleno — Assistente Digital',
    description: 'Desenvolvimento e sustentação de assistente digital, organização de regras de negócio e melhorias de estabilidade e experiência do usuário.',
    tags: ['Java', 'Spring Boot'],
    isCurrent: false,
  },
  {
    period: '2017 — 2018 / 2016 — 2017',
    company: 'Wise Systems · Wise Discovery',
    role: 'Estagiário — Desenvolvimento de Sistemas · Business Intelligence',
    description: 'Correções, testes e sustentação do SIO. Dashboards com QlikView para projetos do SEBRAE em BI.',
    tags: ['Java', 'QlikView', 'SEBRAE'],
    isCurrent: false,
  },
];

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  experiences = EXPERIENCES;
  private el = inject(ElementRef);
  private trigger!: ScrollTrigger;

  ngAfterViewInit() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    this.trigger = ScrollTrigger.create({
      trigger: this.el.nativeElement.querySelector('.experience__timeline'),
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.from('.experience__item', {
          opacity: 0, x: -32, stagger: 0.14, duration: 0.65, ease: 'power3.out',
        });
      },
    });
  }

  ngOnDestroy() {
    this.trigger?.kill();
  }
}
