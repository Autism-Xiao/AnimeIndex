'use strict';

import { createStackNavigator } from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';
import Home from '../views/home/home';
import HomeDetails from './../views/home/homeDetails';
import System from './../utils/System';
export default createStackNavigator({
    Home: {
        screen: Home,
    },
    HomeDetails: {
        screen: HomeDetails
    }
},
    {
        initialRouteName: 'Home',
        navigationOptions: () => ({
            header: null,
            gesturesEnabled: true,
        }),
        transitionConfig: () => ({
            // 只要修改最后的forHorizontal就可以实现不同的动画了。
            // 1、从右向左：forHorizontal；
            // 2、从下向上：forVertical；
            // 3、安卓那种的从下向上：forFadeFromBottomAndroid；
            // 4、无动画：forInitial。
            screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        })
    });