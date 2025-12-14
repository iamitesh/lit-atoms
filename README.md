# lit-atoms

A modern web component library built with Lit Elements. This library provides 35 reusable, customizable UI components with Storybook documentation.

## Components

This library includes the following components:

### Form Components
1. **Button** - Primary and secondary buttons with multiple sizes
2. **Input Field** - Text input with validation and helper text
3. **Checkbox** - Checkbox input with label
4. **Radio** - Radio button with label
5. **Textarea** - Multi-line text input
6. **Toggle** - Switch/toggle component
7. **Dropdown** - Select dropdown with options
8. **Form** - Form container with validation

### Display Components
9. **Badge** - Status badges with multiple variants
10. **Banner** - Notification banners with different states
11. **Card** - Container component with header and footer
12. **Tooltip** - Hover tooltips with multiple positions
13. **Spinner** - Loading spinner in multiple sizes
14. **Progress Bar** - Progress indicator with variants
15. **Divider** - Horizontal and vertical dividers
16. **Chip** - Tag/chip component with removable option
17. **Avatar** - User avatar/profile image
18. **Alert** - Alert/notification message

### Layout Components
19. **Header** - Page header with logo, title, and actions
20. **Footer** - Page footer with links and copyright
21. **Navigation** - Navigation menu with items
22. **Sidebar** - Side navigation panel
23. **Modal** - Modal/dialog overlay

### Navigation Components
24. **Breadcrumb** - Navigation breadcrumb trail
25. **Pagination** - Page navigation component
26. **Tabs** - Tabbed content interface
27. **Menu** - Dropdown/context menu
28. **Link** - Styled hyperlink component

### Content Components
29. **Accordion** - Collapsible content sections
30. **List** - Ordered/unordered list component
31. **Table** - Data table component
32. **Table Header** - Table header row
33. **Table Body** - Table body container
34. **Table Row** - Table row component
35. **Table Header Cell** - Table header cell with sorting
36. **Table Cell** - Table data cell

## Installation

```bash
npm install
```

## Development

### Run Playground

```bash
npm run playground
```

This will start the interactive playground on `http://localhost:3000` where you can write and test components in real-time with a live editor, preview panel, and console.

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
- **Style Dictionary** - Design token management
- **Figma API** - Design token synchronization

## Design Tokens & Figma Integration

This library includes a powerful Figma-to-Style Dictionary integration that allows you to sync design tokens directly from Figma with simple prompts!

### Quick Start

```bash
# Set up your Figma credentials
cp .env.example .env
# Edit .env with your FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY

# Sync tokens from Figma
npm run figma:sync

# Or use natural language prompts
npm run figma:sync "update tokens from figma"
```

### Features

✅ **Prompt-based sync** - Use natural language to trigger token updates  
✅ **Figma API integration** - Fetch tokens directly from Figma files  
✅ **Style Dictionary** - Generate CSS, JS, TS, and JSON from tokens  
✅ **WSL compatible** - Works seamlessly on Windows Subsystem for Linux  
✅ **Multiple formats** - Output tokens as CSS variables, ES6 modules, TypeScript, or JSON  
✅ **Automatic merging** - Combines Figma tokens with manual base tokens  

### Available Commands

```bash
npm run figma:sync          # Prompt-based interface
npm run figma:status        # Check configuration
npm run tokens:sync         # Sync from Figma
npm run tokens:build        # Build Style Dictionary
```

### Documentation

- [Figma Integration Quick Start](./docs/FIGMA_QUICK_START.md)
- [Figma Integration Full Guide](./docs/FIGMA_INTEGRATION.md)
- [Theme System Documentation](./src/theme/README.md)

### Using Design Tokens

```css
/* CSS Variables */
@import '../build/tokens/css/variables.css';

.button {
  background: var(--color-primary-main);
  padding: var(--spacing-md);
}
```

```javascript
// JavaScript/TypeScript
import tokens from '../build/tokens/js/tokens.js';

const theme = {
  primaryColor: tokens.color.primary.main,
  spacing: tokens.spacing.md,
};
```

## License

ISC
