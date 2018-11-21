'use strict';
import * as types from './../configs/actionType';
const initialState = {
    isLoading: true,
    isRefresh: false,
    isLoadingMore: false,
    animeList: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOADING_ANIME_LIST:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                isRefresh: action.isRefresh,
                isLoadingMore: action.isLoadingMore,
            });

        case types.GET_ANIME_LIST:
            return Object.assign({}, state, {
                isLoading: false,
                isRefresh: false,
                animeList: state.isLoadingMore ? state.animeList.concat(action.animeList) : action.animeList
            });

        default:
            return state;
    }
}