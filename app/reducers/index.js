'use strict';
import { combineReducers } from 'redux';
import HomeReducers from './homeReducers';
import HomeDetailsReducers from './homeDetailsReducers';

const rootReducer = combineReducers({
    HomeReducers,
    HomeDetailsReducers,
});

export default rootReducer;