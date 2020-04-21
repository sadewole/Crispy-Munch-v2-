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
        history.push('/login');
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
        // To ensure page remains the same when admin refresh page
        if (match.url) {
          history.push(match.url)
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