import React, { Fragment } from 'react';

const Sort = ({ name, cloneData, setCloneData }) => {
  let updated = [...cloneData];

  const handleSort = () => {
    updated = updated.sort((a, b) => (a[name] < b[name] ? -1 : 1));

    setCloneData(updated);
  };

  return (
    <Fragment>
      <p onClick={handleSort} className='bg-white p-2 sort'>
        Sort by {name}
        <i className='fas fa-sort p-2'></i>
      </p>
    </Fragment>
  );
};

export default Sort;
