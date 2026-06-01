export interface Experience {
  period: string;
  company: string;
  role: string;
  description: string;
  tags: string[];
  isCurrent?: boolean;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  status: 'in-development' | 'corporate';
  svgId: string;
}

export interface Highlight {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Education {
  title: string;
  institution: string;
  status?: 'in-progress' | 'completed';
  type: 'degree' | 'certification';
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export type FormState = 'idle' | 'loading' | 'success' | 'error';
