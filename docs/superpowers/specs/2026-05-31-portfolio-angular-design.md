# Portfólio Angular — Lucas Matricarde
**Data:** 2026-05-31  
**Status:** Aprovado para implementação

---

## Contexto

Lucas Eduardo de Oliveira Matricarde, Desenvolvedor Java Full Stack Sênior com 8 anos de experiência, precisa de um portfólio web profissional que transmita maturidade técnica, criatividade e personalidade — sem parecer template genérico de IA. O projeto parte do zero em `/Users/lucasmatricarde/ProjetosPessoais/Portofolio`.

---

## Conceito Visual: "Engenharia com Alma"

### Paleta de cores
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` | `#f4f1ec` | Fundo principal (bege pedra) |
| `--color-bg-alt` | `#ffffff` | Fundo alternado de seções |
| `--color-bg-dark` | `#0f1f2d` | Fundo escuro (highlights, footer) |
| `--color-primary` | `#1e5c7a` | Azul petróleo — cor principal |
| `--color-primary-light` | `#4a9ab8` | Azul céu — destaques |
| `--color-accent` | `#c8973a` | Âmbar dourado — acentos, cotações |
| `--color-ice` | `#ddedf5` | Azul gelo — backgrounds sutis |
| `--color-text` | `#0f1f2d` | Texto principal |
| `--color-text-muted` | `#4a6a7a` | Texto secundário |

### Tipografia
- **Títulos:** Outfit 700/800 (Google Fonts) — moderna, geométrica, confiante
- **Corpo:** Source Sans 3 400/500 (Google Fonts) — legível, humana
- **Tamanhos:** escala modular 1.25 — h1: 2.6rem, h2: 1.9rem, body: 0.95rem

### Elemento 3D (hero)
- Three.js: composição de hexágonos aninhados em profundidade, nós (pontos) conectados por linhas tracejadas
- Referência visual à arquitetura hexagonal (ports & adapters)
- Rotação suave automática + paralaxe ao mover o mouse (fator 0.03)
- Fallback: SVG estático com mesmo visual se WebGL indisponível
- `prefers-reduced-motion`: pausar animação Three.js, manter visual estático

### Animações
- **GSAP ScrollTrigger:** reveal de seções (fade + translateY 30px → 0, stagger 0.1s)
- **GSAP counter:** números nos cards de destaques (0 → valor final ao entrar em viewport)
- **GSAP flip/tilt:** cards com perspectiva 3D leve no hover (máx. 8deg)
- **Anime.js:** microinterações nos badges de tecnologia (scale 1 → 1.08 no hover)
- **Angular Animations:** transições de rota e estado de formulário

---

## Arquitetura Angular

### Versão e estrutura
- **Angular 18+**, standalone components, sem NgModules
- `inject()` ao invés de constructor DI
- Lazy loading por rota (cada seção é standalone, carregada sob demanda)
- SSR opcional (não obrigatório, portfólio estático)

### Estrutura de pastas
```
src/
  app/
    components/
      header/           HeaderComponent
      hero/             HeroComponent + HexSceneComponent (Three.js)
      about/            AboutComponent
      highlights/       HighlightsComponent
      experience/       ExperienceComponent
      projects/         ProjectsComponent
      skills/           SkillsComponent
      education/        EducationComponent
      contact/          ContactComponent
      footer/           FooterComponent
    shared/
      animations/       gsap.service.ts, animation constants
      models/           interfaces TypeScript
      directives/       tilt.directive.ts, counter.directive.ts
    core/
      services/         contact.service.ts (EmailJS)
    app.component.ts
    app.routes.ts
  styles/
    _variables.scss     CSS custom properties + SCSS tokens
    _typography.scss    font imports, escala tipográfica
    _animations.scss    keyframes globais
    _reset.scss
    styles.scss         imports globais
  assets/
    fonts/              (se necessário fallback)
```

### Dependências npm principais
```json
{
  "three": "^0.160.0",
  "@types/three": "^0.160.0",
  "gsap": "^3.12.0",
  "animejs": "^3.2.2",
  "@emailjs/browser": "^4.0.0"
}
```

---

## Seções e componentes

### 1. HeaderComponent
- Logo textual "Lucas Matricarde" (span colorido no sobrenome)
- Nav: Início, Sobre, Experiência, Projetos, Tecnologias, Formação, Contato
- CTA: "Entrar em contato" (botão primário)
- Sticky com `backdrop-filter: blur(12px)` + leve shadow ao rolar
- Mobile: hamburger menu com Angular Animations (slide-in)
- Scroll spy: seção ativa na nav com `IntersectionObserver`

### 2. HeroComponent + HexSceneComponent
- Layout grid 2 colunas: conteúdo texto (esq) + visualização 3D (dir)
- Tag badge: "Curitiba / PR · 8 anos de experiência"
- H1: "Desenvolvedor Java Full Stack Sênior"
- Subtexto e frase-âmbar com borda esquerda
- Dois botões: "Ver projetos" (primary) e "Fale comigo" (outlined)
- `HexSceneComponent`: canvas Three.js com hexágonos aninhados animados
  - `IntersectionObserver` para pausar quando fora da viewport
  - `window.matchMedia('(prefers-reduced-motion: reduce)')` check
  - Fallback `<svg>` se `!renderer.capabilities.isWebGL2`
  - Mouse parallax: `mousemove` event com fator 0.03

