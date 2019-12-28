import React, { useEffect, Fragment } from 'react';
import { message, Spin } from 'antd';
import { fetchMenu } from '../../actions/catalogAction';
import {postOrder} from '../../actions/orderAction'
import { useSelector, useDispatch } from 'react-redux';

const FoodLayout = () => {
  const dispatch = useDispatch();
  const {
    menu: { isLoading, data },
    auth: {isAuthenticated}
  } = useSelector(state => {
    return {
      menu: state.menu,
      auth: state.auth
    };
  });

  useEffect(() => {
    // dispatch menu
    dispatch(fetchMenu());
  }, [fetchMenu]);

  const warning = () => {
    message.warning('Kindly login to order food');
  };

  const success = () => {
    message.success('Order placed successfully.Kindly check your cart to checkout');
  };

  const handlePlaceOrder = (id)=> {
    if(isAuthenticated){
      dispatch(postOrder(id))
      success()
    }else{
      warning()
    }
    
  }
  const datas = isLoading ? (
    <Fragment>
      <div className='text-center m-auto container'>
        <Spin size='large' tip='Loading...' />
      </div>
    </Fragment>
  ) : data !== undefined ? (
    data.map(info => {
      return (
        <div className='card-menu' key={info.id}>
          <div className='card-img-top'>
            <img src={info.img} alt={info.name} className='img-resize' />
          </div>
          <div className='card-img-body'>
            <p>{info.name}</p>
            <p>₦{info.price}</p>
          </div>
          <span>
            <i
              className='fas fa-cart-plus fa-1x'
              onClick={handlePlaceOrder}
            ></i>
          </span>
        </div>
      );
    })
  ) : (
    <Fragment>
      <h1 className='text-center muted'>No Data</h1>
    </Fragment>
  );

  return <div className='menu-section-b'>{datas}</div>;
};

export default FoodLayout;
