import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatDialogModule, MatButtonModule, MatSortModule } from '@angular/material';

import { ManagerComponent } from './manager.component';
import { TableEditDialog } from './table-edit-dialog/table-edit-dialog.component';
import { BooleanTranslatorPipeModule } from '../utilities/boolean-translator/boolean-translator.module';
import { TablesViewComponent } from './tables-view/tables-view.component';
import { ForDariaComponent } from './for-daria/for-daria.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        ManagerComponent,
        TableEditDialog,
        TablesViewComponent,
        ForDariaComponent
    ],
    entryComponents: [
        TableEditDialog
    ],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        MatButtonModule,
        BooleanTranslatorPipeModule
    ],
})
export class ManagerModule { }
