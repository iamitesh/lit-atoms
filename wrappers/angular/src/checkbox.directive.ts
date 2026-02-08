import { Directive, ElementRef, HostListener } from '@angular/core';
import { LitControlValueAccessor } from './cva-base.js';
import { provideCVA } from './cva-provider.js';

/**
 * Angular directive for lit-checkbox with ControlValueAccessor support
 * 
 * Usage:
 * ```html
 * <lit-checkbox formControlName="agree"></lit-checkbox>
 * <lit-checkbox [(ngModel)]="checked"></lit-checkbox>
 * <lit-checkbox [formControl]="control"></lit-checkbox>
 * ```
 */
@Directive({
  selector: 'lit-checkbox[formControlName],lit-checkbox[formControl],lit-checkbox[ngModel]',
  providers: [provideCVA(LitCheckboxDirective)],
  standalone: true,
})
export class LitCheckboxDirective extends LitControlValueAccessor {
  constructor(private elementRef: ElementRef) {
    super();
  }

  protected get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  protected get valueProperty(): string {
    return 'checked';
  }

  /**
   * Listen to the custom checkbox-change event and propagate value changes
   */
  @HostListener('checkbox-change', ['$event'])
  onCheckboxChange(event: CustomEvent<{ checked: boolean; value: string }>): void {
    this.onChange(event.detail.checked);
    this.onTouched();
  }
}
