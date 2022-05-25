import { NgModule } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { MaterialModule } from "./material/material.module";

const modules = [MaterialModule, NgxChartsModule ];
@NgModule({
  imports: [...modules],
  exports: [...modules],
  declarations: [
  ],
})
export class SharedModule {}
