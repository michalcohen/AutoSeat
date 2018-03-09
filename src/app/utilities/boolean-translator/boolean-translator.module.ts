import { NgModule } from '@angular/core';
import { BooleanTranslatorPipe } from './boolean-translator.pipe';

@NgModule({
    imports: [],
    declarations: [BooleanTranslatorPipe],
    exports: [BooleanTranslatorPipe],
})

export class BooleanTranslatorPipeModule {
    static forRoot() {
        return {
            ngModule: BooleanTranslatorPipeModule,
            providers: [],
        };
    }
} 