import React from "react";
import Recipe from "./Recipe";

export default class RecipesList extends React.Component {
    render() {
        return (
            <ul className="list-group" key="recipe-list">
                {this.props.recipes.map(recipe => (
                    <Recipe
                        key={recipe.id}
                        id={recipe.id}
                        title={recipe.title}
                        date={recipe.date}
                        ingredients={recipe.ingredients}
                        removeRecipe={this.props.removeRecipe}
                    />
                ))}
            </ul>
        );
    }
}
