import { fetchInpatientData } from '../services/api';

export default {
  namespace: 'inpatient',

  state: {
    diffDepartStatisticInfoModule: [], //不同科室在院人数
    dailyStatisticInfoModule: [], //本期每天入院、出院人数
    loading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      //call function
      const response = yield call(fetchInpatientData, payload);
      //dispatch reducers
      yield put({
        type: 'save',
        payload: response.result,
      });
    },
  },
  //负责修改model的数据
  reducers: {
    save(state, { payload }) {
      return payload ? {
        ...state,
        ...payload,
      } : {};
    },
    clear() {
      return {
        diffDepartStatisticInfoModule: [], //不同科室在院人数
        dailyStatisticInfoModule: [], //本期每天入院、出院人数
      };
    },
  },
};
