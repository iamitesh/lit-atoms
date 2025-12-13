import { ControlValueAccessor } from '@angular/forms';

/**
 * Base class for Angular ControlValueAccessor directives.
 * Implements the CVA interface to enable two-way binding with Angular forms.
 * 
 * This class handles:
 * - writeValue: Sets value on the native element
 * - registerOnChange: Registers callback for value changes
 * - registerOnTouched: Registers callback for touch events
 * - setDisabledState: Handles disabled state
 */
export abstract class LitControlValueAccessor implements ControlValueAccessor {
  protected onChange: (value: any) => void = () => {};
  protected onTouched: () => void = () => {};
  
  /**
   * Reference to the host element (the web component)
   */
  protected abstract get element(): HTMLElement;

  /**
   * Name of the property to set the value on
   */
  protected abstract get valueProperty(): string;

  /**
   * Writes a new value to the element
   */
  writeValue(value: any): void {
    if (this.element) {
      (this.element as any)[this.valueProperty] = value;
    }
  }

  /**
   * Registers a callback function that should be called when the control's value changes
   */
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that should be called when the control is touched
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state on the element
   */
  setDisabledState?(isDisabled: boolean): void {
    if (this.element) {
      (this.element as any).disabled = isDisabled;
    }
  }
}
