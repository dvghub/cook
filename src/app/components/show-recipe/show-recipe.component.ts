import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-recipe',
  templateUrl: './show-recipe.component.html',
  styleUrls: ['./show-recipe.component.scss']
})
export class ShowRecipeComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private service: RecipeService
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getRecipe(id).then(data => this.recipe = data);
  }

  ngOnInit(): void { }

  async getRecipe(id: number): Promise<Recipe> {
    return await this.service.getRecipe(id);
  }
}
