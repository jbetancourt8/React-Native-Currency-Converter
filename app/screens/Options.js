import React, { Component } from 'react';
import {
  StatusBar,
  ScrollView,
  Platform,
  Linking
} from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { ListItem } from '../components/List/ListItem';
import { Separator } from '../components/List/Separator';
import connectAlert from '../components/Alert/connectAlert';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#868686';
const ICON_SIZE = 23;

class Options extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func
  };

  themesPressed = () => {
    this.props.navigation.navigate('Themes', {
      title: 'Themes'
    });
  };

  sitePressed = () => {
    Linking.openURL('http://fixer.io/').catch(() =>
      this.props.alertWithType(
        'error',
        'Sorry!',
        'Fixer.io cannot be opened at this time. Please try again later.'
      )
    );
  };

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle='default' />
        <ListItem
          text='Themes'
          onPress={this.themesPressed}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-arrow-forward`}
              color={ICON_COLOR}
              size={ICON_SIZE}
            />
          }
        />
        <Separator />
        <ListItem
          text='Fixer.io'
          onPress={this.sitePressed}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-link`}
              color={ICON_COLOR}
              size={ICON_SIZE}
            />
          }
        />
        <Separator />
      </ScrollView>
    );
  }
}

export default connectAlert(Options);
