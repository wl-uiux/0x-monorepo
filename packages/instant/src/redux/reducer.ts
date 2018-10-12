import { BuyQuote } from '@0xproject/asset-buyer';
import { BigNumber } from '@0xproject/utils';
import * as _ from 'lodash';

import { zrxAssetData } from '../constants';
import { AsyncProcessState } from '../types';

import { Action, ActionTypes } from './actions';

export interface State {
    selectedAssetData?: string;
    selectedAssetAmount?: BigNumber;
    selectedAssetBuyState: AsyncProcessState;
    ethUsdPrice?: BigNumber;
    latestBuyQuote?: BuyQuote;
}

export const INITIAL_STATE: State = {
    // TODO: Remove hardcoded zrxAssetData
    selectedAssetData: zrxAssetData,
    selectedAssetAmount: undefined,
    selectedAssetBuyState: AsyncProcessState.NONE,
    ethUsdPrice: undefined,
    latestBuyQuote: undefined,
};

export const reducer = (state: State = INITIAL_STATE, action: Action): State => {
    switch (action.type) {
        case ActionTypes.UPDATE_ETH_USD_PRICE:
            return {
                ...state,
                ethUsdPrice: action.data,
            };
        case ActionTypes.UPDATE_SELECTED_ASSET_AMOUNT:
            return {
                ...state,
                selectedAssetAmount: action.data,
            };
        case ActionTypes.UPDATE_LATEST_BUY_QUOTE:
            return {
                ...state,
                latestBuyQuote: action.data,
            };
        case ActionTypes.UPDATE_SELECTED_ASSET_BUY_STATE:
            return {
                ...state,
                selectedAssetBuyState: action.data,
            };
        default:
            return state;
    }
};
