import React, {Component} from 'react'
import  Aux from '../../hoc/Aux/Aux'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

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
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  }
  
  componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data})
      }).catch(error => this.setState({error: error}))
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
    //alert("You Purchased");
    this.setState({loading: true})
    const order = {
      ingeredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer:{
        name: "Srihari",
        address:{
          street: 'Test1',
          zipCode: 'ghddfdf',
          country: 'India'  
        },
        email: 'User@testmail.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({loading: false, purchasing: false})
      })
      .catch(error => {
        console.log(error)
        this.setState({loading: false, purchasing: false})
      });
   }
  
  render(){
    const disabledInfo = {
      ...this.state.ingredients
    }
    
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    
    let orderSummary = null
    let burger = this.state.error ? <p> Ingredient's cannot be loaded </p> : <Spinner />
    if(this.state.ingredients){
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler} 
            ingredientRemoved = {this.removeIngredientHandler}
            disabled= {disabledInfo}
            purchasable= {this.state.purchasable}
            ordered={this.purchaseHandler}
            price= {this.state.totalPrice} />
        </Aux>
      )
      orderSummary = <OrderSummary 
        purachaseCancel = {this.purchaseCancelHandler}
        purchaseContinue = {this.purchaseContineHandler}
        ingredients={this.state.ingredients}
        price= {this.state.totalPrice}/>
    }
    if(this.state.loading){
      orderSummary = <Spinner />
    }
    //console.log(disabledInfo)
    return(
      <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
          {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);