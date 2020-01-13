import React, { useState, Fragment, useEffect } from 'react';
import { fetchUserOrderHistory } from '../../actions/orderAction';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD
import { shoppingHistoryColumns } from '../utils/content_data';
import Moment from 'react-moment';
=======

const columns = [
  {
    title: 'Food Id',
    dataIndex: 'id'
  },
  {
    title: 'Food Name',
    dataIndex: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity'
  },
  {
    title: 'Amount',
    dataIndex: 'amount'
  },
  {
    title: 'Unit price',
    dataIndex: 'price'
  },
  {
    title: 'Payment',
    dataIndex: 'payment'
  },
  {
    title: 'Shipping Address',
    dataIndex: 'address'
  },
  {
    title: 'Date',
    dataIndex: 'date'
  }
];
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a

const ShoppingHistory = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Check here to configure the default column
  const dispatch = useDispatch();
  const {
<<<<<<< HEAD
    order: { userOrders }
=======
    order: { userOrders, isLoading }
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
  } = useSelector(state => {
    return {
      order: state.order
    };
  });

  useEffect(() => {
    dispatch(fetchUserOrderHistory());
  }, []);

  const data = [];
<<<<<<< HEAD
  userOrders.map((i, index) =>
=======
  userOrders.map((i, index) => {
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
    data.push({
      key: index,
      id: i.id,
      name: i.food.name,
<<<<<<< HEAD
=======
      email: i.email,
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
      quantity: i.quantity,
      amount: i.amount,
      price: i.food.price,
      payment: i.payment,
      address: i.address,
<<<<<<< HEAD
      date: <Moment format='DD/MM/YYYY'>{i.updatedAt}</Moment>
    })
  );
=======
      date: i.updatedAt
    });
  });
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a

  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideDefaultSelections: true,
    selections: [
      {
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          setSelectedRowKeys([...Array(userOrders.length).keys()]);
        }
      },
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        }
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        }
      }
    ]
  };
  return (
    <Fragment>
      <div className='mt-5 pt-5 container'>
        <div className='menu-bg'></div>
        <Table
          rowSelection={rowSelection}
<<<<<<< HEAD
          columns={shoppingHistoryColumns}
          dataSource={data}
          className='tbody-tertiary table-responsive'
=======
          columns={columns}
          dataSource={data}
          className='tbody-tertiary'
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
        />
      </div>
    </Fragment>
  );
};

export default ShoppingHistory;
