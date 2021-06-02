import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(
    private http: HttpClient
  ) { }

  createRecipe(recipe) {
    return this.http.post(environment.apiUrl + '/recipes/new', JSON.stringify(recipe));
  }

  getRecipe(id: number): Promise<Recipe> {
    return new Promise<Recipe>(resolve => {
      this.http.get<Recipe>(environment.apiUrl + '/recipes/' + id).subscribe((data: Recipe) => resolve(data) );
    });
  }

  getRecipes() {
    return this.http.get<Recipe[]>(environment.apiUrl + '/recipes');
  }

  postRecipe(recipe) {
    console.log(environment.apiUrl + '/recipes/' + recipe.id);
    return this.http.post(environment.apiUrl + '/recipes/' + recipe.id, JSON.stringify(recipe));
  }
}
