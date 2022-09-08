import React from 'react'
import '../Cart/CartProduct.css'

const CartProduct = ({product}) => {
    return (
        <div className='product__cart'>
            <h3>{product?.brand}</h3>
            <h4>{product?.title}</h4>
            <button>
                delete
            </button>
            <p>{product?.price}</p>
            <span>{product?.productsInCart.quantity}</span>
        </div>
    )
}

export default CartProduct
