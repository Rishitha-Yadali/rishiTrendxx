import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const addIndex = cartList.find(eachItem => {
      if (eachItem.id === product.id) {
        return true
      }
      return false
    })
    if (addIndex === undefined) {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    } else {
      this.setState({
        cartList: cartList.map(eachItem => ({
          ...eachItem,
          quantity: eachItem.quantity + product.quantity,
        })),
      })
    }
  }

  removeCartItem = itemId => {
    const {cartList} = this.state
    const itemIndex = cartList.findIndex(carttItem => {
      if (carttItem.id === itemId) {
        return true
      }
      return false
    })
    cartList.splice(itemIndex, 1)
    this.setState({
      cartList: [...cartList],
    })
  }

  incrementCartItemQuantity = itemId => {
    const {cartList} = this.state
    this.setState({
      cartList: cartList.map(eachItem => {
        if (eachItem.id === itemId) {
          return {...eachItem, quantity: eachItem.quantity + 1}
        }
        return eachItem
      }),
    })
  }

  decrementCartItemQuantity = itemId => {
    const {cartList} = this.state
    cartList.map(eachQuantity=> {
      if(eachQuantity.quantity>1){
      return this.setState({
        cartList: cartList.map(eachCardItem => {
          if (eachCardItem.id === itemId) {
            return {...eachCardItem, quantity: eachCardItem.quantity - 1}
          }
          return eachCardItem
        }),
      })}
      else {
       return this.removeCartItem(itemId)
    }
    }) 
  }
  /*decrementCartItemQuantity = itemId => {
    const {cartList} = this.state
    const updatedCartList = cartList
      .map(eachCartItem => {
        if (eachCartItem.id === itemId) {
          if (eachCartItem.quantity > 1) {
            return {...eachCartItem, quantity: eachCartItem.quantity - 1}
          } else {
            this.removeCartItem(itemId)
            return null
          }
        }
        return eachCartItem
      })
      .filter(item => item !== null)
    this.setState({cartList: updatedCartList})
  }*/

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
