import { routerRedux } from 'dva/router';
import { fetchQualityData } from '../services/api';

export default {
  namespace: 'quality',

  state: {
    dailyStatisticInfoModule: [],
    diffDepartStatisticInfoModule: [],
    loading: false
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetchQualityData, payload);
      yield put({
        type: 'save',
        payload: response.result,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    clear() {
      return {
        dailyStatisticInfoModule: [],
        diffDepartStatisticInfoModule: [],
      }
    }
  },
};
