# lit-atoms

A modern web component library built with Lit Elements. This library provides 15 reusable, customizable UI components with Storybook documentation.

## Components

This library includes the following components:

1. **Button** - Primary and secondary buttons with multiple sizes
2. **Input Field** - Text input with validation and helper text
3. **Checkbox** - Checkbox input with label
4. **Radio** - Radio button with label
5. **Textarea** - Multi-line text input
6. **Toggle** - Switch/toggle component
7. **Badge** - Status badges with multiple variants
8. **Banner** - Notification banners with different states
9. **Card** - Container component with header and footer
10. **Dropdown** - Select dropdown with options
11. **Tooltip** - Hover tooltips with multiple positions
12. **Spinner** - Loading spinner in multiple sizes
13. **Progress Bar** - Progress indicator with variants
14. **Divider** - Horizontal and vertical dividers
15. **Chip** - Tag/chip component with removable option

## Installation

```bash
npm install
```

## Development

### Run Storybook

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006` where you can view and interact with all components.

### Build the Library

```bash
npm run build
```

This will compile TypeScript files to the `dist` directory.

### Build Storybook

```bash
npm run build-storybook
```

## Usage

Import components in your project:

```javascript
import 'lit-atoms/src/components/button';
import 'lit-atoms/src/components/input-field';
// ... other components
```

Use in HTML:

```html
<lit-button label="Click me" variant="primary" size="medium"></lit-button>
<lit-input-field label="Email" type="email" placeholder="Enter email"></lit-input-field>
<lit-checkbox label="Accept terms" checked></lit-checkbox>
```

## Component Properties

Each component is fully documented in Storybook with interactive controls. Run `npm run storybook` to explore all available properties and variants.

## Technologies

- **Lit** - Fast, lightweight web components
- **TypeScript** - Type-safe development
- **Storybook** - Component documentation and testing
- **Vite** - Fast build tool

## License

ISC
