import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

class StarRepository extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { route } = this.props;
    const { repository } = route.params;
    return (
      <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />
    );
  }
}

export default StarRepository;

StarRepository.propTypes = {
  route: PropTypes.shape().isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
