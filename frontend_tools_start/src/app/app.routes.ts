import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KisteComponent } from './kiste/kiste.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'kiste', component: KisteComponent},
    { path: 'edit', component: EditComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent}
];
