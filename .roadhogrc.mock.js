import { delay } from 'roadhog-api-doc';
import mock_dynamic from './mock/Report/dynamic';
import mock_clinic from './mock/Report/clinic';
import mock_prescription from './mock/Report/prescription';
import mock_inpatient from './mock/Report/inpatient';
import mock_nonDrug from './mock/Report/nonDrug';
import mock_income from './mock/Report/income';

import mock_appointment from './mock/Indicator/appointment';
import { getMockBedSpace } from './mock/Indicator/bedSpace';
import mock_consumable from './mock/Indicator/consumable';
import { getMockEmphasis } from './mock/Indicator/emphasis';
import { getMockQuality } from './mock/Indicator/quality';
import { getMockSurgery } from './mock/Indicator/surgery';
// 是否禁用mock
const noProxy = process.env.NO_PROXY === 'true';
console.log('proxy:' + noProxy);
// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  'GET /api/currentUser': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: '沈浩',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  'GET /api/today_dynamic_info': mock_dynamic,
  'GET /api/total_outemer_info': mock_clinic,
  'GET /api/tcm_prescription_info': mock_prescription,
  'GET /api/non_drug_info': mock_nonDrug,
  'GET /api/in_out_hospital': mock_inpatient,
  'GET /api/income': mock_income,

  'GET /api/consumable_info': mock_consumable,
  'GET /api/reservation_info': mock_appointment,
  'GET /api/surgery_info': getMockSurgery,
  'GET /api/bed_info': getMockBedSpace,
  'GET /api/medical_treat_quality': getMockQuality,
  'GET /api/data_operation_info': getMockEmphasis,
};

export default noProxy ? {
  'GET /api/(.*)': 'http://msodc.xinhua.com/',  
} : delay(proxy, 500);
