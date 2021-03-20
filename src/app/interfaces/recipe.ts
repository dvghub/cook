import { Ingredient } from './ingredient';
import { Step } from './step';
import { Extra } from './extra';
import { Tag } from './tag';

export interface Recipe {
  id: number;
  name: string;
  people: number;
  preparationTime: string;
  waitTime: string;
  ingredients: Ingredient[];
  steps: Step[];
  extras: Extra[];
  tags: Tag[];
}
