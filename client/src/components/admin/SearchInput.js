import React, { useState, Fragment, useEffect } from 'react';
import { Input, Button } from 'antd';

const SearchInput = ({ cloneData, setCloneData, originalData }) => {
  let updatedSearch = [];
  const [searchText, setSearchText] = useState('');

  const handleChange = e => {
    setSearchText(e.target.value);
  };

  const handleReset = () => {
    setSearchText('');
    setCloneData(originalData);
  };

  useEffect(() => {
    setCloneData(originalData);
<<<<<<< HEAD
  });
  // handle search from search input
  const handleSearch = () =>
=======
  }, [originalData]);
  // handle search from search input
  const handleSearch = () => {
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
    cloneData.map(dp => {
      if (
        dp.name
          .toString()
          .toLowerCase()
          .indexOf(searchText.toLowerCase()) !== -1
      ) {
        updatedSearch.push(dp);
      }
      setCloneData(updatedSearch);
    });
<<<<<<< HEAD
=======
  };
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a

  return (
    <Fragment>
      <div
        style={{ padding: 8, width: 205 }}
        className='ml-auto bg-dark mt-3 mb-3'
      >
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
    </Fragment>
  );
};

export default SearchInput;
