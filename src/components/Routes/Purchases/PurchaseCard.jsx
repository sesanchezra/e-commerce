import React from 'react'
import PurchaseItem from './PurchaseItem'
import './PurchaseCard.css'

const months = [
    { '01': 'January' },
    { '02': 'February' },
    { '03': 'March' },
    { '04': 'April' },
    { '05': 'April' },
    { '06': 'June' },
    { '07': 'July' },
    { '08': 'August' },
    { '09': 'September' },
    { '10': 'October' },
    { '11': 'November' },
    { '12': 'December' }
]


const PurchaseCard = ({ purchase }) => {


    // Determinar fecha

    let date = ''
    let splitUpdateAt = purchase.updatedAt.split('T')[0].split('-')
    // console.log(splitUpdateAt)
    for (let i = 0; i < months.length; i++) {
        if (Object.keys(months[i])[0] === splitUpdateAt[1]) {
            date = `${months[i][Object.keys(months[i])[0]]} ${splitUpdateAt[2]} , ${splitUpdateAt[0]}`
        }
    }

    // console.log(date)

    // console.log(purchase.cart.products)
    return (
        <div className='PurchaseCard'>
            <div className='purchase__date'>
                <h3>{date}</h3>
            </div>
            <hr />
            <div className='purchase__description'>
                {
                    purchase.cart.products?.map(product => (
                        <PurchaseItem
                            product={product}
                            key={product.title}
                        />
                        
                    ))
                }
                
            </div>
        </div>
    )
}

export default PurchaseCard
