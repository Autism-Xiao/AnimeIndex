import {
    PixelRatio,
    Dimensions,
    Platform
} from 'react-native';

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
// iPhoneX iPhoneXS
const X_WIDTH = 375;
const X_HEIGHT = 812;

// iPhoneXR iPhoneXS MAX
const X_MAX_WIDTH = 414;
const X_MAX_HEIGHT = 896;

/**
 * 判断是否为iphoneX系列
 * @returns {boolean}
 */
export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((screenH >= X_HEIGHT && screenW >= X_WIDTH) ||
            (screenH >= X_WIDTH && screenW >= X_HEIGHT) ||
            (screenH >= X_MAX_HEIGHT && screenW >= X_MAX_WIDTH) ||
            (screenH >= X_MAX_WIDTH && screenW >= X_MAX_HEIGHT))
    )
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */

export function ifIphoneX(iphoneXStyle, iosStyle, androidStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    } else if (Platform.OS === 'ios') {
        return iosStyle
    } else {
        if (androidStyle) return androidStyle;
        return iosStyle
    }
}