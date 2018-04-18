import { fetchEmphasisData } from '../services/api';

export default {
  namespace: 'emphasis',

  state: {
    supplyModule: [],
    medicalQuantityModule: {},
    bedModule: {},
    medicalTechnologyModule: [],
    reservationModule: {},
    surgeryModule: {}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetchEmphasisData, payload);
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
        supplyModule: [],
        medicalQuantityModule: {},
        bedModule: {},
        medicalTechnologyModule: [],
        reservationModule: {},
        surgeryModule: {}
      }
    }
  },
};
