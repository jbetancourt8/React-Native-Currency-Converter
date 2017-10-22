import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

const styles = {
  text: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  }
};

const LastConverted = ({ base, quote, conversionRate, date }) => (
  <Text style={styles.text}>
    1 {base} = {conversionRate} {quote} as of{' '}
    {moment(date).format('MMMM D, YYYY')}
  </Text>
);

LastConverted.prototype = {
  base: PropTypes.string,
  quote: PropTypes.string,
  conversionRate: PropTypes.number,
  date: PropTypes.date
};

export default LastConverted;
