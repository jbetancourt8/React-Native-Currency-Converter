import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logo from '../components/Logo/Logo';
import InputWithButton from '../components/InputWithButton/InputWithButton';
import ReverseButton from '../components/Buttons/ReverseButton';
import LastConverted from '../components/Text/LastConverted';
import Header from '../components/Header/Header';
import {
  swapCurrency,
  changeCurrencyAmount,
  getInitialConversion
} from '../actions/currencies';
import connectAlert from '../components/Alert/connectAlert';

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    isFetching: PropTypes.bool,
    lastConversionDate: PropTypes.object,
    primaryColor: PropTypes.string,
    currencyError: PropTypes.string,
    alertWithType: PropTypes.func
  };

  componentWillMount() {
    this.props.dispatch(getInitialConversion());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currencyError && !this.props.currencyError) {
      this.props.alertWithType('error', 'Error', nextProps.currencyError);
    }
  }

  baseCurrencyPressed = () => {
    this.props.navigation.navigate('CurrencyList', {
      title: 'Base Currency List',
      type: 'base'
    });
  };

  quoteCurrencyPressed = () => {
    this.props.navigation.navigate('CurrencyList', {
      title: 'Quote Currency List',
      type: 'quote'
    });
  };

  optionPressed = () => {
    this.props.navigation.navigate('Options', {
      title: 'Options'
    });
  };

  handleTextChange = (amount) => {
    this.props.dispatch(changeCurrencyAmount(amount));
  };

  swapCurrency = () => {
    this.props.dispatch(swapCurrency());
  };

  render() {
    let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);

    if (this.props.isFetching) {
      quotePrice = '...';
    }

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={[
            styles.container,
            { backgroundColor: this.props.primaryColor }
          ]}
        >
          <StatusBar translucent={false} barStyle='light-content' />
          <Header onPress={this.optionPressed} />
          <KeyboardAvoidingView behavior='padding'>
            <Logo tintColor={this.props.primaryColor} />
            <InputWithButton
              buttonText={this.props.baseCurrency}
              onPress={this.baseCurrencyPressed}
              defaultValue={this.props.amount.toString()}
              keyboardType='numeric'
              onChangeText={this.handleTextChange}
              textColor={this.props.primaryColor}
            />
            <InputWithButton
              buttonText={this.props.quoteCurrency}
              onPress={this.quoteCurrencyPressed}
              defaultValue={quotePrice}
              editable={false}
              textColor={this.props.primaryColor}
            />
            <LastConverted
              base={this.props.baseCurrency}
              quote={this.props.quoteCurrency}
              conversionRate={this.props.conversionRate}
              date={this.props.lastConversionDate}
            />
            <ReverseButton
              onPress={this.swapCurrency}
              text='Reverse Currency'
            />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state) => {
  const baseCurrency = state.currenciesReducers.baseCurrency;
  const quoteCurrency = state.currenciesReducers.quoteCurrency;
  const amount = state.currenciesReducers.amount;
  const conversionSelector =
    state.currenciesReducers.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};
  const isFetching = conversionSelector.isFetching;
  const lastConversionDate = conversionSelector.date
    ? new Date(conversionSelector.date)
    : new Date();
  const primaryColor = state.themesReducers.primaryColor;
  const currencyError = state.currenciesReducers.error;

  return {
    baseCurrency,
    quoteCurrency,
    amount,
    conversionRate: rates[quoteCurrency] || 0,
    isFetching,
    lastConversionDate,
    primaryColor,
    currencyError
  };
};

export default connect(mapStateToProps)(connectAlert(Home));
