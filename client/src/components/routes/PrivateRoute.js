import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';

export default OriginalComponent => {
  class MixedComponents extends Component {
    checkAuth = () => {
      const {
        isAuthenticated,
        history,
        token
      } = this.props;

      if (!isAuthenticated && token === null) {
        history.push('/');
      }

    };

    //   checked if auth when mount
    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      // redirected if auth admin
      this.checkAuth();
      const {
        isAuthenticated,
        user,
        history,
        match
      } = this.props;

      if (isAuthenticated && user.role === 'ADMIN') {
        history.push('/admin');

        switch (match.params.slum) {
          case 'menu':
            history.push('/admin/menu');
            break;
          case 'client':
            history.push('/admin/client');
            break;
          case 'history':
            history.push('/admin/history');
            break
        }
      }
    }

    render() {
      return <OriginalComponent {
        ...this.props
      }
      />;
    }
  }

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      token: state.auth.token,
      user: state.auth.user
    };
  };
  return connect(mapStateToProps)(MixedComponents);
};