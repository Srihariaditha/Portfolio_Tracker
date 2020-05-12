import React, {Component} from 'react'
import  Aux from '../../hoc/Aux'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 0.2,
  meat: 3
}

class BurgerBuilder extends Component{
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }
  
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }
  
  updatePurchaseState(ingredients){
      const sum = Object.keys(ingredients)
        .map(igKey => {
          return ingredients[igKey];
        }).reduce((sum, el) => {
          return sum+el;
        },0)
      this.setState({purchasable: sum>0})
  }
  
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  }
  
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <=0){
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  }
  
  purchaseHandler = () => {
    this.setState({purchasing: true});
  }
  
  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }
  
  purchaseContineHandler = () => {
    alert("You Purchased");
  }
  
  render(){
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    console.log(disabledInfo)
    return(
      <Aux>
          <Burger ingredients={this.state.ingredients} />
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            <OrderSummary 
              purachaseCancel = {this.purchaseCancelHandler}
              purchaseContinue = {this.purchaseContineHandler}
              ingredients={this.state.ingredients}
              price= {this.state.totalPrice}/>
          </Modal>
          <BuildControls
            ingredientAdded={this.addIngredientHandler} 
            ingredientRemoved = {this.removeIngredientHandler}
            disabled= {disabledInfo}
            purchasable= {this.state.purchasable}
            ordered={this.purchaseHandler}
            price= {this.state.totalPrice} />
      </Aux>
    );
  }
}

export default BurgerBuilder;