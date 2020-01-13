import React, { Component } from 'react';
import { connect } from 'react-redux';

export default OriginalComponent => {
  class MixedComponents extends Component {
    checkAuth = () => {
<<<<<<< HEAD
      const { isAuthenticated, user, token, isLoading, history } = this.props;
      if (!isAuthenticated && !token && isLoading) {
        history.push('/');
      }

      // redirected if auth admin
      if (isAuthenticated && user.role === 'ADMIN') {
        history.push('/admin');
      }
    };

    //   checked if auth when mount
    shouldComponentUpdate() {
      return this.checkAuth();
    }

=======
      const { isAuthenticated, token, isLoading, user, history } = this.props;
      if (!isAuthenticated && isLoading === true) {
        history.push('/');
      }
      //   if (isAuthenticated && user !== null) {
      //     if (user.role === 'ADMIN') {
      //       history.push('/admin');
      //     }

      // }
      //   if (user.role === 'CLIENT') {
      //     history.push('/menu');
      //   }
    };
    //   checked if auth when mount
    componentDidMount() {
      this.checkAuth();
    }

    // check if auth when updated
    componentDidUpdate() {
      this.checkAuth();
    }
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
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
