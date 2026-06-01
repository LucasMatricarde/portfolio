import { Directive, ElementRef, HostListener, OnDestroy, inject } from '@angular/core';
import gsap from 'gsap';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective implements OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private rect!: DOMRect;

  @HostListener('mouseenter')
  onEnter() {
    if (this.reducedMotion) return;
    this.rect = this.el.nativeElement.getBoundingClientRect();
    gsap.to(this.el.nativeElement, {
      transformPerspective: 800,
      transformStyle: 'preserve-3d',
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent) {
    if (this.reducedMotion || !this.rect) return;
    const x = event.clientX - this.rect.left;
    const y = event.clientY - this.rect.top;
    const cx = this.rect.width / 2;
    const cy = this.rect.height / 2;
    const rotY =  ((x - cx) / cx) * 5;
    const rotX = -((y - cy) / cy) * 5;
    gsap.to(this.el.nativeElement, {
      rotationY: rotY,
      rotationX: rotX,
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  @HostListener('mouseleave')
  onLeave() {
    gsap.to(this.el.nativeElement, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  }

  ngOnDestroy() {
    gsap.killTweensOf(this.el.nativeElement);
  }
}
