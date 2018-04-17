import { fetchIncomeData } from '../services/api';

export default {
  namespace: 'income',

  state: {
    baseStatisticModule: [], //十项数据
    diffDepartIncomeModule: [], //不同科室的收入明细
    drugIncomeDetailsModule: {}, //药品收入明细
    nonDrugIncomeDetailsModule: [], //非药品收入明细
    loading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      //call function
      const response = yield call(fetchIncomeData, payload);
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
        baseStatisticModule: [], //十项数据
        diffDepartIncomeModule: [], //不同科室的收入明细
        drugIncomeDetailsModule: {}, //药品收入明细
        nonDrugIncomeDetailsModule: [], //非药品收入明细
      };
    },
  },
};
