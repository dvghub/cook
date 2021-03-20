import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private service: RecipeService
  ) { }

  ngOnInit(): void {
    this.service.getRecipes().subscribe((data: Recipe[]) => this.recipes = data);
  }
}
