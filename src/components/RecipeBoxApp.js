import React from "react";
import uuid from "uuid";
import moment from "moment";
import Modal from "react-modal";
import RecipesList from "./RecipesList";
import RecipeFrom from "./RecipeForm";

export default class RecipeBoxApp extends React.Component {
    constructor(props) {
        super(props);
        this.removeRecipe = this.removeRecipe.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
        this.modalStateToggle = this.modalStateToggle.bind(this);
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
            ],
            modalState: false,
            recipe: ""
        };
    }

    componentDidMount() {
        if (localStorage.getItem("recipes")) {
            this.setState(() => ({
                recipes: JSON.parse(localStorage.getItem("recipes"))
            }));
        }
    }

    componentDidUpdate() {
        localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
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
            recipes: [...this.state.recipes, recipe],
            modalState: !prevState.modalState
        }));
    }

    editRecipe(currentRecipe) {
        this.setState((prevState, props) => {
            let recipes = prevState.recipes.map(recipe => {
                if (recipe.id === currentRecipe.id) {
                    return {
                        id: recipe.id,
                        title: currentRecipe.title,
                        ingredients: currentRecipe.ingredients,
                        date: recipe.date
                    };
                }
                return recipe;
            });
            return {
                recipes,
                modalState: !prevState.modalState,
                recipe: ""
            };
        });
    }

    modalStateToggle(recipe = {}) {
        this.setState((prevState, props) => ({
            modalState: !prevState.modalState,
            recipe: recipe.id ? recipe : ""
        }));
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center mt-5 mb-5 title">
                    <i className="ion-ios-nutrition title__icon" />Recipe Box
                </h1>
                <Modal
                    isOpen={this.state.modalState}
                    onRequestClose={this.onRequestClose}
                    closeTimeoutMS={200}
                    ariaHideApp={false}
                    onRequestClose={this.modalStateToggle}
                    className="form-modal"
                >
                    <h1 className="form-modal__title mb-4 mt-2">
                        <i
                            className={
                                this.state.recipe ? "ion-edit" : "ion-compose"
                            }
                        />{" "}
                        {this.state.recipe
                            ? "Update Recipe"
                            : "Create new recipe"}
                    </h1>
                    <RecipeFrom
                        updateFunction={
                            this.state.recipe ? this.editRecipe : this.addRecipe
                        }
                        recipe={this.state.recipe ? this.state.recipe : {}}
                        toggle={this.modalStateToggle}
                    />
                </Modal>
                <RecipesList
                    recipes={this.state.recipes}
                    removeRecipe={this.removeRecipe}
                    editRecipe={this.modalStateToggle}
                />
                <div className="text-center mt-3">
                    <button
                        onClick={this.modalStateToggle}
                        className="btn btn-custom btn-custom--orange"
                    >
                        <i className="ion-compose" /> New Recipe
                    </button>
                </div>
            </div>
        );
    }
}
