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
            .then(res => setCartProducts(res.data.data.cart.products))
            .catch(error => console.log(error))
    }, [])

    // console.log(cartProducts)

    //calculo del total del carrito

    let totalCart =0;
    let partialTotal =0;

    for(let i=0; i< cartProducts?.length; i++){
        partialTotal = Number(cartProducts[i]?.price) * Number(cartProducts[i]?.productsInCart.quantity)
        totalCart += partialTotal
        
    }

    // Funcion purchase carrito

    const purchaseCart = () => {
        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const shippingData ={
            street: "Green St. 1456",
            colony: "Southwest",
            zipCode: 12345,
            city: "USA",
            references: "Some references"
        }
        
        const URL ='https://ecommerce-api-react.herokuapp.com/api/v1/purchases'

        axios.post(URL,shippingData,config)
            .then(res=>console.log(res.data))
            .catch(error=>console.log(error))
    }

    return (
        <div className='cart'>
            <h2>Cart</h2>
            {
                cartProducts?.map(product => (
                    <CartProduct
                        product={product}
                        key={product.title}
                    />
                ))
            }
            

            <footer>
                <span>Total</span>
                <span>{totalCart}</span>
                <button onClick={purchaseCart}>
                    Checkout
                </button>
            </footer>
            
        </div>
    )
}

export default Cart
