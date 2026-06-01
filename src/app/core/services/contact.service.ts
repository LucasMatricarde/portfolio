import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ContactForm } from '@shared/models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class ContactService {
  send(form: ContactForm): Observable<void> {
    const promise = import('@emailjs/browser').then(({ default: emailjs }) =>
      emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
          to_name:    'Lucas Matricarde',
        },
        { publicKey: environment.emailjs.publicKey }
      ).then(() => undefined)
    );
    return from(promise);
  }
}
