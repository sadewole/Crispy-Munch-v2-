import React, {useState, Fragment} from 'react'
import { Table } from 'antd';

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Food Item',
    dataIndex: 'item',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <span>
        <a>View details
            <i className="far fa-arrow-square-down fa-2x text-white"></i>
        </a>
        {alert(3)}
      </span>
    ),
  },
];

const data = [];
for (let i = 0; i < 7; i++) {
  data.push({
    key: i,
    id: `Edward King ${i}`,
    item: "Rice and Beans",
    status: `London, Park Lane no. ${i}`,
  });
}

const ShoppingHistory =()=> {
  const [selectedRowKeys, setSelectedRowKeys]=useState([]) // Check here to configure the default column

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
        setSelectedRowKeys([...Array(46).keys()]);
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
        setSelectedRowKeys(newSelectedRowKeys);
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
        setSelectedRowKeys(newSelectedRowKeys);
        },
    },
    ],
};
return (
    <Fragment>
    <div className="mt-5 p-4 shopping_container">
        <div className="menu-bg"></div>
        <h1>Order History</h1>
        <section className="bg-secondary text-white ">
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </section>
    </div>  
    </Fragment>    
)
}


export default ShoppingHistory

