import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const orderTotal = cartList.map(
        eachItem => eachItem.price * eachItem.quantity,
      )
      const orderValue = orderTotal.reduce((prev, curr) => prev + curr)
      return (
        <div className="summary-card">
          <h1 className="order-info">
            Order Total: <span className="order-total">Rs {orderValue}/-</span>
          </h1>
          <p className="items-cart">{cartList.length} items in cart</p>
          <button className="checkout-button" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
