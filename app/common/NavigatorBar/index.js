'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import System from './../../utils/System';
import {ifIphoneX} from './../../utils/IphoneXUtils';

// 导航栏的高度
const navHeight = iOS ? 44 : 44 + STATYSBAR;
// 导航栏顶部的状态栏高度
const navStatusBarHeight = iOS ? 20 : 0;
// 导航栏除掉状态栏的高度
const navContentHeight = iOS ? 44 : 44;

const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default',]),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
};

class NavigatorBar extends Component {
    static propTypes = {
        title: PropTypes.string, // nav标题
        titleTextColor: PropTypes.string, // nav标题颜色  
        isHide: PropTypes.bool,//是否隐藏  
        leftButton: PropTypes.element, //右侧按钮
        rightButton: PropTypes.element, //左侧按钮
        statusBar: PropTypes.shape(StatusBarShape),//状态栏
    };

    static defaultProps = {
        title: '加载标题中...',
        titleTextColor: '#000000',
        isHide: false,//是否隐藏导航栏
        hide: false,//是否隐藏状态栏
        // 状态栏的颜色
        statusBar: {
            barStyle: 'default',
            hidden: false,
            backgroundColor: 'transparent',
        },
    }

    // 自定义左右侧按钮
    _renderElement(data) {
        return (
            <View style={styles.navBarButton}>
                {data ? data : null}
            </View>
        )
    }

    // 显示头部文字
    _renderTitle() {
        return (
            <View style={styles.navTitleView}>
                <Text
                    numberOfLines={1}
                    style={[styles.navTitle, this.props.navTitle]}>
                    {this.props.title}
                </Text>
            </View>
        )
    }

    // 状态栏
    _statusBar() {
        let statusBar = !this.props.statusBar.hidden ?
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar} />
            </View> : null;

        return statusBar;
    }

    // 整体的TitleBar
    _renderTitleBar() {
        let content = this.props.isHide
            ? null
            : <View style={[styles.navBarStyle, this.props.navBarStyle]}>
                <View style={[styles.navContentStyle, this.props.navContentStyle]}>
                    {/* 导航左按钮 */}
                    {this._renderElement(this.props.leftButton)}
                    {/* 导航title */}
                    {this._renderTitle()}
                    {/* 导航右按钮*/}
                    {this._renderElement(this.props.rightButton)}
                </View>
            </View>

        return content;
    }

    render() {
        return (
            <View style={styles.container}>
                {this._statusBar()}
                {this._renderTitleBar()}
            </View>
        )
    }
}

let platformContainerStyles;
if (iOS) {
  platformContainerStyles = {
    borderBottomWidth: pixel,
    borderBottomColor: '#A7A7AA',
  };
} else {
  platformContainerStyles = {
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: pixel,
    shadowOffset: {
      height: pixel,
    },
    elevation: 4,
  };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    navBarStyle: {
        height: navHeight,
        backgroundColor: '#ffffff',
 
    },
    navContentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: navContentHeight,
        marginHorizontal: px2dp(20),
        marginTop: iOS ? 0 : STATYSBAR, 
    },
    navTitleView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: px2dp(160),
        marginRight: px2dp(160),
    },
    navTitle: {
        fontSize: FONT_SIZE(16),
        color: '#000000'
    },
    navBarButton: {
        alignItems: 'center',
    },
    statusBar: {
        width: System.SCREEN_WIDTH,
        height: navStatusBarHeight,
        ...ifIphoneX({  
            paddingTop: 44, 
        }, {  
            paddingTop: 0,
        })
    },

});

export default NavigatorBar;

