import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../../store/slices/products.slice'
import '../Home/Home.css'
import { FiSearch } from "react-icons/fi"
import { IconContext } from "react-icons"
import { BsFilter } from "react-icons/bs"
import { useForm } from 'react-hook-form'
import { BsFillCartFill } from "react-icons/bs";

const defaultValue = {
    search: '   Search'
}

const Home = () => {

    const products = useSelector(state => state.products)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const { register, handleSubmit, reset } = useForm()

    const [search, setSearch] = useState()

    const submit = (data) => {
        setSearch(data)
        reset(defaultValue)
    }

    console.log(products)


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
                    <button className='home__filters'>
                        <BsFilter />
                    </button>
                </IconContext.Provider>
            </div>

            <div className='home__products'>
                <div className='title'>
                    <h2>Found {products?.length} results</h2>
                </div>
                {
                    products?.map(product => (
                        <button className={`product-${product.id}`} key={product.title}>
                            <img src={product.productImgs[0]} alt="" />
                            <div className='product__description'>
                                <h3>{product.title}</h3>
                                <div className='product__section'>
                                    <h4>{`$ ${product.price}`}</h4>
                                    <button className='product__add'>
                                        <IconContext.Provider value={{ size: '1.5em' , color: 'white'}}>
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
