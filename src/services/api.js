import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}
//区分开发环境和正式环境
const baseUrl = process.env.NODE_ENV === 'development' ? '/api/' : 'http://odc.xinhua.com/'
//开发环境又分真实数据和mock数据
export async function fetchDynamicData({beginDate, endDate}) {
  // return request(`${baseUrl}today_dynamic_info?beginDate=${beginDate}&endDate=${endDate}`);
  return request(`${baseUrl}today_dynamic_info?beginDate=${beginDate}&endDate=${endDate}`)
}

export async function fetchPrescriptionData({beginDate, endDate}) {
  return request(`${baseUrl}tcm_prescription_info?beginDate=${beginDate}&endDate=${endDate}`);
  // return request('/api/fake_chart_data')
}

export async function fetchNonDrugData({beginDate, endDate}) {
  return request(`${baseUrl}non_drug_info?beginDate=${beginDate}&endDate=${endDate}`);
  // return request('/api/fake_chart_data')
}

export async function fetchInpatientData({beginDate, endDate}) {
  return request(`${baseUrl}in_out_hospital?beginDate=${beginDate}&endDate=${endDate}`);
  // return request('/api/fake_chart_data')
}

export async function fetchClinicData({beginDate, endDate}) {
  return request(`${baseUrl}total_outemer_info?beginDate=${beginDate}&endDate=${endDate}`);
  // return request('/api/fake_chart_data')
}

export async function fetchIncomeData({beginDate, endDate}) {
  return request(`${baseUrl}income?beginDate=${beginDate}&endDate=${endDate}`);
  // return request('/api/fake_chart_data')
}

export async function fetchConsumableData({beginDate, endDate}) {
  return request(`${baseUrl}consumable_info?beginDate=${beginDate}&endDate=${endDate}`);
  // return request('/api/fake_chart_data')
}

export async function fetchAppointmentData({beginDate, endDate}) {
  return request(`${baseUrl}reservation_info?beginDate=${beginDate}&endDate=${endDate}`);
  // return request('/api/fake_chart_data')
}

export async function fetchSurgeryData({beginDate, endDate, category, level}) {
  return request(`${baseUrl}surgery_info?beginDate=${beginDate}&endDate=${endDate}&category=${category}&level=${level}`);
  // return request('/api/fake_chart_data')
}

export async function fetchBedData({beginDate, endDate}) {
  return request(`${baseUrl}bed_info?beginDate=${beginDate}&endDate=${endDate}`);
  // return request('/api/fake_chart_data')
}

export async function fetchQualityData({beginDate, endDate}) {
  return request(`${baseUrl}medical_treat_quality?beginDate=${beginDate}&endDate=${endDate}`);
  // return request('/api/fake_chart_data')
}

export async function fetchEmphasisData({beginDate, endDate}) {
  return request(`${baseUrl}data_operation_info?beginDate=${beginDate}&endDate=${endDate}`);
  // return request('/api/fake_chart_data')
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
