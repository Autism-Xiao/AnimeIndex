/**
 * 封装gif加载器
 * @author wuxiaoxiao
 * */

'use strict';
import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Modal,
    StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import loadingImage from './../../images/js_resource_img_global_loading.gif';
const { width, height } = Dimensions.get('window');

class LoadingView extends Component {
    constructor(props) {
        super(props);
    }
    _close() {
        console.log("onRequestClose ---- ")
    }
    render() {
        const { showLoading, opacity, backgroundColor } = this.props;

        return (
            <Modal onRequestClose={() => this._close()} visible={showLoading} transparent>
                <View style={[styles.loadingView, { opacity: opacity || 1, backgroundColor: backgroundColor || '#fff' }]}></View>
                <View style={styles.loadingImageView}>
                    <View style={styles.loadingImage}>
                        {
                            this.props.loadingViewClick ?
                                <TouchableOpacity onPress={this.props.loadingViewClick}>
                                    <Image style={styles.loadingImage} source={loadingImage} />
                                </TouchableOpacity>
                                :
                                <Image style={styles.loadingImage} source={loadingImage} />
                        }
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        height,
        width,
    },
    loadingImage: {
        width: px2dp(90),
        height: px2dp(90),
    },
    loadingImageView: {
        position: 'absolute',
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

LoadingView.propTypes = {
    loadingViewClick: PropTypes.func, //.isRequired,
    showLoading: PropTypes.bool.isRequired,
    opacity: PropTypes.number,
    backgroundColor: PropTypes.string
}

export default LoadingView;