import React from "react";
import moment from "moment";

export default class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.removeCurrentRecipe = this.removeCurrentRecipe.bind(this);
        this.editCurrentRecipe = this.editCurrentRecipe.bind(this);
    }
    removeCurrentRecipe() {
        this.props.removeRecipe(this.props.recipe.id);
    }

    editCurrentRecipe() {
        this.props.editRecipe(this.props.recipe);
    }

    render() {
        return (
            <li className="list-group-item">
                <a
                    data-toggle="collapse"
                    href={`#${this.props.recipe.id}`}
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    className="recipe__link"
                >
                    <h2 className="recipe__title">{this.props.recipe.title}</h2>{" "}
                    <span className="recipe__date">
                        <i className="ion-calendar" />{" "}
                        {moment
                            .unix(this.props.recipe.date / 1000)
                            .format("DD-MM-YYYY")}
                    </span>
                </a>

                <div
                    className="collapse col-md-12 mt-3"
                    id={this.props.recipe.id}
                >
                    <h3 className="text-center mb-3 recipe__subtitle">
                        <i className="ion-ios-list-outline" /> Ingredients
                    </h3>
                    <ul className="mb-3 ingredient__list">
                        {this.props.recipe.ingredients.map(
                            (ingredient, index) => (
                                <li
                                    className="ingredient__item"
                                    key={ingredient + index}
                                >
                                    {ingredient}
                                </li>
                            )
                        )}
                    </ul>
                    <button
                        type="button"
                        className="btn btn-custom btn-custom--success"
                        onClick={this.editCurrentRecipe}
                    >
                        <i className="ion-edit" /> Edit
                    </button>
                    <button
                        type="button"
                        className="btn btn-custom btn-custom--danger"
                        onClick={this.removeCurrentRecipe}
                    >
                        <i className="ion-trash-b" /> Delete
                    </button>
                </div>
            </li>
        );
    }
}
