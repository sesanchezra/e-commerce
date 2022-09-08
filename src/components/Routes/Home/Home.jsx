import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../../store/slices/products.slice'
import '../Home/Home.css'
import { FiSearch } from "react-icons/fi"
import { IconContext } from "react-icons"
import { BsFilter } from "react-icons/bs"
import { useForm } from 'react-hook-form'
import { BsFillCartFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import Filter from '../Filter/Filter'
import { BiArrowBack } from "react-icons/bi";
import axios from 'axios'

const defaultValue = {
    search: ''
}

const Home = () => {

    //Llamado inicial de products del store

    const products = useSelector(state => state.products)

    const dispatch = useDispatch()

    const [categoryAll, setCategoryAll] = useState(false)

    useEffect(() => {
        dispatch(getProducts())
    }, [categoryAll])

    //Configure Filter

    const [category, setCategory] = useState()

    let productsCategory = []

    if (category) {
        if (category != 'all') {
            productsCategory = products?.filter(product => product.category.name === category)
        }
        else {
            setCategoryAll(!categoryAll)
            setCategory()
        }
    }

    //Configure Search

    const { register, handleSubmit, reset } = useForm()

    const [search, setSearch] = useState()

    const submit = (data) => {
        setSearch(data.search)
        reset(defaultValue)
    }

    if (search) {
        let searchSplit = search.split(' ')
        if(productsCategory.length === 0){
            productsCategory = products?.filter(product => product.title.split(' ')[0].toLowerCase() == searchSplit[0].toLowerCase())
        }
        else if(productsCategory.length === 0){
            productsCategory = products?.filter(product => product.title.split(' ')[1].toLowerCase() == searchSplit[0].toLowerCase())
        }
        else if(productsCategory.length === 0){
            productsCategory = products?.filter(product => product.title.split(' ')[2].toLowerCase() == searchSplit[0].toLowerCase())
        }
    }

    useEffect(() => {
        if (search) {
            setCategory('search')
        }
    }, [productsCategory])

    //Configure click product to /product/:id

    const navigate = useNavigate()

    const goToProduct = (id) => {
        navigate(`/product/${id}`)
    }

    //Filter configure

    const [filter, setFilter] = useState(false)

    const showFilter = () => {
        setFilter(!filter)
    }

    //Back to All

    const back = () => {
        setCategory()
        setSearch()
        setFilter(false)
    }

    // Agregar producto al carrito 

    const addToCart = (productId) =>{
        const url =`https://ecommerce-api-react.herokuapp.com/api/v1/cart`

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const product = {
            id: productId,
            quantity: 1,
        }

        axios.post(url,product,config)
            .then(res=> {
                console.log(res.data)
                console.log('si se envió')
            })
            .catch(error=> console.log(error))

    }

    return (
        <div className='Home'>
            <div className='home__search'>
                <form action="search" className='home__search__form' onSubmit={handleSubmit(submit)}>
                    <IconContext.Provider value={{ size: '1.8em', className: 'home__search__icon' }}>
                        <button className='home__search__icon'>
                            <FiSearch />
                        </button>
                    </IconContext.Provider>
                    <input type="text" placeholder='   Search' {...register('search')} />
                </form>
                <IconContext.Provider value={{ size: '1.8em' }}>
                    <button className='home__filters' onClick={showFilter}>
                        <BsFilter />
                    </button>
                </IconContext.Provider>
            </div>

            {
                filter &&
                <Filter
                    setCategory={setCategory}
                />
            }

            {
                category &&
                <IconContext.Provider value={{ size: '1.5em' ,color: 'white' }}>
                    <button onClick={back} className='home__products__back'>
                        <BiArrowBack />
                    </button>
                </IconContext.Provider>
            }
            <div className='home__products'>
                <div className='title'>
                    {
                        category ?
                            <h2>Found {productsCategory?.length} results</h2>
                            :
                            <h2>Found {products?.length} results</h2>
                    }

                </div>
                {
                    category ?
                        productsCategory?.map(product => (
                            <button className={`product__button`} key={product.title} >
                                <img src={product.productImgs[0]} alt="" onClick={() => goToProduct(product.id)}/>
                                <div className='product__description'>
                                    <h3>{product.title}</h3>
                                    <div className='product__section'>
                                        <h4>{`$ ${product.price}`}</h4>
                                        <button className='product__add' onClick={()=>addToCart(product.id)}>
                                            <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                                                <BsFillCartFill />
                                            </IconContext.Provider>
                                        </button>
                                    </div>
                                </div>
                            </button>

                        ))
                        :
                        products?.map(product => (
                            <button className={`product-${product.id} product__button`} key={product.title} >
                                <img src={product.productImgs[0]} alt="" onClick={() => goToProduct(product.id)}/>
                                <div className='product__description'>
                                    <h3>{product.title}</h3>
                                    <div className='product__section'>
                                        <h4>{`$ ${product.price}`}</h4>
                                        <button className='product__add' onClick={()=>addToCart(product.id)}>
                                            <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                                                <BsFillCartFill />
                                            </IconContext.Provider>
                                        </button>
                                    </div>
                                </div>


                            </button>
                        ))
                }


            </div>


        </div>
    )
}

export default Home
