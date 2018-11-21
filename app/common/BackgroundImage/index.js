'use strict';
/**
 * 通用背景图
 * @author 吴潇潇
 */
import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';

class BackgroundImage extends Component {
    static defaultProps = {
        backgroundUrl: "",
    };
    render() {
        return (
            <Image
                source={this.props.backgroundUrl}
                style={[this.props.style]}
            />
        );
    }
}

export default BackgroundImage;

