import React,{Component} from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary  extends Component{
  //This can be a Functional Component 
  // componentWillUpdate() {
  //   console.log('[Order Summanry ] will Update')
  // }
    
  render(){
    const ingredientsSummary =Object.keys(this.props.ingredients)
      .map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}: </span>{this.props.ingredients[igKey]}</li>
      })
      
    return (
      <Aux>
        <h3>Your Order </h3>
        <p> A delicious burger with the following ingredients: </p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p> <strong> Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout? </p>
        <Button btnType='Danger' clicked={this.props.purachaseCancel}> CANCEL </Button>
        <Button btnType='Success'clicked={this.props.purchaseContinue}> CONTINUE </Button>
      </Aux>
    );
  }  
}

export default OrderSummary;