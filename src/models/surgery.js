import { fetchSurgeryData } from '../services/api';

export default {
  namespace: 'surgery',

  state: {
    diffCategorySurgeryModule: [],
    diffLevelSurgeryModule: [],
    loading: false
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetchSurgeryData, payload);
      yield put({
        type: 'save',
        payload: response.result,
      });
    }
  },

  reducers: {
    save(state, { payload }) {
      return payload ? {
        ...state,
        ...payload,
      } : {};
    },
    clear() {
      return {
        diffCategorySurgeryModule: [],
        diffLevelSurgeryModule: []
      };
    },
  },
};
