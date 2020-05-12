import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Title from '../Title';
import { useSelector, useDispatch } from 'react-redux';
import { totalSales } from '../../../actions/orderAction';
import { loadAllUser } from '../../../actions/userAction';
import { fetchMenu } from '../../../actions/catalogAction';
import { currencyFormatter, integerFormatter } from '../../utils/formatter';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const {
    user: { allUser },
    auth: { user },
    order: { total, isLoading },
    menu: { data },
  } = useSelector((state) => {
    return {
      auth: state.auth,
      user: state.user,
      order: state.order,
      menu: state.menu,
    };
  });

  useEffect(() => {
    dispatch(loadAllUser());
    dispatch(fetchMenu());
    dispatch(totalSales());
  }, []);
  return (
    <div className='m-auto container'>
      <Title
        title='dashboard'
        icon='fas fa-user-alt fa-2x'
        subtitle={`Welcome ${user !== null ? user.name : ''}`}
      />

      {/** Main content */}
      <section className='content'>
        <div className='container-fluid'>
          {/*Small boxes (Stat box) */}
          <div className='row'>
            <div className='col-lg-3 col-6'>
              {/*small box*/}
              <div className='small-box bg-info'>
                <div className='inner'>
                  <h3>{isLoading ? 0 : currencyFormatter(total.paid)}</h3>

                  <p>Paid Order(s)</p>
                </div>
                <div className='icon'>
                  <i className='ion ion-bag'></i>
                </div>
                <Link to='/admin/history' className='small-box-footer'>
                  More info <i className='fas fa-arrow-circle-right'></i>
                </Link>
              </div>
            </div>
            {/*./col*/}
            <div className='col-lg-3 col-6'>
              {/** small box */}

              <div className='small-box bg-success'>
                <div className='inner'>
                  <h3>{isLoading ? 0 : currencyFormatter(total.pending)}</h3>

                  <p>Pending Order(s)</p>
                </div>
                <div className='icon'>
                  <i className='ion ion-stats-bars'></i>
                </div>
                <Link to='/admin/history' className='small-box-footer'>
                  More info <i className='fas fa-arrow-circle-right'></i>
                </Link>
              </div>
            </div>
            {/** ./col */}
            <div className='col-lg-3 col-6'>
              {/** small box */}
              <div className='small-box bg-warning'>
                <div className='inner'>
                  <h3>{integerFormatter(allUser.length)}</h3>

                  <p>User Registrations</p>
                </div>
                <div className='icon'>
                  <i className='ion ion-person-add'></i>
                </div>
                <Link to='/admin/client' className='small-box-footer'>
                  More info <i className='fas fa-arrow-circle-right'></i>
                </Link>
              </div>
            </div>
            {/** ./col */}
            <div className='col-lg-3 col-6'>
              {/** small box */}
              <div className='small-box bg-danger'>
                <div className='inner'>
                  <h3>{integerFormatter(data.length)}</h3>

                  <p>Available Menu</p>
                </div>
                <div className='icon'>
                  <i className='ion ion-pie-graph'></i>
                </div>
                <Link to='/admin/menu' className='small-box-footer'>
                  More info <i className='fas fa-arrow-circle-right'></i>
                </Link>
              </div>
            </div>
            {/** ./col */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
