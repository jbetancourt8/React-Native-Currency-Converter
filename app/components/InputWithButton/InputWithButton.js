import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard
} from 'react-native';
import PropTypes from 'prop-types';

const INPUT_HEIGHT = 48;
const BORDER_RADIUS = 4;

const styles = {
  container: {
    backgroundColor: 'white',
    width: '90%',
    height: INPUT_HEIGHT,
    borderRadius: BORDER_RADIUS,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 11
  },
  containerDisabled: {
    backgroundColor: '#F0F0F0'
  },
  buttonContainer: {
    height: INPUT_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    paddingHorizontal: 16
  },
  border: {
    height: INPUT_HEIGHT,
    width: StyleSheet.hairlineWidth,
    backgroundColor: '#E2E2E2'
  },
  input: {
    flex: 1,
    height: INPUT_HEIGHT,
    fontSize: 18,
    paddingHorizontal: 8,
    color: '#797979'
  }
};

const InputWithButton = (props) => {
  const { buttonText, onPress, editable = true, textColor } = props;

  const containerStyle = [styles.container];
  if (editable === false) {
    containerStyle.push(styles.containerDisabled);
  }

  const buttonTextColor = [styles.buttonText];
  if (textColor) {
    buttonTextColor.push({ color: textColor });
  }

  return (
    <View style={containerStyle}>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={buttonTextColor}>{buttonText}</Text>
      </TouchableOpacity>
      <View style={styles.border} />
      <TextInput
        underlineColorAndroid='transparent'
        style={styles.input}
        {...props}
        onSubmitEditing={Keyboard.dismiss}
      />
    </View>
  );
};

InputWithButton.protoTypes = {
  buttonText: PropTypes.string,
  onPress: PropTypes.func,
  editable: PropTypes.bool,
  textColor: PropTypes.string
};

export default InputWithButton;
