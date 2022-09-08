import React from 'react'
import './PurchaseItem.css'

const PurchaseItem = ({product}) => {

    console.log(product)

    return (
        <div className='Purchase__item'>
            <span>{product.title}</span>
            <p><span className='items'>{`(${product.productsInCart.quantity} items)`}</span>     $ {product.price} <span className='usd'>USD</span></p>
        </div>
    )
}

export default PurchaseItem
