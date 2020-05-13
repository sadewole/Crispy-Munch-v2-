import React from 'react';
import { Affix } from 'antd';
import { useSelector } from 'react-redux';
import { currencyFormatter } from '../../utils/formatter';
import PaypalButton from '../../utils/PaypalButton';

const ClientCart = ({ total, output, showModal }) => {
  const {
    order: { userPendingOrders },
  } = useSelector((state) => {
    return {
      order: state.order,
    };
  });

  return (
    <div className='row'>
      <table className='table table-responsive table-hover col-md-8'>
        <thead className='thead-dark'>
          <tr>
            <th>Food Item</th>
            <th>Quantity</th>
            <th>Remove</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>{output}</tbody>
      </table>
      <div className='checkoutBox col-md-4'>
        <Affix offsetTop={50}>
          <h1>Total: {currencyFormatter(total)}</h1>
          <button
            className='btn btn-danger'
            disabled={userPendingOrders.length >= 1 ? '' : 'disabled'}
            onClick={showModal}
          >
            Proceed to checkout
          </button>
        </Affix>
      </div>
    </div>
  );
};

export default ClientCart;
