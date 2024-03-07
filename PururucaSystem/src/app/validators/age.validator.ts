import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ageValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = new Date(control.value);
    const currentDate = new Date();

    const differenceInMilliseconds = currentDate.getTime() - birthDate.getTime();

    const yearsDifference = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    if (yearsDifference <= 25) {
      return { ageInvalid: true };
    }

    return null;
  };
}
