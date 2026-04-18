import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { UserApiService } from './user-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  submitResult: unknown = null;
  submitError = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly userApi: UserApiService
  ) {}

  readonly leadForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    role: ['buyer' as const, [Validators.required]],
  });

  onSubmit(): void {
    if (this.leadForm.invalid) {
      this.leadForm.markAllAsTouched();
      return;
    }

    this.submitError = '';
    this.submitResult = null;

    this.userApi.createUser(this.leadForm.getRawValue()).subscribe({
      next: (response) => {
        this.submitResult = response;
        this.leadForm.reset({
          fullName: '',
          email: '',
          phone: '',
          role: 'buyer',
        });
      },
      error: (err) => {
        this.submitError = err?.error?.error || 'Unable to save user details.';
      },
    });
  }
}
