import React, {
  useState,
  Fragment,
  useEffect
} from 'react'
import {
  fetchUserOrderHistory
} from '../../actions/orderAction'
import {
  Table
} from 'antd';
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  Table
} from 'antd';

const columns = [{
    title: 'FoodId',
    dataIndex: 'id',
  },
  {
    title: 'Food Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Unit price',
    dataIndex: 'price',
  },
  {
    title: 'Payment',
    dataIndex: 'payment',
  },
  {
    title: 'Shipping Address',
    dataIndex: 'address',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
];

const data = [];
for (let i = 0; i < data.length; i++) {
  data.push({
    key: i,
    id: `Edward King ${i}`,
    name: 32,
    email: `London, Park Lane no. ${i}`,
    quantity: `London, Park Lane no. ${i}`,
    amount: `London, Park Lane no. ${i}`,
    price: `London, Park Lane no. ${i}`,
    payment: `London, Park Lane no. ${i}`,
    date: `London, Park Lane no. ${i}`,
  });
}

{
  "id": "218e5fae-083a-4308-a588-dc6151901da7",
  "quantity": 3,
  "amount": 2700,
  "email": null,
  "address": null,
  "orderedDate": null,
  "phone": null,
  "status": "completed",
  "payment": "pending",
  "createdAt": "2019-12-29T12:42:09.693Z",
  "updatedAt": "2019-12-30T13:01:27.133Z",
  "user_id": "81f911ca-13ad-4b10-8eb7-0492dab5ffeb",
  "menu_id": "15fa1536-de8d-4ed6-989b-5a298083ba19",
  "food": {
    "id": "15fa1536-de8d-4ed6-989b-5a298083ba19",
    "name": "Beans and Ogbona",
    "price": 900,
    "image": "https://res.cloudinary.com/dovgnj0v4/image/upload/v1577780862/yqy1b4rhdxmnxtgnevvf.jpg",
    "createdAt": "2019-12-22T23:17:37.830Z",
    "updatedAt": "2019-12-31T08:27:55.843Z"
  },
  "user": {
    "id": "81f911ca-13ad-4b10-8eb7-0492dab5ffeb",
    "name": "Admin",
    "email": "admin@crispymunch.com",
    "role": "ADMIN",
    "createdAt": "2019-12-26T23:44:10.486Z",
    "updatedAt": "2019-12-26T23:44:10.486Z"
  }
}

const ShoppingHistory = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) // Check here to configure the default column
  const dispatch = useDispatch()
  const {
    order
  } = useSelector(state => {
    return {
      order: state.order
    }
  })
  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({
      selectedRowKeys
    });
  };


  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideDefaultSelections: true,
    selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          setSelectedRowKeys({
            selectedRowKeys: [...Array(data.length).keys()], // 0...45
          });
        },
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
          this.setState({
            selectedRowKeys: newSelectedRowKeys
          });
        },
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
          this.setState({
            selectedRowKeys: newSelectedRowKeys
          });
        },
      },
    ],
  };
  return <Table rowSelection = {
    rowSelection
  }
  columns = {
    columns
  }
  dataSource = {
    data
  }
  />;
}



export default ShoppingHistory