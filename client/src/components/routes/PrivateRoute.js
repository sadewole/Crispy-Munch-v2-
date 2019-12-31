import React, { Component } from 'react';
import { connect } from 'react-redux';

export default OriginalComponent => {
  class MixedComponents extends Component {
    checkAuth = () => {
      const { isAuthenticated, token, isLoading, user, history } = this.props;
      if (!isAuthenticated && isLoading === true) {
        history.push('/');
      }
      //   if (isAuthenticated && user !== null) {
      //     if (user.role === 'ADMIN') {
      //       history.push('/admin');
      //     }

      // }
      if (user.role === 'CLIENT') {
        history.push('/menu');
      }
    };
    //   checked if auth when mount
    componentDidMount() {
      this.checkAuth();
    }

    // check if auth when updated
    componentDidUpdate() {
      this.checkAuth();
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
