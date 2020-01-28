
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabBarComponent } from './tab-bar.component';

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [TabBarComponent],
    exports: [TabBarComponent],
})
export class ComponentsModule{}