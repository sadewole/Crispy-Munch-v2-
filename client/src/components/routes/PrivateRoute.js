import React, { Component } from 'react';
import { connect } from 'react-redux';

export default OriginalComponent => {
  class MixedComponents extends Component {
    checkAuth = () => {
      const { isAuthenticated, user, history } = this.props;
      if (!isAuthenticated) {
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
      return true;
    }

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user
    };
  };
  return connect(mapStateToProps)(MixedComponents);
};
