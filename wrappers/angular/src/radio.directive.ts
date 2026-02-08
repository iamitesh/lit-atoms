import { Directive, ElementRef, HostListener } from '@angular/core';
import { LitControlValueAccessor } from './cva-base.js';
import { provideCVA } from './cva-provider.js';

/**
 * Angular directive for lit-radio with ControlValueAccessor support
 * 
 * Usage:
 * ```html
 * <lit-radio formControlName="option"></lit-radio>
 * <lit-radio [(ngModel)]="selected"></lit-radio>
 * <lit-radio [formControl]="control"></lit-radio>
 * ```
 */
@Directive({
  selector: 'lit-radio[formControlName],lit-radio[formControl],lit-radio[ngModel]',
  providers: [provideCVA(LitRadioDirective)],
  standalone: true,
})
export class LitRadioDirective extends LitControlValueAccessor {
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
   * Listen to the custom radio-change event and propagate value changes
   */
  @HostListener('radio-change', ['$event'])
  onRadioChange(event: CustomEvent<{ checked: boolean; value: string }>): void {
    this.onChange(event.detail.checked);
    this.onTouched();
  }
}
