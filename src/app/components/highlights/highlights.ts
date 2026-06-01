import { Component, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CounterDirective } from '@shared/directives/counter.directive';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  { value: 8,    suffix: '+',  label: 'anos com Java em sistemas corporativos'       },
  { value: 1500, suffix: '+',  label: 'usuários no sistema corporativo crítico (SIO)' },
  { value: 60,   suffix: '%',  label: 'ganho estimado em otimizações SQL/PLSQL'       },
  { value: 6,    suffix: '+',  label: 'integrações externas: PIX, Receita, Correios…' },
  { value: 2,    suffix: '',   label: 'pós-graduações em andamento (Arq. + Gestão)'   },
  { value: 10,   suffix: '+',  label: 'devs mentorados ao longo da carreira'          },
];

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [CounterDirective],
  templateUrl: './highlights.html',
  styleUrl: './highlights.scss',
})
export class HighlightsComponent implements AfterViewInit, OnDestroy {
  highlights = HIGHLIGHTS;
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
        gsap.from('.highlights__card', {
          opacity: 0, y: 28, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        });
      },
    });
  }

  ngOnDestroy() {
    this.trigger?.kill();
  }
}
