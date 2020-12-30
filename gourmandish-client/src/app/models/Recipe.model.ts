export interface Recipe {
  _id: string;
  title: string;
  description: string;
  imagePath: string;
  creator: RecipeCreator;
  createdAt: Date;
  updatedAt: Date;
  likes: string[];
}

export interface RecipeCreator {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}
