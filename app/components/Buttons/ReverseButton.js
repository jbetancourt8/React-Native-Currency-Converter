import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

const styles = {
  container: {
    alignItems: 'center'
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 19,
    marginRight: 11
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 20
  }
};

const ReverseButton = ({ onPress, text }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.wrapper}>
      <Image
        resizeMode='contain'
        style={styles.icon}
        source={require('./images/icon.png')}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

ReverseButton.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string
};

export default ReverseButton;
