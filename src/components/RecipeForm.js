import React from "react";
import moment from "moment";
import uuid from "uuid";

export default class RecipeFrom extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            error: undefined
        };
    }
    onSubmit(e) {
        e.preventDefault();
        let title = e.target.title.value.trim();
        let ingredients = e.target.ingredients.value.trim();
        if (!title || !ingredients) {
            console.log("something missing");
            this.setState(() => ({ error: "Fill all the inputs" }));
        } else {
            this.setState(() => ({ error: undefined }));
            ingredients = ingredients.split(",");
            this.props.updateFunction({
                id: uuid(),
                title,
                ingredients,
                date: moment().valueOf()
            });
            e.target.title.value = "";
            e.target.ingredients.value = "";
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" name="title" autoFocus />
                <textarea col="3" name="ingredients" />
                <button>Submit</button>
                {this.state.error && <p>{this.state.error}</p>}
            </form>
        );
    }
}
