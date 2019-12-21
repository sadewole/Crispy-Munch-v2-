import React , {Fragment} from 'react'
import antd from 'antd'
import FoodLayout from "../layouts/FoodLayout"
import Footer from '../layouts/Footer'


const MenuPage = () => {
    return ( 
        <Fragment>
        <div className="menu-bg"></div>
    <section className="menu-section">
        <div className="custom-menu1">
                <h1 className="cris">Crispy Munch</h1>
              <img src="img/custom-img/food1.jpg" alt="" className="img-resize" />
              <img src="img/custom-img/food.jpg" alt="" className="img-resize" />
          </div>  
        
        <div className="custom-menu2">  
            <h4>Food Catalog</h4>
            <div className="food-menu">
              <h1 id="noMenu"></h1>
                 <FoodLayout />
            </div>
        </div>
    </section>
    <Footer />
</Fragment>
    )
}

export default MenuPage