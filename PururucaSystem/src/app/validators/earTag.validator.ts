import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { DataBaseService } from '../services/data-base.service';
import { map } from 'rxjs/operators';

export function earTagValidator(dataBaseService: DataBaseService): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const earTag = control.value;
    return dataBaseService.checkEarTagExists(earTag).pipe(
      map(exists => (exists ? { earTagExists: true } : null))
    );
  };
}
