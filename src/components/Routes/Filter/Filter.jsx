import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../Filter/Filter.css'

const Filter = ({ setCategory }) => {

    const [categories, setCategories] = useState()

    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`)
            .then(res => setCategories(res.data.data.categories))
            .catch(error => console.log(error))
    }, [])

    const filterByCategory = (category) => {
        setCategory(category)
    }

    return (

        <div className='Filter'>
            <h3>Categories</h3>
            <div className='filter__categories__section'>
                <button className='filter__category' onClick={() => setCategory('all')}>
                    All
                </button>
                {
                    categories?.map(category => (
                        <button className='filter__category' key={category.name} onClick={() => filterByCategory(category.name)}>
                            {category.name}
                        </button>
                    ))
                }

            </div>
        </div>
    )
}

export default Filter
