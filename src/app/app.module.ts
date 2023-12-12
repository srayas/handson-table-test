import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotTableModule } from '@handsontable/angular';
import { HttpClientModule } from '@angular/common/http';
import {
  registerCellType,
  NumericCellType,
} from 'handsontable/cellTypes';
import {
  registerPlugin,
  UndoRedo,
} from 'handsontable/plugins';
import { registerAllModules } from 'handsontable/registry';
import { AppService } from './app.service';
import { HttpService } from './http.service';
registerCellType(NumericCellType);
registerPlugin(UndoRedo);
registerAllModules();
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HotTableModule,
    HttpClientModule
  ],
  providers: [AppService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }