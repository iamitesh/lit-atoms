// Import all lit-atoms components
import '../src/components/button.ts';
import '../src/components/input-field.ts';
import '../src/components/checkbox.ts';
import '../src/components/radio.ts';
import '../src/components/textarea.ts';
import '../src/components/toggle.ts';
import '../src/components/badge.ts';
import '../src/components/banner.ts';
import '../src/components/card.ts';
import '../src/components/dropdown.ts';
import '../src/components/tooltip.ts';
import '../src/components/spinner.ts';
import '../src/components/progress-bar.ts';
import '../src/components/divider.ts';
import '../src/components/chip.ts';
import '../src/components/header.ts';
import '../src/components/footer.ts';
import '../src/components/navigation.ts';
import '../src/components/accordion.ts';
import '../src/components/table.ts';
import '../src/components/table-header.ts';
import '../src/components/table-body.ts';
import '../src/components/table-row.ts';
import '../src/components/table-header-cell.ts';
import '../src/components/table-cell.ts';
import '../src/components/modal.ts';
import '../src/components/alert.ts';
import '../src/components/breadcrumb.ts';
import '../src/components/pagination.ts';
import '../src/components/tabs.ts';
import '../src/components/sidebar.ts';
import '../src/components/avatar.ts';
import '../src/components/menu.ts';
import '../src/components/form.ts';
import '../src/components/link.ts';
import '../src/components/list.ts';

// Import atoms console components
import '../src/playground/lit-atoms-console.ts';
import { installAtomsEventListener } from '../src/playground/atoms-event-listener.ts';

// Install atoms event listener once
installAtomsEventListener(document);

