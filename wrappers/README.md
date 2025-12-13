# Lit Atoms Framework Wrappers

This directory contains framework-specific wrappers for the Lit Atoms web component library. The web components remain the single source of truth, and these wrappers provide thin, typed interfaces for React and Angular applications.

## Architecture

- **Core**: Lit Web Components (framework-agnostic)
- **React**: Thin wrappers using `@lit/react` with typed props and event bindings
- **Angular**: Directives using `ControlValueAccessor` (CVA) for seamless form integration

## Available Wrappers

### React (`@lit-atoms/react`)

React wrappers provide a React-friendly interface with:
- Typed props for all component properties
- Event handlers with proper TypeScript types
- Ref forwarding to underlying HTMLElement
- Full compatibility with React 16.8+

### Angular (`@lit-atoms/angular`)

Angular directives provide:
- `ControlValueAccessor` implementation for form controls
- Support for `formControl`, `formControlName`, and `ngModel`
- Proper integration with Angular's reactive and template-driven forms
- Full compatibility with Angular 14+

## Usage

### React

#### Installation
```bash
npm install lit-atoms @lit-atoms/react react react-dom
```

#### Basic Usage
```tsx
import { LitButtonReact, LitInputFieldReact, LitCheckboxReact } from '@lit-atoms/react';

function MyComponent() {
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <LitButtonReact 
        label="Click me" 
        variant="primary"
        size="medium"
        onButtonClick={(e) => console.log('Button clicked!', e.detail)}
      />

      <LitInputFieldReact
        label="Name"
        placeholder="Enter your name"
        value={inputValue}
        onInputChange={(e) => setInputValue(e.detail.value)}
      />

      <LitCheckboxReact
        label="I agree to the terms"
        checked={isChecked}
        onCheckboxChange={(e) => setIsChecked(e.detail.checked)}
      />
    </div>
  );
}
```

### Angular

#### Installation
```bash
npm install lit-atoms @lit-atoms/angular @angular/core @angular/forms
```

#### Module Setup
```typescript
import { 
  LitInputFieldDirective, 
  LitCheckboxDirective,
  LitTextareaDirective,
  LitToggleDirective,
  LitRadioDirective 
} from '@lit-atoms/angular';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LitInputFieldDirective,
    LitCheckboxDirective,
    LitTextareaDirective,
    LitToggleDirective,
    LitRadioDirective,
  ],
  // ...
})
export class MyComponent {
  // ...
}
```

#### Reactive Forms
```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LitInputFieldDirective, LitCheckboxDirective } from '@lit-atoms/angular';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, LitInputFieldDirective, LitCheckboxDirective],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <lit-input-field 
        formControlName="name"
        label="Name"
        placeholder="Enter your name"
      ></lit-input-field>

      <lit-input-field 
        formControlName="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
      ></lit-input-field>

      <lit-checkbox 
        formControlName="agree"
        label="I agree to the terms"
      ></lit-checkbox>

      <button type="submit" [disabled]="!userForm.valid">Submit</button>
    </form>
  `
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      agree: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}
```

#### Template-Driven Forms
```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LitInputFieldDirective, LitToggleDirective } from '@lit-atoms/angular';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, LitInputFieldDirective, LitToggleDirective],
  template: `
    <form #settingsForm="ngForm">
      <lit-input-field 
        [(ngModel)]="username"
        name="username"
        label="Username"
        required
      ></lit-input-field>

      <lit-toggle 
        [(ngModel)]="notifications"
        name="notifications"
        label="Enable notifications"
      ></lit-toggle>

      <button type="submit" [disabled]="!settingsForm.valid">Save</button>
    </form>
  `
})
export class SettingsComponent {
  username = '';
  notifications = true;
}
```

## Building the Wrappers

### Build All Wrappers
```bash
npm run build:wrappers
```

### Build Individual Wrappers
```bash
# React wrapper
npm run build:react

# Angular wrapper
npm run build:angular
```

### Build Everything
```bash
npm run build:all
```

## Component Manifest

The `components-manifest.ts` file contains metadata about all Lit components, including:
- Tag names
- Class names
- Custom events
- Form control compatibility

This manifest is used for generating and maintaining wrappers.

## Adding New Components

To add a new component wrapper:

1. Add the component metadata to `components-manifest.ts`
2. For React:
   - Create a new file in `wrappers/react/src/`
   - Import the component class
   - Use `createComponent` utility with proper typing
   - Export from `index.ts`
3. For Angular (if it's a form control):
   - Create a new directive in `wrappers/angular/src/`
   - Extend `LitControlValueAccessor`
   - Use `@HostListener` for custom events
   - Export from `index.ts`

## Design Principles

### DO
- Keep web components as the single source of truth
- Keep wrappers thin and focused on framework integration
- Provide full TypeScript type support
- Maintain backward compatibility

### DON'T
- Reimplement component logic in wrappers
- Add framework-specific styling
- Couple wrappers to specific application logic
- Modify the underlying web component behavior

## License

ISC
