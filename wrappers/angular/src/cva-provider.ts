import { forwardRef, Type } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Creates a provider for NG_VALUE_ACCESSOR
 * This utility is used in the directive providers array to enable CVA functionality
 * 
 * @param directiveType - The directive class to provide as NG_VALUE_ACCESSOR
 * @returns Provider configuration
 */
export function provideCVA(directiveType: Type<any>) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => directiveType),
    multi: true,
  };
}
