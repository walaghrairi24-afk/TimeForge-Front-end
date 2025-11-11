import { Routes } from '@angular/router';
import {UpdateGoalComponent} from './wala/update-goal/update-goal.component';
import {ShowGoalComponent} from './wala/show-goal/show-goal.component';
import {CreateGoalComponent} from './wala/create-goal/create-goal.component';
import {ListGoalComponent} from './wala/list-goal/list-goal.component';

export const routes: Routes = [
  { path: 'goals/create', component: CreateGoalComponent },
  { path: 'goals/:id', component: ShowGoalComponent },
  { path: 'goals/:id/edit', component: UpdateGoalComponent },
   { path: 'goals', component: ListGoalComponent }, // À créer
  { path: '', redirectTo: '/goals', pathMatch: 'full' },
  { path: '**', redirectTo: '/goals' }
];
