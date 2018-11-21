'use strict';
import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import './../app/utils/Global';
import { addCustomProps } from './utils/addCustomProps';
// 处理iOS系统文字
addCustomProps(Text, { allowFontScaling: false });
addCustomProps(TextInput, { allowFontScaling: false });

import MyStackNavigator from './route/MyStackNavigator';

type Props = {};
export default class Root extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <MyStackNavigator />
            </Provider>
        );
    }
}


{/*

     <StatusBar
                    backgroundColor={'transparent'}
                    barStyle={'default'}
                    translucent={true}
                    hide={true}
                />

*/}
