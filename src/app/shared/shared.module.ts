import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";

const modules = [MaterialModule];
@NgModule({
  imports: [...modules],
  exports: [...modules],
  declarations: [
  ],
})
export class SharedModule {}
