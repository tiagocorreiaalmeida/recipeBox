import React from "react";
import uuid from "uuid";
import moment from "moment";
import RecipesList from "./RecipesList";
import RecipeFrom from "./RecipeForm";

export default class RecipeBoxApp extends React.Component {
    constructor(props) {
        super(props);
        this.removeRecipe = this.removeRecipe.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.state = {
            recipes: [
                {
                    id: uuid(),
                    title: "Pizza Margherita",
                    ingredients: [
                        "300g strong bread flour",
                        "1 tsp instant yeast (from a sachet or a tub)",
                        "1 tsp salt",
                        "1 tbsp olive oil",
                        "100ml passata",
                        "1 garlic clove",
                        "125g ball mozzarella",
                        "handful cherry tomatoes",
                        "handful grated or shaved parmesan"
                    ],
                    date: moment().valueOf()
                }
            ]
        };
    }
    removeRecipe(id) {
        this.setState((prevState, props) => {
            let recipes = prevState.recipes.filter(recipe => recipe.id !== id);
            return {
                recipes
            };
        });
    }

    addRecipe(recipe) {
        this.setState((prevState, props) => ({
            recipes: [...this.state.recipes, recipe]
        }));
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center mt-5 mb-4">
                    <i className="ion-ios-nutrition-outline" /> Recipe Box
                </h1>
                <RecipesList
                    recipes={this.state.recipes}
                    removeRecipe={this.removeRecipe}
                />
                <RecipeFrom updateFunction={this.addRecipe} />
            </div>
        );
    }
}
