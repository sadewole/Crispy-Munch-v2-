import React, { useState } from 'react';
import {adminHistory} from  '../../content_data'


const AdminHistory = () => {
    const [history, setHistory] = useState([])

    const output = .map((info, index)=> {
        return (
            <tr class="cart-item" key={index} >
            <td>
                <span class="orderImg">
                    <img src={info.img} alt={info.name} />
                </span>
                {info.name}
            </td>
                <td><input type="number" class="quantity" data-id={info.id} name="quantity" value="5" /></td>
            <td><i class="fas fa-trash" data-id={index} onClick={()=> openNotification('success')} ></i></td>
            <td class="price">₦{info.price}</td>
            <td class="subTotal">₦900</td>
        </tr>
        )
    })

  return (
    <div>
      <table className='table table-responsive table-hover'>
        <thead className='thead thead-dark'>
          <tr>
            <th>Date log</th>
            <th>Order Id</th>
            <th>Food</th>
            <th>Quantity</th>
            <th>User Id</th>
            <th>Address</th>
            <th>Phone number</th>
            <th>Price</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className='tbody'>${output}</tbody>
      </table>
    </div>
  );
};

export default AdminHistory;
