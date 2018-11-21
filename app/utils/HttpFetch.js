'use strict';
import React, {Component} from 'react';
// import React from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';

/**
 * 网络请求工具类
 *
 */
class HttpFetch {
    /**
     * GET 请求，获取 JSON 数据。
     *
     * 使用方法：
     * HttpFetchUtils.getJSON(url, {'name': ''}, (data) => {
     * // do something
     * }, (error) => {
     * // do something
     * });
     *
     * @param {String} url 请求地址
     * @param {JSON} params 请求参数，格式：{param1: 'value1',param2: 'value2'}
     * @param {Function} callback 回调函数
     * @param {Function=} errorCallback 异常回调函数
     */
    static getJSON(url, params, callback, errorCallback) {
        if (params) {
            let paramsKeyArray = Object.keys(params);
            if (paramsKeyArray.length > 0) {
                let paramsArray = [];
                //拼接参数
                paramsKeyArray.forEach(key => paramsArray.push(key + '=' + params[key]));
                if (url.search(/\?/) === -1) {
                    url += '?' + paramsArray.join('&');
                } else {
                    url += '&' + paramsArray.join('&');
                }
            }
        }

        //fetch请求
        fetch(url, {
            method: 'GET',
        }).then(
            (response) => response.json()
        ).then((response) => {
            callback(response);
        }).catch((error) => {
            if (errorCallback) {
                errorCallback(error);
            } else {
                console.log("error = " + error);
            }
        });
    }

    /**
     * POST 请求，发送 JSON 数据。
     *
     * 使用方法：
     * HttpFetchUtils.postJSON(url, {'name': ''}, (data) => {
     * // do something
     * }, (error) => {
     * // do something
     * });
     *
     * @param {String} url 请求地址
     * @param {JSON} params 请求参数，格式：{param1: 'value1',param2: 'value2'}
     * @param {Function} callback 回调函数
     * @param {Function=} errorCallback 异常回调函数
     */
    static postJSON(url, params, callback, errorCallback) {
        //fetch请求
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        }).then(
            (response) => response.json()
        ).then((responseJSON) => {
            callback(responseJSON)
        }).catch((error) => {
            if (errorCallback) {
                errorCallback(error);
            } else {
                console.log("error = " + error);
            }
        });
    }

    /**
     * POST 请求，发送 Form 数据。
     *
     * 使用方法：
     * HttpFetchUtils.postForm(url, {'name': ''}, (data) => {
     * // do something
     * }, (error) => {
     * // do something
     * });
     *
     * @param url 请求地址
     * @param params 请求参数，格式：'key1=value1&key2=value2'
     * @param callback 回调函数
     * @param errorCallback 异常回调函数
     */
    static postForm(url, params, callback, errorCallback) {
        //fetch请求
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        }).then(
            (response) => response.json()
        ).then((responseJSON) => {
            callback(responseJSON)
        }).catch((error) => {
            if (errorCallback) {
                errorCallback(error);
            } else {
                console.log("error = " + error);
            }
        });
    }

}

export default HttpFetch;