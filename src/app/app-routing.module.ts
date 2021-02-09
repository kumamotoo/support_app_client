import { CreateAdminComponent } from './pages/create-admin/create-admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoomComponent } from './pages/room/room.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { UsersComponent } from './pages/users/users.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'rooms',
    component: RoomsComponent,
  },
  {
    path: 'rooms/:id',
    component: RoomComponent,
  },
  {
    path: 'requests',
    component: RequestsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'create',
    component: CreateAdminComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
