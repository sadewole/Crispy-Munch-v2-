import React, { Component } from 'react';
import { connect } from 'react-redux';

export default OriginalComponent => {
  class MixedComponents extends Component {
    checkAuth = () => {
      const { isAuthenticated, user, token, isLoading, history } = this.props;
      if (!isAuthenticated && !token && isLoading) {
        console.log('but why!!!')
        history.push('/');
      }

      // redirected if auth admin
      if (isAuthenticated && user.role === 'ADMIN') {
        history.push('/admin');
      }
    };

    //   checked if auth when mount
    shouldComponentUpdate() {
      this.checkAuth();
      return true
    }

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user,
      token: state.auth.token,
      isLoading: state.auth.isLoading
    };
  };
  return connect(mapStateToProps)(MixedComponents);
};
