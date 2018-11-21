/**
 * 封装上拉更多加载器
 * @author wuxiaoxiao
 * */

'use strict';
import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

class LoadMoreFooter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.footer}>
                <ActivityIndicator style={styles.loadingMore}/>
                <Text style={styles.footerTitle}>{'正在加载更多......'}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: px2dp(80),
    },
    footerTitle: {
        marginLeft: px2dp(20),
        fontSize: FONT_SIZE(15),
        color: 'gray'
    }
});

export default LoadMoreFooter