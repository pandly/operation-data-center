import { fetchNonDrugData } from '../services/api';

export default {
  namespace: 'nonDrug',

  state: {
    diffDepartNonDrugModule: [], //不同科室非药物中治疗率
    topTenTherapyModule: [], //非药物中治最多的前十疗法、次数和环比数据
    loading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      //call function
      const response = yield call(fetchNonDrugData, payload);
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
        diffDepartNonDrugModule: [], //不同科室非药物中治疗率
        topTenTherapyModule: [], //非药物中治最多的前十疗法、次数和环比数据
      };
    },
  },
};
