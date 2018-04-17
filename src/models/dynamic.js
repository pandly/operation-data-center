import { fetchDynamicData } from '../services/api';

export default {
  namespace: 'dynamic',

  state: {
    patientBurdenModule: [], //患者负担
    totalEmergencyVisitsModule: {} , //总门急诊人次
    chinaPrescriptionsModule: {}, //中医处方数量
    nondrugTreatmentRateModule: {}, //非药物中治率(门诊)
    inHospitalModule: [], //在院模块
    totalIncomeModule: [], //总收入模块
    loading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      //call function
      const response = yield call(fetchDynamicData, payload);
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
        patientBurdenModule: [], //患者负担
        totalEmergencyVisitsModule: {} , //总门急诊人次
        chinaPrescriptionsModule: {}, //中医处方数量
        nondrugTreatmentRateModule: {}, //非药物中治率(门诊)
        inHospitalModule: [], //在院院模块
        totalIncomeModule: [], //总收入模块
      };
    },
  },
};
