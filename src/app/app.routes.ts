import { Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { ImprintComponent } from './shared/imprint/imprint.component';
import { PrivacyPoliceComponent } from './shared/privacy-police/privacy-police.component';
import { MainPageComponent } from './main-page/main-page.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { MainPagePreviewComponent } from './main-page-preview/main-page-preview.component';

export const routes: Routes = [
    { path: '', redirectTo: 'main-page', pathMatch: 'full'},
    { path: 'start-page', component: StartPageComponent},
    { path: 'main-page', component: MainPageComponent},
    { path: 'main-page-preview', component: MainPagePreviewComponent},
    { path: 'imprint', component: ImprintComponent},
    { path: 'privacy-police', component: PrivacyPoliceComponent},
    { path: 'video-player', component: VideoPlayerComponent},
    { path: 'reset-password-form/:ref', component: PasswordResetComponent}
];