### 3. AboutComponent
- Texto principal do "Sobre mim"
- Grid 2×2 de cards: Backend & Arq., Integrações, Oracle & PL/SQL, Cloud & DevOps
- Cards com `TiltDirective` (perspectiva 3D leve, máx 5deg, GSAP)
- Ícones: SVG minimalistas inline ou Lucide Icons

### 4. HighlightsComponent
- Background escuro (`--color-bg-dark`)
- 6 cards com número em destaque e descrição
- `CounterDirective` com GSAP ScrollTrigger (counter up animation)
- Grid responsivo: 3 colunas desktop, 2 tablet, 1 mobile

### 5. ExperienceComponent
- Timeline vertical com linha conectora
- 4 itens: Farfalla (âmbar = atual), Wise Systems Sênior, Oi Ana, estágios agrupados
- Dot colorido: âmbar = atual, azul petróleo = anterior
- Tags de stack em cada item
- GSAP ScrollTrigger: cada item faz reveal com stagger ao rolar

### 6. ProjectsComponent
- 2 cards principais: ERP Farfalla + SIO Wise
- Card com preview visual abstrato (SVG ou Three.js mini-scene com lazy load)
- Hover: elevação + sombra suave + leve rotação 3D (máx 6deg)
- Tags/badges de tecnologia
- Botão "Em desenvolvimento" ou "Sistema corporativo" (sem link real)

### 7. SkillsComponent
- Background `--color-bg` (bege pedra)
- 6 categorias em grid 3×2: Back-end, Front-end, Banco, Cloud/DevOps, Arquitetura, Integrações
- Badges com hover Anime.js (scale leve + border color change)
- Micro-elemento 3D opcional: hexágono pequeno representando camadas (svg animado simples)

### 8. EducationComponent
- Dois grupos: Formação acadêmica (3 itens) + Certificações (8 itens)
- Formação acadêmica em cards com destaque
- Certificações em lista elegante com ícones por fonte (AlgaWorks, DIO, JDev…)
- "em andamento" badge âmbar nas pós-graduações

### 9. ContactComponent
- Título: "Vamos construir algo bom?"
- Layout 2 colunas: informações de contato (esq) + formulário (dir)
- Informações: localização, e-mail, telefone, LinkedIn placeholder, GitHub placeholder
- Formulário: Nome, E-mail, Mensagem + botão "Enviar mensagem"
- **EmailJS:** `ContactService` usando `@emailjs/browser`
  - Variáveis de ambiente em `environment.ts`: `serviceId`, `templateId`, `publicKey`
  - Estados do formulário: idle → loading → success/error (Angular Animations)
  - Validação reativa com `FormBuilder` + feedback visual inline
- Pequeno elemento 3D decorativo (formas orgânicas SVG animadas) no canto

### 10. FooterComponent
- Background `--color-bg-dark`
- Texto: "Desenvolvido por Lucas Matricarde — Java, Angular e boas ideias."
- Links: GitHub, LinkedIn (placeholder `#`)

---

## Responsividade

| Breakpoint | Layout |
|------------|--------|
| `< 768px` | Single column, nav hamburger, 3D pausado em devices lentos |
| `768–1024px` | Grid reduzido (2 col em highlights → 2, tech → 2) |
| `> 1024px` | Layout completo conforme spec |

---

## Performance e acessibilidade

- `prefers-reduced-motion`: desabilita GSAP ScrollTrigger animations, Three.js rotation
- Three.js: `IntersectionObserver` pausa render loop quando canvas fora de viewport
- Lazy loading: `HexSceneComponent` com dynamic import (`import('three').then(...)`)
- `alt` em todos os ícones SVG, `aria-label` em botões icon-only
- Contraste: todas cores respeitam WCAG AA (mínimo 4.5:1 para texto)
- Scroll smooth: `scroll-behavior: smooth` + âncoras nas seções
- HTML semântico: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`, `<address>`

---

## Formulário de contato — EmailJS

```typescript
// environment.ts
export const environment = {
  emailjs: {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY'
  }
};
```

Template EmailJS deve ter campos: `from_name`, `from_email`, `message`, `to_name`.

---

## Verificação / testes

1. `ng serve` — confirmar carregamento sem erros
2. Hero Three.js aparece, reage ao mouse
3. Scroll: todas seções revelam com animação GSAP
4. Highlights: contadores animam ao entrar em viewport
5. Formulário: estados idle → loading → success/error
6. Responsivo: testar nos 3 breakpoints (mobile 375, tablet 768, desktop 1280)
7. DevTools Performance: LCP < 2.5s, CLS = 0
8. `prefers-reduced-motion`: no macOS → Acessibilidade → Reduzir movimento → Three.js estático
9. WebGL desabilitado (via flag Chrome): fallback SVG exibe corretamente
