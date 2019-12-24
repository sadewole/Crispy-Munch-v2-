import React, { Fragment, useState, useEffect } from 'react';
import { catalogData } from '../../content_data';

const FoodTable = ({ newData }) => {
  const [openAction, setOpenAction] = useState({});
  let [menu, setMenu] = useState(catalogData);

  useEffect(() => {
    menu.map(i => setOpenAction({ ...openAction, [i.id]: false }));

    setMenu(newData);
  }, [newData]);

  const handleAction = id => {
    setOpenAction({ [id]: !openAction[id] });
  };

  const handleEdit = () => {
    console.log('edit handler');
  };

  const handleDelete = () => {
    console.log('delete handler');
  };

  if(!undefined(menu)){

  const output=  menu.map(i => {
      return (
        <tr key={i.id}>
          <td>
            <img
              src=''
              alt='default image'
              style={{ width: '50px', height: '50px' }}
            />
          </td>
          <td>{i.name}</td>
          <td>{i.price}</td>
          <td>{i.date}</td>
          <td className='action' onClick={() => handleAction(i.id)}>
            <a href='#' className='dropdown-toggle'>
              Action
            </a>
            <div className={`dropdown-action ${openAction[i.id] ? 'show' : ''}`}>
              <a href='#' onClick={handleEdit} className='dropdown-item'>
                Edit
              </a>
              <a href='#' onClick={handleDelete} className='dropdown-item'>
                Delete
              </a>
            </div>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      {/* Table */}
      <table className='table table-responsive table-hover foodTable'>
        <thead className='thead thead-dark'>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='tbody'>{output}</tbody>
      </table>
    </div>
  );
};

export default FoodTable;

// import { Table, Input, Button, Icon } from 'antd';

// const FoodTable = () => {
//   let searchInput = '';
//   const [searchText, setSearchText] = useState('');
//   const [searchedColumn, setSearchedColumn] = useState('');

//   const getColumnSearchProps = dataIndex => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters
//     }) => (
//       <div style={{ padding: 8 }}>
//         <Input
//           ref={node => {
//             searchInput = node;
//           }}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={e =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{ width: 188, marginBottom: 8, display: 'block' }}
//         />
//         <Button
//           type='primary'
//           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           icon='search'
//           size='small'
//           style={{ width: 90, marginRight: 8 }}
//         >
//           Search
//         </Button>
//         <Button
//           onClick={() => handleReset(clearFilters)}
//           size='small'
//           style={{ width: 90 }}
//         >
//           Reset
//         </Button>
//       </div>
//     ),
//     filterIcon: filtered => (
//       <Icon type='search' style={{ color: filtered ? '#1890ff' : undefined }} />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex]
//         .toString()
//         .toLowerCase()
//         .includes(value.toLowerCase()),
//     onFilterDropdownVisibleChange: visible => {
//       if (visible) {
//         setTimeout(() => searchInput.select());
//       }
//     },
//     render: text =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text.toString()}
//         />
//       ) : (
//         text
//       )
//   });

//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };

//   const handleReset = clearFilters => {
//     clearFilters();
//     setSearchText('');
//   };

//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       width: '30%',
//       ...getColumnSearchProps('name')
//     },
//     {
//       title: 'Age',
//       dataIndex: 'age',
//       key: 'age',
//       width: '20%',
//       ...getColumnSearchProps('age')
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//       key: 'address',
//       ...getColumnSearchProps('address')
//     }
//   ];
//   return <Table columns={columns} dataSource={data} />;
// };

// export default FoodTable;
