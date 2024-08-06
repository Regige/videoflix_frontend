import { Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { ImprintComponent } from './shared/imprint/imprint.component';
import { PrivacyPoliceComponent } from './shared/privacy-police/privacy-police.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'start-page', pathMatch: 'full'},
    { path: 'start-page', component: StartPageComponent},
    { path: 'main-page', component: MainPageComponent},
    { path: 'imprint', component: ImprintComponent},
    { path: 'privacy-police', component: PrivacyPoliceComponent}
];