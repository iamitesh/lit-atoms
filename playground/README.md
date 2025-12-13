# Lit Atoms Playground

An interactive playground for testing and experimenting with Lit Atoms components in real-time.

## Features

- **Live Code Editor**: Write HTML and JavaScript code with syntax highlighting
- **Real-time Preview**: See your components render instantly
- **Console Output**: View console logs, errors, warnings, and info messages
- **Pre-built Examples**: Quick-start templates for all components
- **Resizable Panels**: Adjust editor and preview panel sizes to your preference
- **Auto-run**: Code executes automatically as you type (with debounce)

## Getting Started

### Start the Playground

```bash
npm run playground
```

This will start the development server at `http://localhost:3000`.

### Build the Playground

```bash
npm run build-playground
```

This will create a production build in the `playground-dist` directory.

## Using the Playground

### 1. Select a Component Example

Use the dropdown menu in the header to load pre-built examples:

- Button
- Input Field
- Card
- Badge
- Alert
- Checkbox
- Toggle
- Spinner
- Tabs
- Modal
- Table
- Form

### 2. Edit the Code

Type or modify HTML and JavaScript in the editor panel. The code will auto-execute after 500ms of inactivity for responsive feedback.

### 3. View the Preview

The preview panel shows the live rendered output of your code.

### 4. Check the Console

The console panel captures all `console.log()`, `console.error()`, `console.warn()`, and `console.info()` calls from your code.

## Layout

```
┌─────────────────────────────────────────────────────────┐
│  ⚛️ Lit Atoms Playground                    [Select] ▶️ 🔄│
├──────────────────┬──────────────────────────────────────┤
│                  │  Preview - Live Component Output     │
│  Editor          │                                       │
│  Write HTML/JS   │  [Component Preview Here]             │
│                  │                                       │
│                  ├──────────────────────────────────────┤
│                  │  Console                        Clear │
│                  │  [LOG] Messages appear here...        │
└──────────────────┴──────────────────────────────────────┘
```

## Controls

- **▶️ Run**: Manually execute the code
- **🔄 Reset**: Reset to the default welcome example
- **Clear**: Clear the console output
- **Resizer**: Drag the vertical divider to resize editor/preview panels

## Features

### Code Editor

- Dark theme for comfortable coding
- Tab key support (inserts 2 spaces, Shift+Tab for navigation)
- Auto-execution with 500ms debounce for responsive feedback
- Accessible with ARIA labels for screen readers
- Supports HTML, CSS (via `<style>` tags), and JavaScript (via `<script>` tags)

### Preview Panel

- Live rendering of components
- Full component interactivity
- Isolated execution context

### Console

- Captures all console methods
- Color-coded by message type:
  - Gray: `console.log()`
  - Red: `console.error()`
  - Yellow: `console.warn()`
  - Blue: `console.info()`
- Auto-scroll to latest message
- Clear button to reset

## Example Code

```html
<!-- Simple Button Example -->
<lit-button label="Click Me" variant="primary"></lit-button>

<script>
  const button = document.querySelector('lit-button');
  button.addEventListener('button-click', () => {
    console.log('Button clicked!');
  });
</script>
```

## Available Components

All 35+ Lit Atoms components are pre-loaded and ready to use:

- Form: `lit-button`, `lit-input-field`, `lit-checkbox`, `lit-radio`, `lit-textarea`, `lit-toggle`, `lit-dropdown`, `lit-form`
- Display: `lit-badge`, `lit-banner`, `lit-card`, `lit-tooltip`, `lit-spinner`, `lit-progress-bar`, `lit-divider`, `lit-chip`, `lit-avatar`, `lit-alert`
- Layout: `lit-header`, `lit-footer`, `lit-navigation`, `lit-sidebar`, `lit-modal`
- Navigation: `lit-breadcrumb`, `lit-pagination`, `lit-tabs`, `lit-menu`, `lit-link`
- Content: `lit-accordion`, `lit-list`, `lit-table`, `lit-table-header`, `lit-table-body`, `lit-table-row`, `lit-table-header-cell`, `lit-table-cell`

## Tips

1. **Use the examples** - Start with a pre-built example and modify it
2. **Check the console** - Errors and logs will appear in the console panel
3. **Resize panels** - Drag the divider to adjust layout to your preference
4. **Test interactivity** - All component events work in the preview
5. **Multiple components** - You can use multiple components in the same code

## Technologies

- **Vite** - Fast development server and build tool
- **Lit** - Web components framework
- **Vanilla JavaScript** - No additional dependencies

## Screenshot

![Lit Atoms Playground](https://github.com/user-attachments/assets/1dd9cdd0-6d48-4659-92fe-71d59dc4c08c)

The playground features a three-panel layout with an editor, live preview, and console for interactive component development.
