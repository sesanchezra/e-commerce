import React from 'react'

const ModalLogin = ({user}) => {
    return (
        <div className='ModalLogin'>
            <h3>{`${user?.firstName} ${user?.lastName}`}</h3>
        </div>
    )
}

export default ModalLogin
