'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    SafeAreaView,
    PixelRatio,
    TouchableOpacity,
} from 'react-native';

import System from './../../utils/System';
import { NavigatorBar, BackgroundImage, LoadingView } from './../../common';
import { connect } from 'react-redux';
import * as homeDetailsAction from './../../actions/homeDetailsAction';
import { ifIphoneX } from './../../utils/IphoneXUtils';

const navHeight = iOS ? 64 : 44 + STATYSBAR;
const navContentHeight = iOS ? 44 : 44;
const topHeight = iOS ? 20 : STATYSBAR;

type Props = {};
class HomeDetails extends Component<Props> {

    componentWillMount() {
        const { navigation, dispatch } = this.props;
        const itemId = navigation.getParam('id');
        dispatch(homeDetailsAction.fetchAnmineInfo(itemId, false));
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(homeDetailsAction.removeInitListitemAction());
    }

    // 滚动位置
    _onScroll = (event) => {
        let y = event.nativeEvent.contentOffset.y
        let opacityPercent = y / 10;
        if (y < 10) {
            this.navBar.setNativeProps({
                style: { opacity: opacityPercent }
            })
        } else {
            this.navBar.setNativeProps({
                style: { opacity: 1 }
            })
        }
    }

    // 返回操作
    onBack = () => {
        this.props.navigation.goBack();
    }

