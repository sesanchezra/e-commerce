import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../Product/ProductDetail.css'
import { GrNext, GrPrevious } from "react-icons/gr";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IconContext } from "react-icons"
import { BsFillCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../store/slices/products.slice';

const ProductDetail = () => {

    //Solicitud producto por id

    const { id } = useParams()

    const [product, setProduct] = useState()
    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
            .then(res => setProduct(res.data.data.product))
            .catch(error => console.log(error))
    }, [])

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

    //Quantity

    const [quantity, setQuantity] = useState(1)

    const minus = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }
    const plus = () => {

        setQuantity(quantity + 1)

    }

    //Similar products

    const dispatch = useDispatch()

    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    let productsCategory = products?.filter(productFilter => productFilter.category.name === product?.category)

    const navigate=useNavigate()
    

    const goToSimilar = (id) =>{
        navigate(`/product/${id}`)
        window.location.reload()
    }

    
    
    // Traer productos del carrito 
    
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
    
    //Función agregar al carrito

    const addToCart = (productId,productQuantity,cartProducts) =>{
        const url =`https://ecommerce-api-react.herokuapp.com/api/v1/cart`

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const product = {
            id: productId,
            quantity: productQuantity,
        }

        axios.post(url , product , config)
            .then(res=> {
                console.log(res.data)
                console.log('si se envió')
            })
            .catch(error=> console.log(error))

    }
    console.log(cartProducts)

    return (
        <div className='Product'>
            <div className='product__title'>
                <h3 className='home'>Home</h3>
                <div className='separator'></div>
                <h4>{product?.title}</h4>
            </div>
            <div className='product__info'>
                <div className='product__img__slider'>
                    <button onClick={prev}>
                        <GrPrevious />
                    </button>
                    <div className='product__img__content'>
                        {
                            product?.productImgs.map((image, index) => (
                                <div className={currentImg == index ? 'slide active' : 'slide'} key={image}>
                                    {
                                        currentImg == index && (
                                            <img src={image} alt="product__img" className='product__img' />
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

                <div className='product__description__detail'>
                    <h3>{product?.title}</h3>
                    <div className='product__price__quantity'>
                        <div className='product__price'>
                            <h5>Price</h5>
                            <h3>{`$ ${product?.price}`}</h3>
                        </div>
                        <div className='product__quantity'>
                            <div className='quantifier'>
                                <button className='minus' onClick={minus}>
                                    <AiOutlineMinus />
                                </button>
                                <h5>{quantity}</h5>
                                <button className='plus' onClick={plus}>
                                    <AiOutlinePlus />
                                </button>
                            </div>

                        </div>
                        <div className='product__add'>
                            <button className='product__add__button' onClick={()=> addToCart(product?.id,quantity)}>
                                <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                                    <BsFillCartFill />
                                </IconContext.Provider>
                            </button>

                        </div>
                    </div>

                    <hr />

                    <div className='product__text__long'>
                        <p>
                            {product?.description}
                        </p>
                    </div>

                    <hr />

                    <div className='product__similar'>
                        {
                            productsCategory?.map(productFilter => (
                                <div className='product__similar__box' key={productFilter.name} key={productFilter.id} onClick={() => goToSimilar(productFilter.id)}>
                                    <img src={productFilter.productImgs[0]} alt="product" className='product__similar__img' />
                                    <div className='product__simlar__description'>
                                        <h5>{productFilter.title}</h5>
                                        <div className='product__similar__description__section'>
                                            <h6>{`$ ${productFilter.price}`}</h6>
                                            <button className='product__similar__description__button'>
                                                <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                                                    <BsFillCartFill />
                                                </IconContext.Provider>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>


            </div>

        </div>
    )
}

export default ProductDetail
