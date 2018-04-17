import { fetchClinicData } from '../services/api';

export default {
  namespace: 'clinic',

  state: {
    outpatientSlice: [], //门诊片
    surgricalSlice: [], //外科片
    internalSlice: [], //内科片
    otherSlice: [], //不参与考核科室的门急诊人次
    dailyOutpatientEmergencyInfo: [], //本期每天门急诊人次
    registrationStatistic: [], //不同挂号类别数量
    outpatientEmergencyStatistic: [], //门急诊单项统计
    loading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      //call function
      const response = yield call(fetchClinicData, payload);
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
        outpatientSlice: [], //外科片
        surgricalSlice: [], //门诊片
        internalSlice: [], //内科片
        otherSlice: [], //不参与考核科室的门急诊人次
        dailyOutpatientEmergencyInfo: [],
        registrationStatistic: [],
        outpatientEmergencyStatistic: []
      };
    },
  },
};
