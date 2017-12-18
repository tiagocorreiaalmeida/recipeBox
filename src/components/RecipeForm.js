import React from "react";
import moment from "moment";
import uuid from "uuid";

export default class RecipeFrom extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onTextAreaChange = this.onTextAreaChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            title: this.props.recipe.id ? this.props.recipe.title : "",
            ingredients: this.props.recipe.id
                ? this.props.recipe.ingredients.join(",")
                : "",
            error: undefined
        };
    }

    onInputChange(e) {
        let title = e.target.value;
        this.setState(() => ({
            title
        }));
    }

    onTextAreaChange(e) {
        let ingredients = e.target.value;
        this.setState(() => ({
            ingredients
        }));
    }

    closeModal() {
        this.props.toggle();
    }

    onSubmit(e) {
        e.preventDefault();
        let title = this.state.title.trim();
        let ingredients = this.state.ingredients.trim();
        if (!this.state.title || !this.state.ingredients) {
            this.setState(() => ({ error: "Fill all the inputs" }));
        } else {
            this.setState(() => ({ error: undefined }));
            ingredients = ingredients
                .split(",")
                .map(ingredient => ingredient.trim());
            this.props.updateFunction({
                id: this.props.recipe.id ? this.props.recipe.id : uuid(),
                title,
                ingredients,
                date: this.props.recipe.id
                    ? this.props.recipe.date
                    : moment().valueOf()
            });
            e.target.title.value = "";
            e.target.ingredients.value = "";
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    name="title"
                    className="form-modal__input mb-3"
                    autoFocus
                    value={this.state.title}
                    onChange={this.onInputChange}
                    placeholder="Recipe title"
                />
                <textarea
                    col="3"
                    name="ingredients"
                    className="form-modal__textarea mb-3"
                    value={this.state.ingredients}
                    onChange={this.onTextAreaChange}
                    placeholder="Recipe ingredients separated by comma"
                />
                {this.state.error && <p>{this.state.error}</p>}
                <button
                    type="submit"
                    className="btn btn-custom--block btn-custom btn-custom--success"
                >
                    <i className="ion-checkmark-round" /> Save
                </button>
                <button
                    type="button"
                    className="btn btn-custom--block btn-custom btn-custom--danger"
                    onClick={this.closeModal}
                >
                    <i className="ion-close-round" /> Cancel
                </button>
            </form>
        );
    }
}
