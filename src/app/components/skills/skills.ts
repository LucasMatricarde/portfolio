import { Component, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillCategory } from '../../shared/models/portfolio.models';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Back-end',
    skills: ['Java', 'Spring Boot', 'APIs REST', 'Hibernate', 'JPA', 'Maven', 'JUnit'],
  },
  {
    name: 'Front-end',
    skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS'],
  },
  {
    name: 'Banco de dados',
    skills: ['Oracle', 'PL/SQL', 'SQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    name: 'Cloud & DevOps',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Git', 'CI/CD'],
  },
  {
    name: 'Arquitetura',
    skills: ['Arq. Hexagonal', 'DDD', 'SOLID', 'Clean Code', 'Design Patterns', 'Microsserviços'],
  },
  {
    name: 'Integrações',
    skills: ['PIX', 'Receita Federal', 'Correios', 'NFS-e', 'ViaCEP', 'Serviços externos'],
  },
];

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  categories = SKILL_CATEGORIES;
  private el = inject(ElementRef);
  private trigger!: ScrollTrigger;

  ngAfterViewInit() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    this.trigger = ScrollTrigger.create({
      trigger: this.el.nativeElement.querySelector('.skills__grid'),
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.from('.skills__category', {
          opacity: 0, y: 24, stagger: 0.1, duration: 0.55, ease: 'power3.out',
        });
      },
    });
  }

  onBadgeEnter(event: MouseEvent) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = event.currentTarget as HTMLElement;
    gsap.to(el, { scale: 1.07, duration: 0.18, ease: 'power2.out' });
  }

  onBadgeLeave(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    gsap.to(el, { scale: 1, duration: 0.25, ease: 'elastic.out(1, 0.6)' });
  }

  ngOnDestroy() {
    this.trigger?.kill();
  }
}
