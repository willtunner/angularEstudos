import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebugFormComponent } from './debug-form/debug-form.component';



@NgModule({
  declarations: [
    DebugFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DebugFormComponent
  ]
})
export class SharedModule { }
