import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Step } from '../../interfaces/step';

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
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getRecipe(id).subscribe((data: Recipe) => this.recipe = data);
  }

  sortSteps(a: Step, b: Step): number {
    switch (true) {
      case a.index < b.index:
        return -1;
      case a.index > b.index:
        return 1;
      default:
        return 0;
    }
  }
}
