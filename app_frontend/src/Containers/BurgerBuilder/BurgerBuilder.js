import React, {Component} from 'react'
import  Aux from '../../hoc/Aux/Aux'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component{
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }
  
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  }
  
  componentDidMount() {
    console.log(this.props)
    // axios.get('/ingredients.json')
    //   .then(response => {
    //     this.setState({ingredients: response.data})
    //   }).catch(error => this.setState({error: error}))
  }
  
  updatePurchaseState(){
      const ingredients = this.props.ings
      const sum = Object.keys(ingredients)
        .map(igKey => {
          return ingredients[igKey];
        }).reduce((sum, el) => {
          return sum+el;
        },0)
      return sum > 0
  }
  
  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   }
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  //   this.updatePurchaseState(updatedIngredients);
  // }
  // 
  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <=0){
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   }
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  //   this.updatePurchaseState(updatedIngredients);
  // }
  
  purchaseHandler = () => {
    this.setState({purchasing: true});
  }
  
  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }
  
  purchaseContineHandler = () => {
    //alert("You Purchased");
    // this.setState({loading: true})
    // const order = {
    //   ingeredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer:{
    //     name: "Srihari",
    //     address:{
    //       street: 'Test1',
    //       zipCode: 'ghddfdf',
    //       country: 'India'  
    //     },
    //     email: 'User@testmail.com'
    //   },
    //   deliveryMethod: 'fastest'
    // }
    // axios.post('/orders.json', order)
    //   .then(response => {
    //     console.log(response);
    //     this.setState({loading: false, purchasing: false})
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     this.setState({loading: false, purchasing: false})
    //   });
    
    //After Redux addidtion
    
    // const queryParams = [];
    // console.log(this.state.ingredients)
    // for(let i in this.state.ingredients){
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push(encodeURIComponent("price") + '=' + encodeURIComponent(this.state.totalPrice))
    // this.props.history.push({
    //   pathname:"/checkout",
    //   search:'?'+ queryParams.join('&')
    // })
    
    //Due to redux 
    this.props.history.push("/checkout")
   }
  
  render(){
    const disabledInfo = {
      ...this.props.ings
    }
    
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    
    let orderSummary = null
    let burger = this.state.error ? <p> Ingredient's cannot be loaded </p> : <Spinner />
    if(this.props.ings){
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient} 
            ingredientRemoved = {this.props.onRemoveIngredient}
            disabled= {disabledInfo}
            purchasable= {this.updatePurchaseState}
            ordered={this.purchaseHandler}
            price= {this.props.price} />
        </Aux>
      )
      orderSummary = <OrderSummary 
        purachaseCancel = {this.purchaseCancelHandler}
        purchaseContinue = {this.purchaseContineHandler}
        ingredients={this.props.ings}
        price= {this.props.price}/>
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
    //storedResutls: state.results
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onRemoveIngredient: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    // onDecrementCounter: () => dispatch({type:'DECREMENT'}),
    // onSubtractCounter: () => dispatch({type:'SUBTRACT', value: 5}),
    // onStoreResult: () => dispatch({type:'STORE_RESULT'}),
    // onDeleteResults: (id) => dispatch({type:'DELETE_RESULT', resultEltId: id})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));