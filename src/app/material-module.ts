import { NgModule } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    exports:[
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatSlideToggleModule,
        MatMenuModule
    ]
})
export class MaterialModule{}