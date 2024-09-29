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
      } else {
        return false
      }
    })
    if (addIndex === undefined) {
      this.setState(prevState => {
        return {
          cartList: [...prevState.cartList, product],
        }
      })
    } else {
      this.setState({
        cartList: cartList.map(eachItem => {
          return {...eachItem, quantity: eachItem.quantity + product.quantity}
        }),
      })
    }
  }

  removeCartItem = itemId => {
    const {cartList} = this.state
    const itemIndex = cartList.findIndex(carttItem => {
      if (carttItem.id === itemId) {
        return true
      } else {
        return false
      }
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
        return {...eachItem, quantity: eachItem.quantity + 1}
      }),
    })
  }
  decrementCartItemQuantity = itemId => {
    const {cartList} = this.state
    if (cartList[0].quantity > 1) {
      this.setState({
        cartList: cartList.map(eachItem => {
          return {...eachItem, quantity: eachItem.quantity - 1}
        }),
      })
    } else {
      this.removeCartItem(itemId)
    }
  }
  removeAllCartItems = () => {
    this.setState({
      cartList:[]
    })
  }
  render() {
    const {cartList} = this.state

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
