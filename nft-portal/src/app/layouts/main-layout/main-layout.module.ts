import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainLayoutComponent } from './main-layout.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class MainLayoutModule {
}
