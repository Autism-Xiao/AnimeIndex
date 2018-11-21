'use strict';
import * as types from './../configs/actionType';
import { BASE_URL, ANIME_URL } from './../configs/api';

export const fetchAnmineInfo = (itemId, isLoading) => {
    return (dispatch) => {
        dispatch(fetchAmineInfoLoading(isLoading));
        let url = BASE_URL + ANIME_URL + '/' + itemId;
        Fetch.getJSON(url, {}, (res) => {
            const data = res.data;
            dispatch(getInitListitemAction(data));
        }, (error) => {
            console.log(error);
        });
    }
}

export const fetchAmineInfoLoading = (isLoading) => {
    return {
        type: types.LOADING_ANIME_INFO,
        isLoading: isLoading,
    }
}

export const getInitListitemAction = (data) => {
    return {
        type: types.GET_ANIME_INFO,
        bgImg: data.attributes.coverImage.original,
        posterImg: data.attributes.posterImage.small,
        titles: data.attributes.titles.ja_jp,
        startDate: data.attributes.startDate,
        en_jp: data.attributes.titles.en_jp,
        ja_jp: data.attributes.titles.ja_jp,
        showType: data.attributes.showType,
        status: data.attributes.status,
        synopsis: data.attributes.synopsis,
    }
}


export const removeInitListitemAction = () => {
    return {
        type: types.EMPTY_ANIME_INFO,
        bgImg: '',
        posterImg: '',
        titles: '',
        startDate: '',
        en_jp: '',
        ja_jp: '',
        showType: '',
        status: '',
        synopsis: '',
    }
}