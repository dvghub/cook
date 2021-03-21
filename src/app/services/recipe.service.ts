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

  getRecipe(id: number) {
    return this.http.get<Recipe>(environment.apiUrl + '/recipe/' + id);
  }

  getRecipes() {
    return this.http.get<Recipe[]>(environment.apiUrl + '/recipes');
  }
}
