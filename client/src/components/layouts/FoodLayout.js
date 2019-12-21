import React from 'react'
import {menuData} from  '../../content_data'

const FoodLayout = () => {
    const datas = menuData.map((data, index)=>{
return (
    <div className="card-menu">
      <div className="card-img-top">
          <img src={data.img} alt={data.name} className="img-resize" />
      </div>
      <div className="card-img-body">
          <p>{data.name}</p>
          <p>₦{data.price}</p>
      </div>
      <span><i className="fas fa-cart-plus fa-1x" data-id={data.id}></i></span>
  </div>
)
    })
    return (
        <div className="menu-section-b">
            {datas}
        </div>
    )
}

export default FoodLayout
