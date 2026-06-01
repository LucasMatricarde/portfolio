import { Directive, ElementRef, Input, OnInit, OnDestroy, inject } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Directive({
  selector: '[appCounter]',
  standalone: true,
})
export class CounterDirective implements OnInit, OnDestroy {
  @Input({ required: true }) appCounter!: number;
  @Input() counterSuffix = '';

  private el = inject(ElementRef<HTMLElement>);
  private trigger!: ScrollTrigger;
  private reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ngOnInit() {
    const target = this.el.nativeElement;

    if (this.reducedMotion) {
      target.textContent = `${this.appCounter}${this.counterSuffix}`;
      return;
    }

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: this.appCounter,
      duration: 1.8,
      ease: 'power2.out',
      paused: true,
      onUpdate: () => {
        const rounded = Number.isInteger(this.appCounter)
          ? Math.round(obj.val)
          : Math.round(obj.val * 10) / 10;
        target.textContent = `${rounded}${this.counterSuffix}`;
      },
      onComplete: () => {
        target.textContent = `${this.appCounter}${this.counterSuffix}`;
      },
    });

    this.trigger = ScrollTrigger.create({
      trigger: target,
      start: 'top 85%',
      once: true,
      onEnter: () => tween.play(),
    });
  }

  ngOnDestroy() {
    this.trigger?.kill();
    gsap.killTweensOf(this.el.nativeElement);
  }
}
