import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './pages/room/room.component';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { UsersComponent } from './pages/users/users.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SelectorComponent } from './components/selector/selector.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CreateAdminComponent } from './pages/create-admin/create-admin.component';
import { CountComponent } from './components/count/count.component';
import { AuthComponent } from './auth/auth.component';
import { AlertComponent } from './components/alert/alert.component';
import { NoDataComponent } from './components/no-data/no-data.component';

const config: SocketIoConfig = {
  url: 'http://localhost:3200',
  options: {},
};

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    MenuComponent,
    ContentComponent,
    DashboardComponent,
    RequestsComponent,
    UsersComponent,
    ProfileComponent,
    SettingsComponent,
    RoomsComponent,
    LoaderComponent,
    SelectorComponent,
    CreateAdminComponent,
    CountComponent,
    AuthComponent,
    AlertComponent,
    NoDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
