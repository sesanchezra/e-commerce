import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../Product/ProductDetail.css'
import { GrNext, GrPrevious } from "react-icons/gr";

const ProductDetail = () => {

    const { id } = useParams()

    const [product, setProduct] = useState()
    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
            .then(res => setProduct(res.data.data.product))
            .catch(error => console.log(error))
    }, [])

    console.log(product)

    //Slider

    const [currentImg, setCurrentImg] = useState(0)

    const prev = () => {
        if (currentImg > 0) {
            setCurrentImg(currentImg - 1)
        }
    }
    const next = () => {
        if (currentImg < 2) {
            setCurrentImg(currentImg + 1)
        }

    }

    return (
        <div className='Product'>
            <div className='product__title'>
                <h3 className='home'>Home</h3>
                <div className='separator'></div>
                <h3>{product?.title}</h3>
            </div>
            <div className='product__info'>
                <div className='product__img__slider'>
                    <button onClick={prev}>
                        <GrPrevious />
                    </button>
                    <div className='product__img__content'>
                        {
                            product?.productImgs.map((image, index) => (
                                <div className={currentImg == index ? 'slide active': 'slide'}>
                                    {
                                        currentImg == index && (
                                            <img src={image} alt="product__img" className='product__img'/>
                                        )
                                    }
                                </div>

                            ))
                        }
                    </div>
                    <button onClick={next}>
                        <GrNext />
                    </button>
                </div>

                <div className='product__description'>
                    <h3>{product?.title}</h3>
                </div>

                
            </div>

        </div>
    )
}

export default ProductDetail
