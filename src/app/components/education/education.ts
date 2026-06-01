import { Component, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Education } from '../../shared/models/portfolio.models';

gsap.registerPlugin(ScrollTrigger);

const DEGREES: Education[] = [
  {
    title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    institution: 'Universidade Positivo',
    type: 'degree',
    status: 'completed',
  },
  {
    title: 'Pós-graduação em Arquitetura de Software',
    institution: 'Em andamento',
    type: 'degree',
    status: 'in-progress',
  },
  {
    title: 'Pós-graduação em Gestão de Projetos',
    institution: 'Em andamento',
    type: 'degree',
    status: 'in-progress',
  },
];

const CERTIFICATIONS: Education[] = [
  { title: 'Java Web Full Stack',             institution: 'JDev',       type: 'certification', status: 'completed' },
  { title: 'Spring Boot, API REST e Angular', institution: 'JDev',       type: 'certification', status: 'completed' },
  { title: 'Especialista Java',               institution: 'AlgaWorks',  type: 'certification', status: 'completed' },
  { title: 'Especialista Spring REST',        institution: 'AlgaWorks',  type: 'certification', status: 'completed' },
  { title: 'Microsserviços',                  institution: 'AlgaWorks',  type: 'certification', status: 'completed' },
  { title: 'Bootcamp Spring Boot com Cloud',  institution: 'DIO',        type: 'certification', status: 'completed' },
  { title: 'Formação Angular',                institution: 'DIO',        type: 'certification', status: 'completed' },
  { title: 'Scrum Master',                    institution: 'DIO',        type: 'certification', status: 'completed' },
];

@Component({
  selector: 'app-education',
  standalone: true,
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class EducationComponent implements AfterViewInit, OnDestroy {
  degrees = DEGREES;
  certifications = CERTIFICATIONS;
  private el = inject(ElementRef);
  private trigger!: ScrollTrigger;

  ngAfterViewInit() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    this.trigger = ScrollTrigger.create({
      trigger: this.el.nativeElement,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.from(['.education__degree-card', '.education__cert-item'], {
          opacity: 0, y: 20, stagger: 0.08, duration: 0.55, ease: 'power3.out',
        });
      },
    });
  }

  ngOnDestroy() {
    this.trigger?.kill();
  }
}
