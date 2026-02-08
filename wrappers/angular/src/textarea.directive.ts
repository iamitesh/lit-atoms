import { Directive, ElementRef, HostListener } from '@angular/core';
import { LitControlValueAccessor } from './cva-base.js';
import { provideCVA } from './cva-provider.js';

/**
 * Angular directive for lit-textarea with ControlValueAccessor support
 * 
 * Usage:
 * ```html
 * <lit-textarea formControlName="description"></lit-textarea>
 * <lit-textarea [(ngModel)]="text"></lit-textarea>
 * <lit-textarea [formControl]="control"></lit-textarea>
 * ```
 */
@Directive({
  selector: 'lit-textarea[formControlName],lit-textarea[formControl],lit-textarea[ngModel]',
  providers: [provideCVA(LitTextareaDirective)],
  standalone: true,
})
export class LitTextareaDirective extends LitControlValueAccessor {
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
   * Listen to the custom textarea-change event and propagate value changes
   */
  @HostListener('textarea-change', ['$event'])
  onTextareaChange(event: CustomEvent<{ value: string }>): void {
    this.onChange(event.detail.value);
    this.onTouched();
  }
}
