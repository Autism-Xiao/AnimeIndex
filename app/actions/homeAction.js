'use strict';
import * as types from './../configs/actionType';
import { BASE_URL, ANIME_URL } from './../configs/api';

export const fetchAnmine = (isLoading, isRefresh, isLoadingMore, params) => {
    return (dispatch) => {
        dispatch(fetchAmineListLoading(isLoading, isRefresh, isLoadingMore));
        let url = BASE_URL + ANIME_URL;
        Fetch.getJSON(url, params, (res) => {
            const data = res.data;
            dispatch(getInitListAction(data));
        }, (error) => {
            console.log(error);
            dispatch(getInitListAction([]));
        });
    }
}

export const fetchAmineListLoading = (isLoading, isRefresh, isLoadingMore) => {
    return {
        type: types.LOADING_ANIME_LIST,
        isLoading: isLoading,
        isRefresh: isRefresh,
        isLoadingMore: isLoadingMore,
    }
}

export const getInitListAction = (data) => {
    return {
        type: types.GET_ANIME_LIST,
        animeList: data
    }
}