// Component examples
const examples = {
  button: `<!-- Button Examples -->
<lit-button label="Primary Button" variant="primary" size="medium"></lit-button>
<lit-button label="Secondary Button" variant="secondary" size="medium"></lit-button>
<lit-button label="Large Button" variant="primary" size="large"></lit-button>
<lit-button label="Small Button" variant="primary" size="small"></lit-button>
<lit-button label="Disabled Button" variant="primary" disabled></lit-button>

<script>
  // Add event listener
  document.querySelectorAll('lit-button').forEach(btn => {
    btn.addEventListener('button-click', (e) => {
      console.log('Button clicked:', e.target.label);
    });
  });
</script>`,

  input: `<!-- Input Field Examples -->
<lit-input-field 
  label="Email Address" 
  type="email" 
  placeholder="Enter your email"
></lit-input-field>

<lit-input-field 
  label="Password" 
  type="password" 
  placeholder="Enter password"
  helpertext="Must be at least 8 characters"
></lit-input-field>

<lit-input-field 
  label="Disabled Input" 
  value="Cannot edit this" 
  disabled
></lit-input-field>

<lit-input-field 
  label="With Error" 
  value="invalid@" 
  error="Please enter a valid email"
></lit-input-field>`,

  card: `<!-- Card Examples -->
<lit-card>
  <h2 slot="header">Card Title</h2>
  <p>This is the card content. Cards are great for grouping related information.</p>
  <p>You can add multiple paragraphs and other elements inside cards.</p>
  <div slot="footer" style="text-align: right;">
    <lit-button label="Cancel" variant="secondary" size="small"></lit-button>
    <lit-button label="Save" variant="primary" size="small"></lit-button>
  </div>
</lit-card>

<style>
  lit-card {
    margin-bottom: 20px;
  }
</style>`,

  badge: `<!-- Badge Examples -->
<div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
  <lit-badge label="New" variant="primary"></lit-badge>
  <lit-badge label="Success" variant="success"></lit-badge>
  <lit-badge label="Warning" variant="warning"></lit-badge>
  <lit-badge label="Error" variant="error"></lit-badge>
  <lit-badge label="Info" variant="info"></lit-badge>
</div>

<div style="margin-top: 20px;">
  <p>Status: <lit-badge label="Active" variant="success"></lit-badge></p>
  <p>Messages: <lit-badge label="5" variant="primary"></lit-badge></p>
</div>`,

  alert: `<!-- Alert Examples -->
<lit-alert 
  message="This is a success message!" 
  type="success"
></lit-alert>

<lit-alert 
  message="Warning: Please check your input." 
  type="warning"
></lit-alert>

<lit-alert 
  message="Error: Something went wrong." 
  type="error"
></lit-alert>

<lit-alert 
  message="Info: Here's some information." 
  type="info"
></lit-alert>

<style>
  lit-alert {
    margin-bottom: 15px;
  }
</style>`,

  checkbox: `<!-- Checkbox Examples -->
<lit-checkbox label="Accept terms and conditions" checked></lit-checkbox>
<lit-checkbox label="Subscribe to newsletter"></lit-checkbox>
<lit-checkbox label="Disabled option" disabled></lit-checkbox>
<lit-checkbox label="Checked and disabled" checked disabled></lit-checkbox>

<script>
  document.querySelectorAll('lit-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      console.log('Checkbox changed:', e.target.label, 'checked:', e.target.checked);
    });
  });
</script>

<style>
  lit-checkbox {
    display: block;
    margin-bottom: 10px;
  }
</style>`,

  toggle: `<!-- Toggle Examples -->
<div style="display: flex; flex-direction: column; gap: 15px;">
  <div>
    <label>Enable notifications</label>
    <lit-toggle checked></lit-toggle>
  </div>
  
  <div>
    <label>Dark mode</label>
    <lit-toggle></lit-toggle>
  </div>
  
  <div>
    <label>Disabled toggle</label>
    <lit-toggle disabled></lit-toggle>
  </div>
</div>

<script>
  document.querySelectorAll('lit-toggle').forEach(toggle => {
    toggle.addEventListener('toggle-change', (e) => {
      console.log('Toggle changed:', e.detail.checked);
    });
  });
</script>`,

  spinner: `<!-- Spinner Examples -->
<div style="display: flex; gap: 30px; align-items: center;">
  <div>
    <p>Small</p>
    <lit-spinner size="small"></lit-spinner>
  </div>
  
  <div>
    <p>Medium</p>
    <lit-spinner size="medium"></lit-spinner>
  </div>
  
  <div>
    <p>Large</p>
    <lit-spinner size="large"></lit-spinner>
  </div>
</div>

<div style="margin-top: 30px;">
  <p>Loading data... <lit-spinner size="small"></lit-spinner></p>
</div>`,

  tabs: `<!-- Tabs Example -->
<lit-tabs>
  <div slot="tab-1">Tab 1</div>
  <div slot="panel-1">
    <h3>Content for Tab 1</h3>
    <p>This is the content for the first tab.</p>
    <lit-button label="Action" variant="primary"></lit-button>
  </div>
  
  <div slot="tab-2">Tab 2</div>
  <div slot="panel-2">
    <h3>Content for Tab 2</h3>
    <p>This is the content for the second tab.</p>
  </div>
  
  <div slot="tab-3">Tab 3</div>
  <div slot="panel-3">
    <h3>Content for Tab 3</h3>
    <p>This is the content for the third tab.</p>
  </div>
</lit-tabs>`,

  modal: `<!-- Modal Example -->
<lit-button label="Open Modal" variant="primary" id="openModal"></lit-button>

<lit-modal id="myModal" title="Example Modal">
  <p>This is a modal dialog. You can put any content here.</p>
  <p>Click the close button or outside to dismiss.</p>
  <div slot="footer">
    <lit-button label="Cancel" variant="secondary" id="cancelBtn"></lit-button>
    <lit-button label="Confirm" variant="primary" id="confirmBtn"></lit-button>
  </div>
</lit-modal>

<script>
  const modal = document.getElementById('myModal');
  const openBtn = document.getElementById('openModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const confirmBtn = document.getElementById('confirmBtn');
  
  openBtn.addEventListener('button-click', () => {
    modal.open = true;
  });
  
  cancelBtn.addEventListener('button-click', () => {
    modal.open = false;
  });
  
  confirmBtn.addEventListener('button-click', () => {
    console.log('Confirmed!');
    modal.open = false;
  });
</script>`,

  table: `<!-- Table Example -->
<lit-table>
  <lit-table-header>
    <lit-table-row>
      <lit-table-header-cell>Name</lit-table-header-cell>
      <lit-table-header-cell>Email</lit-table-header-cell>
      <lit-table-header-cell>Role</lit-table-header-cell>
    </lit-table-row>
  </lit-table-header>
  
  <lit-table-body>
    <lit-table-row>
      <lit-table-cell>John Doe</lit-table-cell>
      <lit-table-cell>john@example.com</lit-table-cell>
      <lit-table-cell>Admin</lit-table-cell>
    </lit-table-row>
    <lit-table-row>
      <lit-table-cell>Jane Smith</lit-table-cell>
      <lit-table-cell>jane@example.com</lit-table-cell>
      <lit-table-cell>User</lit-table-cell>
    </lit-table-row>
    <lit-table-row>
      <lit-table-cell>Bob Johnson</lit-table-cell>
      <lit-table-cell>bob@example.com</lit-table-cell>
      <lit-table-cell>User</lit-table-cell>
    </lit-table-row>
  </lit-table-body>
</lit-table>`,

  form: `<!-- Form Example -->
<lit-form>
  <lit-input-field 
    label="Full Name" 
    placeholder="Enter your name"
    required
  ></lit-input-field>
  
  <lit-input-field 
    label="Email" 
    type="email" 
    placeholder="your@email.com"
    required
  ></lit-input-field>
  
  <lit-textarea 
    label="Message" 
    placeholder="Enter your message"
    rows="4"
  ></lit-textarea>
  
  <lit-checkbox label="I agree to the terms"></lit-checkbox>
  
  <div style="margin-top: 15px;">
    <lit-button label="Submit" variant="primary"></lit-button>
    <lit-button label="Cancel" variant="secondary"></lit-button>
  </div>
</lit-form>

<style>
  lit-input-field,
  lit-textarea,
  lit-checkbox {
    display: block;
    margin-bottom: 15px;
  }
</style>`
};

