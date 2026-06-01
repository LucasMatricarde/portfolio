import { Component, ElementRef, AfterViewInit, inject } from '@angular/core';
import { HexSceneComponent } from './hex-scene/hex-scene';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [HexSceneComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements AfterViewInit {
  private el = inject(ElementRef);

  ngAfterViewInit() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero__tag',     { opacity: 0, y: 18, duration: 0.5 })
      .from('.hero__title',   { opacity: 0, y: 24, duration: 0.6 }, '-=0.2')
      .from('.hero__sub',     { opacity: 0, y: 20, duration: 0.55 }, '-=0.3')
      .from('.hero__quote',   { opacity: 0, x: -20, duration: 0.5 }, '-=0.25')
      .from('.hero__actions', { opacity: 0, y: 16, duration: 0.5 }, '-=0.2');
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
