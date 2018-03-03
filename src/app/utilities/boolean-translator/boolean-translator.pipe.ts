import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'booleanTranslator'})
export class BooleanTranslatorPipe implements PipeTransform {
    transform(value: boolean) {
        return value ? 'כן' : 'לא';
    }
}