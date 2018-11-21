'use strict';

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    RefreshControl,
    PixelRatio,
} from 'react-native';

import System from './../../utils/System';
import { NavigatorBar, LoadingView, LoadMoreFooter, BackgroundImage } from './../../common';
import { connect } from 'react-redux';
import * as homeAction from './../../actions/homeAction';

let params = {
    "page[offset]": 0,
    "page[limit]": 20,
    "sort": "-userCount",
}

let isFirstLoad = false;//防止上拉第一次刷新

type Props = {};
class Home extends PureComponent<Props> {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(homeAction.fetchAnmine(true, false, false, params));
    }

    _onRefresh = () => {
        const { dispatch } = this.props;
        params["page[offset]"] = 0;
        dispatch(homeAction.fetchAnmine(false, true, false, params));
    }

    _onEndReached = () => {
        if (!isFirstLoad) {
            params["page[offset]"] += 20;
            const { dispatch } = this.props;
            dispatch(homeAction.fetchAnmine(false, false, true, params));
        }
    }

    _renderFooter = () => {
        const { isLoadingMore } = this.props;
        if (isLoadingMore) {
            return (
                <LoadMoreFooter />
            );
        }

        return null;
    }

    // 列表的key
    _keyExtractor = (item, index) => {
        return index.toString() + item.attributes.titles.ja_jp;
    }

    // 跳转详情
    goToHomeDetails = (item) => {
        this.props.navigation.navigate('HomeDetails', {
            id: item.item.id,
        });
    }

    // 列表Item
    _renderItem = (item) => {
        return (
            <HomeItem
                data={item}
                onPress={() => this.goToHomeDetails(item)}
            />
        )
    }

    render() {
        const { animeList, isLoading, isRefresh } = this.props;
        let animeListData = animeList;

        if (animeListData.length) {
            isFirstLoad = false;
        }

        let statusBar = {
            backgroundColor: 'transparent',
            barStyle: 'default',
            translucent: true,
            hide: true,
        };

        return (
            <SafeAreaView style={{ flex: 1}}>
                <View style={styles.container}>
                    <NavigatorBar title={'Anime'} statusBar={statusBar} />
                
                    <FlatList
                        data={animeListData}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={(animeListData) => this._renderItem(animeListData)}
                        numColumns={2}
                        contentContainerStyle={{ paddingRight: px2dp(20) }}
                        onEndReached={this._onEndReached}
                        onEndReachedThreshold={0.02}
                        ListFooterComponent={this._renderFooter}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefresh}
                                onRefresh={() => this._onRefresh()}
                                tintColor="#8E8E8E"
                                titleColor="#8E8E8E"
                                colors={['#F75888', '#F75888', '#F75888']}
                            />
                        }
                    />
                    <LoadingView showLoading={isLoading} backgroundColor={'#fff'} opacity={1} />
                </View>
            </SafeAreaView>
        );
    }
}

const HomeItem = ({
    data,
    onPress,
}) => {
    let publisherAvatar = data.item.attributes.posterImage && data.item.attributes.posterImage.small
        ? { uri: data.item.attributes.posterImage.small }
        : require('./../../images/error.jpg');
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={{
                flex: 1,
                borderRadius: 8,
                backgroundColor: '#fff',
                marginTop: px2dp(20),
                marginLeft: px2dp(20),
                alignItems: 'center',
                borderColor: '#CDB79E',
                borderWidth: 1 / PixelRatio.get(),
            }}
            onPress={onPress}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: px2dp(32), }}>
                <BackgroundImage
                    style={{ width: (System.SCREEN_WIDTH) / 2 - px2dp(104), height: px2dp(352), borderRadius: 6, position: 'absolute', top: px2dp(32), }}
                    backgroundUrl={require('./../../images/defaultcover.png')}
                />

                <Image
                    resizeMode={'stretch'}
                    style={{ width: (System.SCREEN_WIDTH) / 2 - px2dp(104), height: px2dp(352), borderRadius: 6, }}
                    source={publisherAvatar}
                />

            </View>

            <View style={{ alignItems: 'center', paddingTop: px2dp(10), paddingBottom: px2dp(10), }}>
                <Text
                    style={{ fontSize: FONT_SIZE(11), fontWeight: '600', color: '#464646', paddingLeft: px2dp(32), paddingRight: px2dp(32) }}
                    numberOfLines={1}
                >
                    {data.item.attributes.titles.ja_jp}
                </Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
    },

});

const mapStateToProps = (state) => {
    const { animeList, isLoading, isRefresh, isLoadingMore } = state.HomeReducers;
    return {
        animeList,
        isLoading,
        isRefresh,
        isLoadingMore
    };
}

export default connect(mapStateToProps)(Home);

