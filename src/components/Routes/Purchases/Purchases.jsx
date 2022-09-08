import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PurchaseCard from './PurchaseCard'

const Purchases = () => {

    const [purchases, setPurchases] = useState()

    useEffect(() => {
        const URL= `https://ecommerce-api-react.herokuapp.com/api/v1/purchases`

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        axios.get(URL, config)
            .then(res => setPurchases(res.data.data.purchases))
            .catch(error => console.log(error))
    }, [])

    
    return (
        <div className='Purchase'>
            {
                purchases?.map(purchase=>(
                    <PurchaseCard
                        purchase={purchase}
                        key={purchase.id}
                    />
                ))
            }
            
        </div>
    )
}

export default Purchases
