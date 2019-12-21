import React from 'react'
import CartTable from '../layouts/CartTable'


const Cart = () => {

    return (
        <div className="mt-5 container">
            <div className="menu-bg"></div>
            <section className="all-cart">
                <CartTable />
            </section>
        </div>
    )
}

export default Cart
