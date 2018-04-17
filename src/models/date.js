import { getDate } from '../utils/utils';

const date = JSON.parse(sessionStorage.getItem('date'));

export default {
	namespace: 'date',

	state: {
		report: {
			beginDate: date ? date.report.beginDate : getDate(new Date().getTime()-24*60*60*1000),
			endDate: date ? date.report.endDate : getDate(new Date().getTime()-24*60*60*1000)
		},
		indicator: {
			beginDate: date ? date.indicator.beginDate : getDate(new Date().getTime()-24*60*60*1000),
			endDate: date ? date.indicator.endDate : getDate(new Date().getTime()-24*60*60*1000)
		}
	},

	reducers: {
		update(state, { payload }) {
			sessionStorage.setItem('date', JSON.stringify({ 
				...state,
        		...payload, 
			}));
			return {
				...state,
				...payload
			}
		}
	}
}