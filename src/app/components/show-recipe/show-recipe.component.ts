import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from '../../interfaces/alert';

@Component({
  selector: 'app-show-recipe',
  templateUrl: './show-recipe.component.html',
  styleUrls: ['./show-recipe.component.scss']
})
export class ShowRecipeComponent implements OnInit {
  recipe: Recipe;
  alert: Alert = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: RecipeService
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getRecipe(id).then(data => this.recipe = data);
  }

  ngOnInit(): void { }

  deleteRecipe(id: number) {
    this.service.deleteRecipe(id).subscribe(() => {
      this.router.navigate(['/recipes']);
    }, error => {
      this.alert = { message: 'Recipe couldn\'t be deleted, error: ' + error + '!', type: 'danger' };
    });
  }
}
