import { Directive, ElementRef, HostListener } from '@angular/core';
import { LitControlValueAccessor } from './cva-base.js';
import { provideCVA } from './cva-provider.js';

/**
 * Angular directive for lit-toggle with ControlValueAccessor support
 * 
 * Usage:
 * ```html
 * <lit-toggle formControlName="enabled"></lit-toggle>
 * <lit-toggle [(ngModel)]="isToggled"></lit-toggle>
 * <lit-toggle [formControl]="control"></lit-toggle>
 * ```
 */
@Directive({
  selector: 'lit-toggle[formControlName],lit-toggle[formControl],lit-toggle[ngModel]',
  providers: [provideCVA(LitToggleDirective)],
  standalone: true,
})
export class LitToggleDirective extends LitControlValueAccessor {
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
   * Listen to the custom toggle-change event and propagate value changes
   */
  @HostListener('toggle-change', ['$event'])
  onToggleChange(event: CustomEvent<{ checked: boolean }>): void {
    this.onChange(event.detail.checked);
    this.onTouched();
  }
}
