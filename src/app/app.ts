import { Component } from '@angular/core';
import { HeaderComponent }     from '@components/header/header';
import { HeroComponent }       from '@components/hero/hero';
import { AboutComponent }      from '@components/about/about';
import { HighlightsComponent } from '@components/highlights/highlights';
import { ExperienceComponent } from '@components/experience/experience';
import { ProjectsComponent }   from '@components/projects/projects';
import { SkillsComponent }     from '@components/skills/skills';
import { EducationComponent }  from '@components/education/education';
import { ContactComponent }    from '@components/contact/contact';
import { FooterComponent }     from '@components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    HighlightsComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <app-header />
    <main id="main-content">
      <app-hero />
      <app-about />
      <app-highlights />
      <app-experience />
      <app-projects />
      <app-skills />
      <app-education />
      <app-contact />
    </main>
    <app-footer />
  `,
  styles: [`
    #main-content { display: block; }
  `],
})
export class App {}