    // 左侧返回按钮
    _leftButton = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.onBack()
                }}>
                <View style={{ alignItems: 'center', }}>
                    <Image
                        source={require('./../../images/appbar_back_24.png')}
                        style={{
                            width: px2dp(48),
                            height: px2dp(48),
                            tintColor: '#000'
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    backButton = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.onBack()
                }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: 8,
                    width: px2dp(60),
                    height: px2dp(60),
                }}>
                    <Image
                        source={require('./../../images/appbar_back_24.png')}
                        style={{
                            width: px2dp(48),
                            height: px2dp(48),
                            tintColor: '#fff'
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const {
            isLoading,
            bgImg,
            posterImg,
            titles,
            startDate,
            en_jp,
            ja_jp,
            showType,
            status,
            synopsis,
        } = this.props;

        let statusBar = {
            backgroundColor: 'transparent',
            barStyle: 'default',
            translucent: true,
            hide: true,
        };

        let bgImage = bgImg ? { uri: bgImg } : null;

        let posterImage = posterImg ? { uri: posterImg } : null;


        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>

                    <View ref={ref => this.navBar = ref}
                        style={[styles.navBarStyle, { opacity: 0, position: "absolute", left: 0, right: 0, zIndex: 1, }]}>
                        <NavigatorBar
                            title={'info'}
                            statusBar={statusBar}
                            leftButton={this._leftButton()}
                        />
                    </View>

                    <ScrollView
                        scrollEventThrottle={10}
                        onScroll={this._onScroll}
                    >

                        <View style={{ height: px2dp(600), width: System.SCREEN_WIDTH, backgroundColor: 'rgba(76,75,75,.3)' }}>
                            <BackgroundImage
                                style={{ height: px2dp(600), width: System.SCREEN_WIDTH, position: 'absolute', }}
                                backgroundUrl={require('./../../images/defaultcover.png')}
                            />

                            <Image
                                resizeMode={'stretch'}
                                source={bgImage}
                                style={{ height: px2dp(600), width: System.SCREEN_WIDTH }}
                            />

                            <View style={{
                                width: SCREEN_WIDTH,
                                height: navHeight,
                                position: 'absolute',
                                top: 0,
                            }}>
                                <View style={[styles.navContentStyle, {
                                    marginTop: topHeight,
                                    ...ifIphoneX({
                                        paddingTop: 44
                                    }, {
                                            paddingTop: 0
                                        })
                                }]}>
                                    {this.backButton()}
                                </View>
                            </View>

                        </View>
                        <View style={{
                            width: System.SCREEN_WIDTH,
                            height: 35,
                            backgroundColor: '#ffffff',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ marginLeft: 15, color: '#B2B1B1' }}>简介</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            paddingLeft: px2dp(24),
                            paddingTop: px2dp(24),
                            paddingBottom: px2dp(24),
                            backgroundColor: '#FCFBFB',
                            borderBottomWidth: 1 / PixelRatio.get(),
                            borderBottomColor: 'rgba(76,75,75,.3)',
                        }}>

                            <View style={{
                                height: px2dp(240),
                                width: px2dp(150),
                                borderRadius: 3,
                            }}>

                                <BackgroundImage
                                    style={{
                                        height: px2dp(240),
                                        width: px2dp(150),
                                        borderRadius: 3,
                                        position: 'absolute',
                                    }}
                                    backgroundUrl={require('./../../images/defaultcover.png')}
                                />

                                <Image
                                    resizeMode={'stretch'}
                                    source={posterImage}
                                    style={{ height: px2dp(240), width: px2dp(150), borderRadius: 3, }}
                                />

                            </View>

                            <View style={{
                                marginLeft: px2dp(24),
                                width: System.SCREEN_WIDTH - px2dp(198),
                            }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ fontSize: FONT_SIZE(14), color: '#000000' }} numberOfLines={1}>{titles}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: px2dp(5), marginBottom: px2dp(5) }}>
                                    <Text style={{ fontSize: FONT_SIZE(12), color: '#B2B1B1', }} numberOfLines={1}>罗马音</Text>
                                    <Text style={{ fontSize: FONT_SIZE(12), color: '#B2B1B1', marginLeft: px2dp(12), }} numberOfLines={1}>{en_jp}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: px2dp(5), marginBottom: px2dp(5) }}>
                                    <Text style={{ fontSize: FONT_SIZE(12), color: '#B2B1B1', }} numberOfLines={1}>日语</Text>
                                    <Text style={{ fontSize: FONT_SIZE(12), color: '#B2B1B1', marginLeft: px2dp(12), }} numberOfLines={1}>{ja_jp}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: px2dp(5), marginBottom: px2dp(5) }}>
                                    <Text style={{ fontSize: FONT_SIZE(12), color: '#B2B1B1', }} numberOfLines={1}>类型</Text>
                                    <Text style={{ fontSize: FONT_SIZE(12), color: '#B2B1B1', marginLeft: px2dp(12), }} numberOfLines={1}>{showType}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: px2dp(5), marginBottom: px2dp(5) }}>
                                    <Text style={{ fontSize: FONT_SIZE(12), color: '#B2B1B1', }} numberOfLines={1}>状态</Text>
                                    <Text style={{ fontSize: FONT_SIZE(12), color: '#B2B1B1', marginLeft: px2dp(12), }} numberOfLines={1}>{status}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: px2dp(5), marginBottom: px2dp(5) }}>
                                    <Text style={{ fontSize: FONT_SIZE(12), color: '#B2B1B1', }} numberOfLines={1}>开始时间</Text>
                                    <Text style={{ fontSize: FONT_SIZE(12), color: '#B2B1B1', marginLeft: px2dp(12), }} numberOfLines={1}>{startDate}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={{ paddingTop: px2dp(12), paddingLeft: px2dp(12), paddingBottom: px2dp(12), backgroundColor: '#FCFBFB' }}>
                            <Text style={{ fontSize: FONT_SIZE(12), color: '#B2B1B1', }}>
                                {synopsis}
                            </Text>
                        </View>

                    </ScrollView>

                    <LoadingView showLoading={isLoading} backgroundColor={'#fff'} opacity={1} />

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
    },
    navContentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: navContentHeight,
        marginHorizontal: 10,
        marginTop: iOS ? 0 : STATYSBAR,
    },
});

const mapStateToProps = (state) => {
    const {
        isLoading,
        bgImg,
        posterImg,
        titles,
        startDate,
        en_jp,
        ja_jp,
        showType,
        status,
        synopsis,
    } = state.HomeDetailsReducers;
    return {
        isLoading,
        bgImg,
        posterImg,
        titles,
        startDate,
        en_jp,
        ja_jp,
        showType,
        status,
        synopsis,
    };
}

export default connect(mapStateToProps)(HomeDetails);



