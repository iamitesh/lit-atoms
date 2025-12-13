import { Directive, ElementRef, HostListener } from '@angular/core';
import { LitControlValueAccessor } from './cva-base.js';
import { provideCVA } from './cva-provider.js';

/**
 * Angular directive for lit-input-field with ControlValueAccessor support
 * 
 * Usage:
 * ```html
 * <lit-input-field formControlName="name"></lit-input-field>
 * <lit-input-field [(ngModel)]="value"></lit-input-field>
 * <lit-input-field [formControl]="control"></lit-input-field>
 * ```
 */
@Directive({
  selector: 'lit-input-field[formControlName],lit-input-field[formControl],lit-input-field[ngModel]',
  providers: [provideCVA(LitInputFieldDirective)],
  standalone: true,
})
export class LitInputFieldDirective extends LitControlValueAccessor {
  constructor(private elementRef: ElementRef) {
    super();
  }

  protected get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  protected get valueProperty(): string {
    return 'value';
  }

  /**
   * Listen to the custom input-change event and propagate value changes
   */
  @HostListener('input-change', ['$event'])
  onInputChange(event: CustomEvent<{ value: string }>): void {
    this.onChange(event.detail.value);
    this.onTouched();
  }
}
