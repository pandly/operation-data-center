import { fetchBedData } from '../services/api';

export default {
  namespace: 'bedspace',

  state: {
    internalSliceBedInfoModule: {}, //内科片床位使用率
    surgicalSliceBedInfoModule: {}, //外科片床位使用率
    specialSliceBedInfoModule: {}, //特殊科室片区床位使用率
    diffSickBlockInfoModule: [],
    highestTurnoverTopTenModule: [],
    lowestTurnoverTopTenModule: []
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetchBedData, payload);
      yield put({
        type: 'save',
        payload: response.result
      })
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
        internalSliceBedInfoModule: {}, //内科片床位使用率
        surgicalSliceBedInfoModule: {}, //外科片床位使用率
        specialSliceBedInfoModule: {}, //特殊科室片区床位使用率
        diffSickBlockInfoModule: [],
        highestTurnoverTopTenModule: [],
        lowestTurnoverTopTenModule: []
      }
    }
  },
};
