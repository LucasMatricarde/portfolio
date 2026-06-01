import { Component, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '@core/services/contact.service';
import { FormState } from '@shared/models/portfolio.models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  formState = signal<FormState>('idle');

  form = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  get nameInvalid()    { return this.form.get('name')!.invalid    && this.form.get('name')!.touched; }
  get emailInvalid()   { return this.form.get('email')!.invalid   && this.form.get('email')!.touched; }
  get messageInvalid() { return this.form.get('message')!.invalid && this.form.get('message')!.touched; }

  submit() {
    if (this.formState() === 'loading') return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formState.set('loading');

    const { name, email, message } = this.form.value;
    this.contactService.send({ name: name!, email: email!, message: message! }).subscribe({
      next:  () => { this.formState.set('success'); this.form.reset(); },
      error: () => this.formState.set('error'),
    });
  }

  retry() {
    this.formState.set('idle');
  }
}
