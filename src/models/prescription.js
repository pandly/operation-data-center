import { fetchPrescriptionData } from '../services/api';

export default {
  namespace: 'prescription',

  state: {
    departmentPrescriptionInfo: [], //不同科室所开处方数量
    prescriptionSingleStatisticMonthInfo: [], //处方单向统计
    loading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      //call function
      const response = yield call(fetchPrescriptionData, payload);
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
        departmentPrescriptionInfo: [], //不同科室所开处方数量
        prescriptionSingleStatisticMonthInfo: [], //处方单向统计
      };
    },
  },
};
