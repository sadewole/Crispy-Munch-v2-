import React, { useState, Fragment } from 'react';
import { Input, Button } from 'antd';
import { catalogData } from '../../content_data';
import FoodTable from './FoodTable'

const SearchInput = () => {
  let updatedSearch;
  const [searchText, setSearchText] = useState('');

  const handleSearch = searchText => {
    const searchData = catalogData.filter(
      dp => dp.name.toString().toLowerCase() === searchText.toLowerCase()
    );

    if (searchData.length > 1) {
      updatedSearch = searchData;
    } else {
      updatedSearch = [];
    }
  };

  const handleChange = e => {
    setSearchText(e.target.value);
  };

  const handleReset = () => {
    setSearchText('');
    updatedSearch = catalogData;
  };

  return (
    <Fragment>
    <div style={{ padding: 8, width: 205 }} className='ml-auto bg-dark'>
      <Input
        placeholder={'Search name'}
        value={searchText}
        onChange={handleChange}
        onPressEnter={handleSearch}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Button
        type='primary'
        onClick={handleSearch}
        icon='search'
        size='small'
        style={{ width: 90, marginRight: 8 }}
      >
        Search
      </Button>
      <Button onClick={handleReset} size='small' style={{ width: 90 }}>
        Reset
      </Button>
    </div>
    <FoodTable newData={updatedSearch} />
    </Fragment>
  );
};

export default SearchInput;
