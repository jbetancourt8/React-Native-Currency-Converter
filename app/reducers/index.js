import { combineReducers } from 'redux';
import currenciesReducers from './currenciesReducer';
import themesReducers from './themesReducer';

export default combineReducers({
  currenciesReducers,
  themesReducers
});
