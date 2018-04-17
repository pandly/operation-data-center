import { fetchConsumableData } from '../services/api';

export default {
  namespace: 'consumable',

  state: {
    diffDepartSupplyIncomeModule: [], //不同科室运行病历按时完成率
    loading: false
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetchConsumableData, payload);
      yield put({
        type: 'save',
        payload: response.result,
      });
    },
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
        diffDepartSupplyIncomeModule: [] //不同科室运行病历按时完成率
      };
    },
  },
};
