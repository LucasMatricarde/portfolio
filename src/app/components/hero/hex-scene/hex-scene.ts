import {
  Component, ElementRef, ViewChild, OnDestroy, AfterViewInit, inject, PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-hex-scene',
  standalone: true,
  template: `
    <div class="hex-scene" #container>
      @if (!webglSupported) {
        <svg class="hex-scene__fallback" viewBox="0 0 320 360" aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg">
          <polygon points="160,20 230,60 230,140 160,180 90,140 90,60"
            fill="none" stroke="#1e5c7a" stroke-width="1.5" opacity="0.12"/>
          <polygon points="160,50 220,84 220,152 160,186 100,152 100,84"
            fill="rgba(221,237,245,0.35)" stroke="#1e5c7a" stroke-width="1.5" opacity="0.35"/>
          <polygon points="160,85 205,110 205,160 160,185 115,160 115,110"
            fill="rgba(30,92,122,0.08)" stroke="#1e5c7a" stroke-width="2" opacity="0.7"/>
          <polygon points="160,110 190,127 190,161 160,178 130,161 130,127"
            fill="#1e5c7a" opacity="0.15"/>
          <polygon points="255,68 280,82 280,110 255,124 230,110 230,82"
            fill="none" stroke="#4a9ab8" stroke-width="1.2" opacity="0.45"/>
          <polygon points="65,68 90,82 90,110 65,124 40,110 40,82"
            fill="none" stroke="#4a9ab8" stroke-width="1.2" opacity="0.35"/>
          <polygon points="160,195 185,209 185,237 160,251 135,237 135,209"
            fill="none" stroke="#4a9ab8" stroke-width="1.2" opacity="0.4"/>
          <line x1="230" y1="96" x2="255" y2="96" stroke="#4a9ab8" stroke-width="1.2"
            opacity="0.5" stroke-dasharray="4,4"/>
          <line x1="90"  y1="96" x2="65"  y2="96" stroke="#4a9ab8" stroke-width="1.2"
            opacity="0.5" stroke-dasharray="4,4"/>
          <line x1="160" y1="185" x2="160" y2="195" stroke="#4a9ab8" stroke-width="1.2"
            opacity="0.5" stroke-dasharray="4,4"/>
          <circle cx="160" cy="147" r="8" fill="#1e5c7a" opacity="0.5"/>
          <circle cx="160" cy="147" r="3" fill="#4a9ab8" opacity="0.9"/>
          <circle cx="255" cy="96" r="4" fill="#4a9ab8" opacity="0.6"/>
          <circle cx="65"  cy="96" r="4" fill="#4a9ab8" opacity="0.6"/>
          <circle cx="160" cy="223" r="4" fill="#4a9ab8" opacity="0.6"/>
          <text x="160" y="290" text-anchor="middle" fill="#1e5c7a" font-size="9"
            opacity="0.4" font-family="system-ui" letter-spacing="2">PORTS &amp; ADAPTERS</text>
        </svg>
      }
      <canvas #canvas class="hex-scene__canvas"></canvas>
    </div>
  `,
  styleUrl: './hex-scene.scss',
})
export class HexSceneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('container', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  webglSupported = true;

  private renderer: any;
  private scene: any;
  private camera: any;
  private group: any;
  private animationId = 0;
  private observer!: IntersectionObserver;
  private isVisible = false;
  private reducedMotion = false;
  private mouseX = 0;
  private mouseY = 0;
  private targetRotX = 0;
  private targetRotY = 0;

  private readonly onMouseMove = (e: MouseEvent) => {
    if (this.reducedMotion) return;
    const rect = this.containerRef.nativeElement.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    this.mouseX = (e.clientX - cx) / (rect.width / 2);
    this.mouseY = (e.clientY - cy) / (rect.height / 2);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check WebGL support
    const canvas = this.canvasRef.nativeElement;
    const testCtx = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!testCtx) {
      this.webglSupported = false;
      return;
    }

    // Lazy-load Three.js
    const THREE = await import('three');
    this.initThree(THREE, canvas);

    // IntersectionObserver: pause render loop when off-screen
    this.observer = new IntersectionObserver(([entry]) => {
      this.isVisible = entry.isIntersecting;
      if (this.isVisible) this.animate();
      else cancelAnimationFrame(this.animationId);
    }, { threshold: 0.1 });
    this.observer.observe(this.containerRef.nativeElement);

    if (!this.reducedMotion) {
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    }
  }

  private initThree(THREE: any, canvas: HTMLCanvasElement) {
    const container = this.containerRef.nativeElement;
    const w = container.clientWidth  || 400;
    const h = container.clientHeight || 420;

    // Scene + camera
    this.scene  = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    this.camera.position.z = 5;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    // Group holding all hex objects
    this.group = new THREE.Group();
    this.scene.add(this.group);

    // Colors
    const colorPrimary = 0x1e5c7a;
    const colorLight   = 0x4a9ab8;
    const colorAccent  = 0xc8973a;

    // Helper: build hexagon edge geometry at given radius
    const hexEdges = (radius: number, opacity: number, color: number, z: number) => {
      const shape = new THREE.Shape();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
      }
      shape.closePath();
      const shapeGeo  = new THREE.ShapeGeometry(shape);
      const edgesGeo  = new THREE.EdgesGeometry(shapeGeo);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
      const hex = new THREE.LineSegments(edgesGeo, mat);
      hex.position.z = z;
      return hex;
    };

    // Concentric hexagons at different depths — brighter for visual impact
    this.group.add(hexEdges(1.9, 0.18, colorPrimary, -0.8));  // outer
    this.group.add(hexEdges(1.5, 0.45, colorPrimary, -0.4));  // mid
    this.group.add(hexEdges(1.1, 0.82, colorPrimary,  0.0));  // inner
    this.group.add(hexEdges(0.7, 1.00, colorPrimary,  0.3));  // core

    // Satellite hexagons (right, left, bottom)
    const satRight = hexEdges(0.45, 0.75, colorLight, 0.1);
    satRight.position.set(2.0, 0.6, 0.0);
    this.group.add(satRight);

    const satLeft = hexEdges(0.45, 0.65, colorLight, 0.1);
    satLeft.position.set(-2.0, 0.6, 0.0);
    this.group.add(satLeft);

    const satBottom = hexEdges(0.45, 0.65, colorLight, 0.1);
    satBottom.position.set(0.0, -1.6, 0.0);
    this.group.add(satBottom);

    const satTopRight = hexEdges(0.3, 0.55, colorAccent, 0.1);
    satTopRight.position.set(2.0, -1.0, 0.0);
    this.group.add(satTopRight);

    const satTopLeft = hexEdges(0.3, 0.45, colorAccent, 0.1);
    satTopLeft.position.set(-2.0, -1.0, 0.0);
    this.group.add(satTopLeft);

    // Dashed connector lines using BufferGeometry
    const dashLine = (x1: number, y1: number, x2: number, y2: number, color: number, opacity: number) => {
      const points = [];
      const steps = 8;
      for (let i = 0; i < steps; i++) {
        if (i % 2 === 0) {
          const t0 = i / steps;
          const t1 = (i + 0.6) / steps;
          points.push(x1 + (x2-x1)*t0, y1 + (y2-y1)*t0, 0.1);
          points.push(x1 + (x2-x1)*t1, y1 + (y2-y1)*t1, 0.1);
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
      return new THREE.LineSegments(geo, mat);
    };

    this.group.add(dashLine(1.1, 0.0, 1.55, 0.6, colorLight, 0.5));
    this.group.add(dashLine(-1.1, 0.0, -1.55, 0.6, colorLight, 0.5));
    this.group.add(dashLine(0.0, -1.1, 0.0, -1.15, colorLight, 0.5));

    // Center glow sphere
    const sphereGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const sphereMat = new THREE.MeshBasicMaterial({ color: colorLight });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    this.group.add(sphere);

    // Vertex dots on satellites
    const dot = (x: number, y: number, color: number, opacity: number) => {
      const g = new THREE.SphereGeometry(0.04, 8, 8);
      const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(x, y, 0.1);
      return mesh;
    };
    this.group.add(dot( 2.0,  0.6, colorLight, 0.7));
    this.group.add(dot(-2.0,  0.6, colorLight, 0.7));
    this.group.add(dot( 0.0, -1.6, colorLight, 0.7));

    // Handle resize
    const onResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      this.camera.aspect = nw / nh;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize, { passive: true });
    (this as any)._onResize = onResize;
  }

  private animate() {
    if (!this.isVisible || !this.renderer) return;
    this.animationId = requestAnimationFrame(() => this.animate());

    if (!this.reducedMotion) {
      this.group.rotation.y += 0.0008;
      this.group.rotation.x += 0.0003;

      // Smooth mouse parallax
      this.targetRotY += (this.mouseX * 0.18 - this.targetRotY) * 0.04;
      this.targetRotX += (-this.mouseY * 0.12 - this.targetRotX) * 0.04;
      this.group.rotation.y += this.targetRotY * 0.01;
      this.group.rotation.x += this.targetRotX * 0.01;
    }

    this.renderer.render(this.scene, this.camera);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
    this.observer?.disconnect();
    window.removeEventListener('mousemove', this.onMouseMove);
    if ((this as any)._onResize) window.removeEventListener('resize', (this as any)._onResize);

    if (this.renderer) {
      this.renderer.dispose();
      this.scene?.traverse((obj: any) => {
        obj.geometry?.dispose();
        if (obj.material) {
          Array.isArray(obj.material)
            ? obj.material.forEach((m: any) => m.dispose())
            : obj.material.dispose();
        }
      });
    }
  }
}
