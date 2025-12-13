/**
 * Angular Usage Example
 * 
 * This example demonstrates how to use the Lit Atoms Angular directives
 * in a real Angular application with reactive forms.
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { 
  LitInputFieldDirective, 
  LitCheckboxDirective 
} from '@lit-atoms/angular';

@Component({
  selector: 'app-angular-example',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LitInputFieldDirective,
    LitCheckboxDirective,
  ],
  template: `
    <div style="max-width: 400px; margin: 0 auto; padding: 20px;">
      <h2>User Registration</h2>
      
      <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
        <div style="margin-bottom: 20px;">
          <lit-input-field
            formControlName="name"
            label="Full Name"
            placeholder="Enter your name"
            [required]="true"
            [errorText]="getErrorText('name')"
          ></lit-input-field>
        </div>

        <div style="margin-bottom: 20px;">
          <lit-input-field
            formControlName="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            [required]="true"
            [errorText]="getErrorText('email')"
          ></lit-input-field>
        </div>

        <div style="margin-bottom: 20px;">
          <lit-checkbox
            formControlName="agreed"
            label="I agree to the terms and conditions"
          ></lit-checkbox>
        </div>

        <button 
          type="submit" 
          [disabled]="!registrationForm.valid || submitted"
          style="padding: 12px 24px; background: #1ea7fd; color: white; border: none; border-radius: 3em; cursor: pointer;"
        >
          {{ submitted ? 'Submitted!' : 'Submit' }}
        </button>

        <p *ngIf="submitted" style="margin-top: 20px; color: green;">
          Thank you for registering, {{ registrationForm.value.name }}!
        </p>
      </form>
    </div>
  `,
})
export class AngularExampleComponent {
  registrationForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      agreed: [false, Validators.requiredTrue],
    });
  }

  getErrorText(fieldName: string): string {
    const control = this.registrationForm.get(fieldName);
    
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'This field is required';
    }

    if (control.errors['email']) {
      return 'Please enter a valid email address';
    }

    if (control.errors['minlength']) {
      return `Minimum length is ${control.errors['minlength'].requiredLength}`;
    }

    return '';
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.submitted = true;
      console.log('Form submitted:', this.registrationForm.value);
    }
  }
}
