'use strict';
import * as types from './../configs/actionType';
const initialState = {
    isLoading: true,
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

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOADING_ANIME_INFO:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });

        case types.GET_ANIME_INFO:
            return Object.assign({}, state, {
                isLoading: false,
                bgImg: action.bgImg,
                posterImg: action.posterImg,
                titles: action.titles,
                startDate: action.startDate,
                en_jp: action.en_jp,
                ja_jp: action.ja_jp,
                showType: action.showType,
                status: action.status,
                synopsis: action.synopsis,
            });

        case types.EMPTY_ANIME_INFO:
            return Object.assign({}, state, {
                bgImg: '',
                posterImg: '',
                titles: '',
                startDate: '',
                en_jp: '',
                ja_jp: '',
                showType: '',
                status: '',
                synopsis: '',
            });

        default:
            return state;
    }
}