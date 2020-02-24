import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  constructor() {
    super();
    this.state = { stars: [], loading: false, page: 1, refreshing: false };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await this.loadRepositories();
    this.setState({ stars: response.data, loading: false });
  }

  loadRepositories = async () => {
    const { route } = this.props;
    const { user } = route.params;
    const { page } = this.state;

    return api.get(`users/${user.login}/starred?page=${page}`);
  };

  loadMore = async () => {
    const { page, stars } = this.state;
    await this.setState({ page: page + 1 });
    const response = await this.loadRepositories();

    this.setState({
      stars: stars.concat(response.data),
      loading: false,
    });
  };

  refreshList = async () => {
    await this.setState({ page: 1, refreshing: true });
    const response = await this.loadRepositories();

    this.setState({
      stars: response.data,
      refreshing: false,
    });
  };

  handleNavigateRepository = repository => {
    const { navigation } = this.props;
    navigation.navigate('StarRepository', { repository });
  };

  render() {
    const { route } = this.props;
    const { stars, loading, refreshing } = this.state;
    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.handleNavigateRepository(item)}
              >
                <Starred>
                  <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              </TouchableOpacity>
            )}
          />
        )}
      </Container>
    );
  }
}

User.propTypes = {
  route: PropTypes.shape().isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
