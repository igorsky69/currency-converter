import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: 'converter', component: CurrencyConverterComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: CurrencyConverterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

