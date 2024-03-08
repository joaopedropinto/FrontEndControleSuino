import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { DataBaseService } from '../services/data-base.service';
import { map } from 'rxjs/operators';

export function earTagValidator(dataBaseService: DataBaseService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const earTag = control.value;

    if (!earTag) {
      return { required: true }; // Campo obrigatório não preenchido
    }

    return dataBaseService.checkEarTagExists(earTag).pipe(
      map(exists => (exists ? { earTagExists: true } : null))
    );
  };
}
