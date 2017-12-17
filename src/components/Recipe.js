import React from "react";
import moment from "moment";

export default class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.removeCurrentRecipe = this.removeCurrentRecipe.bind(this);
    }
    removeCurrentRecipe() {
        this.props.removeRecipe(this.props.id);
    }
    render() {
        return (
            <li className="list-group-item">
                <a
                    data-toggle="collapse"
                    href={`#${this.props.id}`}
                    aria-expanded="false"
                    aria-controls="collapseExample"
                >
                    {this.props.title}
                </a>

                <div className="collapse col-md-12 mt-3" id={this.props.id}>
                    <h1 className="text-center">
                        <i className="ion-ios-list-outline" /> Ingredients
                    </h1>
                    <ul className="lead mb-3 ingredient__list">
                        {this.props.ingredients.map(ingredient => (
                            <li className="ingredient__item" key={ingredient}>
                                {ingredient}
                            </li>
                        ))}
                    </ul>
                    <button type="button" className="btn btn-info">
                        <i className="ion-edit" />Edit
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.removeCurrentRecipe}
                    >
                        <i className="ion-trash-b" /> Delete
                    </button>
                </div>
            </li>
        );
    }
}

//
