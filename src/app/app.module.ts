import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes , RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { DoListComponent } from './do-list/do-list.component';
import { DoEditComponent } from './do-list/do-edit/do-edit.component';
import { ToDoService } from './do-list/to-do.service';
import { FilterPipe } from './filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'   
import { DataStorageService } from './data-storage.service';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.srevice';
import { StatisticsComponent } from './statistics/statistics.component';
import { FooterComponent } from './footer/footer.component';

const appRouter : Routes = [
  { path: '', component: DoListComponent },
  { path: 'list', component: DoListComponent },
  { path: 'statistics', component: StatisticsComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    DoListComponent,
    DoEditComponent,
    FilterPipe,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    StatisticsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRouter),
    HttpModule
  ],
  providers: [ToDoService, DataStorageService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

