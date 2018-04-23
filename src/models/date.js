import { getDate, computeDays, getRangePickerValue } from '../utils/utils';

const date = JSON.parse(sessionStorage.getItem('date'));

const reportBeginDate = date ? date.report.beginDate : getDate(new Date().getTime()-24*60*60*1000);
const reportEndDate = date ? date.report.endDate : getDate(new Date().getTime()-24*60*60*1000);

const indicatorBeginDate = date ? date.indicator.beginDate : getDate(new Date().getTime()-24*60*60*1000);
const indicatorEndDate = date ? date.indicator.endDate : getDate(new Date().getTime()-24*60*60*1000);

export default {
	namespace: 'date',

	state: {
		report: {
			beginDate: reportBeginDate,
			endDate: reportEndDate,
			rangePickerValue: getRangePickerValue(reportBeginDate, reportEndDate),
			rangeDateType: computeDays(reportBeginDate, reportEndDate) < 14 ? 'daily' : 'monthly',
			rangeDate: computeDays(reportBeginDate, reportEndDate) + 1,
			isOneDay: computeDays(reportBeginDate, reportEndDate) === 0
		},
		indicator: {
			beginDate: indicatorBeginDate,
			endDate: indicatorEndDate,
			rangePickerValue: getRangePickerValue(indicatorBeginDate, indicatorEndDate),
			rangeDateType: computeDays(indicatorBeginDate, indicatorEndDate) < 14 ? 'daily' : 'monthly',
			rangeDate: computeDays(indicatorBeginDate, indicatorEndDate) + 1,
			isOneDay: computeDays(indicatorBeginDate, indicatorEndDate) === 0
		}
	},

	reducers: {
		//第二个参数为dispatch的对象
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