import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe';
import { Step } from '../../interfaces/step';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '../../interfaces/ingredient';
import { Extra } from '../../interfaces/extra';
import { Tag } from '../../interfaces/tag';
import { Alert } from '../../interfaces/alert';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  alert: Alert = null;

  recipe: Recipe = null;

  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService,
    private fb: FormBuilder
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.setRecipeForm();

    if (id !== 0) {
      this.getRecipe(id).then(data => {
        this.recipe = data;
        this.setRecipeForm();
      });
    }
  }

  ngOnInit(): void { }

  async getRecipe(id: number): Promise<Recipe> {
    return await this.service.getRecipe(id);
  }

  submit(): void {
    if (this.recipeForm.status === 'VALID') {
      if (this.recipe !== null) {
        this.service.postRecipe(this.recipeForm.value)
          .subscribe(data => {
              this.router.navigate(['/recipe/' + this.recipe.id]);
              console.log(data);
            }, error => this.error(error)
          );
      } else {
        this.service.createRecipe(this.recipeForm.value)
          .subscribe(() => {
              this.alert = { message: 'Recipe "' + this.recipeForm.value.name + '" created!', type: 'success' };
              this.setRecipeForm();
            }, error => this.error(error)
          );
      }
    }
  }

  setRecipeForm(): void {
    const rn = (this.recipe === null);

    this.recipeForm = this.fb.group({
      id: [rn ? null : this.recipe.id],
      name: [rn ? null : this.recipe.name, Validators.required],
      people: rn ? null : this.recipe.people,
      preparationTime: rn ? null : this.recipe.preparationTime,
      waitTime: rn ? null : this.recipe.waitTime,
      ingredients: rn ? this.fb.array([this.createIngredient()]) : this.fb.array(this.recipe.ingredients.map(ingredient =>
        this.createIngredient(ingredient.amount, ingredient.quantity, ingredient.name))),
      steps: rn ? this.fb.array([this.createStep()]) : this.fb.array(this.recipe.steps.map(step => this.createStep(step.text))),
      extras: rn ? this.fb.array([this.createExtra()]) : this.fb.array(this.recipe.extras.map(extra => this.createExtra(extra.text))),
      tags: rn ? this.fb.array([this.createTag()]) : this.fb.array(this.recipe.tags.map(tag => this.createTag(tag.name)))
    });
  }

  error(error): void {
    let message: string;
    if (error.error instanceof ErrorEvent) {
      message = `Error: ${ error.error.message }`;
    } else {
      message = 'Error ' + error.status + ': ${err.message}';
    }
    this.alert = { message, type: 'danger' };
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  get extras(): FormArray {
    return this.recipeForm.get('extras') as FormArray;
  }

  get tags(): FormArray {
    return this.recipeForm.get('tags') as FormArray;
  }

  createIngredient(
    amount: number = null,
    quantity: string = null,
    name: string = null
  ) {
    return this.fb.group({
      amount: [amount, Validators.required],
      quantity,
      name: [name, Validators.required]
    });
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  createStep(text: string = null) {
    return this.fb.group({
      text: [text, Validators.required]
    });
  }

  addStep(): void {
    this.steps.push(this.createStep());
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  createExtra(text: string = null) {
    return this.fb.group({
      text: [text, Validators.required]
    });
  }

  addExtra(): void {
    this.extras.push(this.createExtra());
  }

  removeExtra(index: number): void {
    this.extras.removeAt(index);
  }

  createTag(name: string = null) {
    return this.fb.group({
      name: [name, Validators.required]
    });
  }

  // I love you little patat

  addTag(): void {
    this.tags.push(this.createTag());
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }
}