// Default example
const defaultExample = `<!-- Welcome to Lit Atoms Playground! -->
<div style="text-align: center; padding: 40px;">
  <h1>🎨 Welcome to Lit Atoms Playground</h1>
  <p style="margin: 20px 0;">Select a component from the dropdown above to see examples.</p>
  
  <div style="margin-top: 30px;">
    <lit-button label="Get Started" variant="primary" size="large"></lit-button>
  </div>
  
  <div style="margin-top: 40px;">
    <h2>Quick Example</h2>
    <lit-card>
      <h3 slot="header">Card Component</h3>
      <p>Try editing this code in the editor!</p>
      <div slot="footer">
        <lit-badge label="Interactive" variant="success"></lit-badge>
      </div>
    </lit-card>
  </div>
</div>

<script>
  console.log('Welcome to Lit Atoms Playground! 🚀');
</script>`;

// DOM Elements
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const consoleOutput = document.getElementById('console');
const runBtn = document.getElementById('runBtn');
const resetBtn = document.getElementById('resetBtn');
const clearConsoleBtn = document.getElementById('clearConsole');
const componentSelect = document.getElementById('componentSelect');
const resizer = document.getElementById('resizer');

// Initialize with default example
editor.value = defaultExample;

// Console capture
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  info: console.info
};

