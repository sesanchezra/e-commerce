import React from 'react'
import './ModalLoading.css'

const ModalLoading = () => {
    return (
        <div className='ModalLoading'>
            <div className='modal__content'>
            <div className="lds-dual-ring"></div>
            <h5>Buying ... 🛒</h5>
            </div>
            
        </div>
    )
}

export default ModalLoading
