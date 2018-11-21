'use strict';
import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export default {
	SCREEN_WIDTH: width,
	SCREEN_HEIGHT: height,
	iOS: Platform.OS === 'ios',
	Android: Platform.OS === 'android',

};