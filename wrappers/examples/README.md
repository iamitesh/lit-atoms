# Framework Wrapper Examples

This directory contains complete, working examples demonstrating how to use the Lit Atoms framework wrappers in real applications.

## Examples

### React Example (`react-example.tsx`)
A complete React component demonstrating:
- State management with useState
- Event handling for custom events
- Form validation
- TypeScript integration

### Angular Example (`angular-example.ts`)
A complete Angular component demonstrating:
- Reactive forms with FormBuilder
- ControlValueAccessor integration
- Form validation with error messages
- Standalone component pattern

## Running the Examples

These examples are for reference only. To use them in your application:

1. Copy the example code to your project
2. Install the required dependencies
3. Import the necessary wrapper components/directives
4. Customize as needed for your use case

## Key Patterns

### React
- Use event handlers like `onButtonClick`, `onInputChange`
- Access event details via `e.detail`
- Manage state with React hooks
- Pass props directly to wrapper components

### Angular
- Use `formControlName`, `formControl`, or `ngModel`
- Validation works seamlessly with Angular forms
- Error handling via form control errors
- Standalone directives for modern Angular

## More Examples

For more usage patterns, see the main [wrappers/README.md](../README.md) documentation.
