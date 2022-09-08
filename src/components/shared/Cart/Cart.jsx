import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartProduct from './CartProduct'

const Cart = () => {

    const [cartProducts, setCartProducts] = useState()

    useEffect(() => {

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, config)
            .then(res => setCartProducts(res.data))
            .catch(error => console.log(error))
    }, [])

    console.log(cartProducts)
    return (
        <div className='cart'>
            <h2>Cart</h2>
            <CartProduct />

            <footer>
                <span>Total</span>
                <span>$1350</span>
                <button>
                    Checkout
                </button>
            </footer>
            
        </div>
    )
}

export default Cart