function addConsoleEntry(message, type = 'log') {
  const entry = document.createElement('div');
  entry.className = `console-entry ${type}`;
  entry.textContent = `[${type.toUpperCase()}] ${message}`;
  consoleOutput.appendChild(entry);
  consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Override console methods
console.log = (...args) => {
  originalConsole.log(...args);
  addConsoleEntry(args.join(' '), 'log');
};

console.error = (...args) => {
  originalConsole.error(...args);
  addConsoleEntry(args.join(' '), 'error');
};

console.warn = (...args) => {
  originalConsole.warn(...args);
  addConsoleEntry(args.join(' '), 'warn');
};

console.info = (...args) => {
  originalConsole.info(...args);
  addConsoleEntry(args.join(' '), 'info');
};

// Clear console
clearConsoleBtn.addEventListener('click', () => {
  consoleOutput.innerHTML = '';
});

// Run code
function runCode() {
  try {
    // Clear preview
    preview.innerHTML = '';
    
    const code = editor.value;
    
    // Extract HTML and script parts
    const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
    const styleRegex = /<style>([\s\S]*?)<\/style>/gi;
    
    let html = code;
    const scripts = [];
    const styles = [];
    
    // Extract scripts
    let match;
    while ((match = scriptRegex.exec(code)) !== null) {
      scripts.push(match[1]);
    }
    
    // Extract styles
    while ((match = styleRegex.exec(code)) !== null) {
      styles.push(match[1]);
    }
    
    // Remove scripts and styles from HTML
    html = html.replace(scriptRegex, '').replace(styleRegex, '');
    
    // Add HTML to preview
    preview.innerHTML = html;
    
    // Add styles
    styles.forEach(styleContent => {
      const styleEl = document.createElement('style');
      styleEl.textContent = styleContent;
      preview.appendChild(styleEl);
    });
    
    // Execute scripts
    scripts.forEach(scriptContent => {
      try {
        // Note: Using Function constructor for code execution in playground environment.
        // This is intentional for the interactive playground use case.
        // Users should only run code they trust.
        const func = new Function('preview', scriptContent);
        func(preview);
      } catch (err) {
        console.error('Script error:', err.message);
      }
    });
    
    console.log('Code executed successfully ✓');
  } catch (err) {
    console.error('Error running code:', err.message);
  }
}

// Event listeners
runBtn.addEventListener('click', runCode);

resetBtn.addEventListener('click', () => {
  editor.value = defaultExample;
  runCode();
});

componentSelect.addEventListener('change', (e) => {
  const selected = e.target.value;
  if (selected && examples[selected]) {
    editor.value = examples[selected];
    runCode();
  }
});

// Auto-run on editor change (with debounce)
let debounceTimer;
editor.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    runCode();
  }, 500); // 500ms for responsive feedback
});

// Resizer functionality
let isResizing = false;
let startX;
let startWidth;

resizer.addEventListener('mousedown', (e) => {
  isResizing = true;
  startX = e.clientX;
  const editorPanel = document.querySelector('.editor-panel');
  startWidth = editorPanel.offsetWidth;
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;
  
  const editorPanel = document.querySelector('.editor-panel');
  const diff = e.clientX - startX;
  const newWidth = startWidth + diff;
  const containerWidth = document.querySelector('.content').offsetWidth;
  
  // Limit width between 20% and 80% of container
  const minWidth = containerWidth * 0.2;
  const maxWidth = containerWidth * 0.8;
  
  if (newWidth >= minWidth && newWidth <= maxWidth) {
    editorPanel.style.flex = 'none';
    editorPanel.style.width = newWidth + 'px';
  }
});

document.addEventListener('mouseup', () => {
  if (isResizing) {
    isResizing = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }
});

// Tab handling in editor
editor.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' && !e.shiftKey) {
    // Insert tab only if Shift is not pressed (allow Shift+Tab for navigation)
    e.preventDefault();
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const value = editor.value;
    editor.value = value.substring(0, start) + '  ' + value.substring(end);
    editor.selectionStart = editor.selectionEnd = start + 2;
  }
  // Shift+Tab allows normal keyboard navigation
});

// Console tab switching
const jsConsoleTab = document.getElementById('jsConsoleTab');
const atomsConsoleTab = document.getElementById('atomsConsoleTab');
const jsConsole = document.getElementById('console');
const atomsConsole = document.getElementById('atomsConsole');

jsConsoleTab.addEventListener('click', () => {
  jsConsoleTab.classList.add('active');
  atomsConsoleTab.classList.remove('active');
  jsConsole.style.display = 'block';
  atomsConsole.style.display = 'none';
});

atomsConsoleTab.addEventListener('click', () => {
  atomsConsoleTab.classList.add('active');
  jsConsoleTab.classList.remove('active');
  jsConsole.style.display = 'none';
  atomsConsole.style.display = 'block';
});

// Initial run
runCode();
console.log('Playground initialized! 🎮');
