import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../Product/ProductDetail.css'

const ProductDetail = () => {

    const {id}=useParams()

    const [product, setProduct] = useState()
    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
            .then(res=> setProduct(res.data.data.product))
            .catch(error=> console.log(error))
    }, [])

    console.log(product)

    return (
        <div className='Product'>
            <img src={product?.productImgs[0]} alt="product__img" />
            <h3>{product?.title}</h3>
        </div>
    )
}

export default ProductDetail
