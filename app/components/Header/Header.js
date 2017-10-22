import React from 'react';
import { View, Image, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';

const styles = {
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    paddingTop: Platform.OS === 'ios' ? 20 : null
  },
  button: {
    alignSelf: 'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 20
  },
  icon: {
    width: 18
  }
};

const Header = ({ onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        resizeMode='contain'
        style={styles.icon}
        source={require('./images/gear.png')}
      />
    </TouchableOpacity>
  </View>
);

Header.prototype = {
  onPress: PropTypes.func
};

export default Header;
