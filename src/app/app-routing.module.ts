import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShowRecipeComponent } from './components/show-recipe/show-recipe.component';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipe/:id', component: ShowRecipeComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
