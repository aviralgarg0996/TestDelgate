'use strict';
import {
  Platform,
} from 'react-native';
import { startLoading, stopLoading} from './app';
import RestClient from '../../utilities/RestClient';
import { ToastActionsCreators } from 'react-native-redux-toast';

// Actions


// Action Creators


//perform api's related to user


/**
* Initial state
*/
const initialState = {
  OrderData:{},
  ScreenMaxFlag:true,
};

/**
* Reducer
*/
export default function OrdersHandleReducer(state = initialState, action = {})
{
    var newstate = Object.assign({}, state);
    switch (action.type) {
      case 'SET_ORDERDATA':
        newstate.OrderData = action.data;
        return newstate;
      case 'SET_SCREENSIZE':
        newstate.ScreenMaxFlag = action.flag;
        return newstate;

      default:
          return newstate;

    }
}
