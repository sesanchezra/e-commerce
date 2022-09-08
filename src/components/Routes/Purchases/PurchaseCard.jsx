import React from 'react'

const months = [
    {'01': 'January'},
    {'02': 'February'},
    {'03': 'March'},
    {'04': 'April'},
    {'05': 'April'},
    {'06': 'June'},
    {'07': 'July'},
    {'08': 'August'},
    {'09': 'September'},
    {'10': 'October'},
    {'11': 'November'},
    {'12': 'December'}
]


const PurchaseCard = ({purchase}) => {


    // Determinar fecha

    let date=''
    let splitUpdateAt = purchase.updatedAt.split('T')[0].split('-')
    // console.log(splitUpdateAt)
    for(let i=0; i< months.length; i++){
        if(Object.keys(months[i])[0]===splitUpdateAt[1]){
            date = `${months[i][Object.keys(months[i])[0]]} ${splitUpdateAt[2]} , ${splitUpdateAt[0]}`
        }
    }

    console.log(date)

    // console.log(purchase)
    return (
        <div className='PurchaseCard'>
            <div className='purchase__date'>
                <h3>{date}</h3>
            </div>
            <img src="" alt="img" />
            <div className='purchase__description'>
                <h3>Samsung</h3>
                <p>$ 850</p>
                <span>1</span>
            </div>
        </div>
    )
}

export default PurchaseCard
