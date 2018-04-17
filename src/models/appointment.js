import { fetchAppointmentData } from '../services/api';

export default {
  namespace: 'appointment',

  state: {
    diffWayReservationRegistrationModule: [], //不同途径预约人数
    diffDepartReservationVisitsRateModule: [], //不同科室预约数量和预约就诊率
    reservationVisitsInfoModule: []
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetchAppointmentData, payload);
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
        ...payload
      } : {};
    },
    clear() {
      return {
        diffWayReservationRegistrationModule: [],
        diffDepartReservationVisitsRateModule: [],
        reservationVisitsInfoModule: []
      };
    },
  },
};
