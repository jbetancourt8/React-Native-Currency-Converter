import React, { Component } from 'react';
import { View, StatusBar, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Currencies from '../data/Currencies';
import { ListItem } from '../components/List/ListItem';
import { Separator } from '../components/List/Separator';
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';

class CurrencyList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    primaryColor: PropTypes.string
  };

  handlePressed = (currency) => {
    const { type } = this.props.navigation.state.params;

    if (type === 'base') {
      this.props.dispatch(changeBaseCurrency(currency));
    } else if (type === 'quote') {
      this.props.dispatch(changeQuoteCurrency(currency));
    }

    this.props.navigation.goBack(null);
  };

  render() {
    const { type } = this.props.navigation.state.params;
    let comparisonCurrency = this.props.baseCurrency;

    if (type === 'quote') {
      comparisonCurrency = this.props.quoteCurrency;
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle='default' />
        <FlatList
          data={Currencies}
          renderItem={({ item }) => (
            <ListItem
              text={item}
              selected={item === comparisonCurrency}
              onPress={() => this.handlePressed(item)}
              iconBackground={this.props.primaryColor}
            />
          )}
          keyExtractor={item => item}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const baseCurrency = state.currenciesReducers.baseCurrency;
  const quoteCurrency = state.currenciesReducers.quoteCurrency;
  const primaryColor = state.themesReducers.primaryColor;

  return {
    baseCurrency,
    quoteCurrency,
    primaryColor
  };
};

export default connect(mapStateToProps)(CurrencyList);
