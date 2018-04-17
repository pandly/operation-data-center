export function computeDays(startDate, endDate) {
  const startDateObj = new Date(startDate.replace(/-/g, "/"));
  const endDateObj = new Date(endDate.replace(/-/g, "/"));
  const time = endDateObj.getTime() - startDateObj.getTime();
  const days = parseInt(time / (1000 * 60 * 60 * 24));
  return days;
};

const quality_daily = {
	"result": {
	    "dailyStatisticInfoModule": null,
	    "diffDepartStatisticInfoModule": [
	      {
	        "departmentName": "内分泌科",
	        "completeRecordsRate": 0,
	        "totalMedicalRecords": 1,
	        "departmentCode": "501",
	        "completeMedicalRecords": 0
	      },
	      {
	        "departmentName": "呼吸内科",
	        "completeRecordsRate": 0.5,
	        "totalMedicalRecords": 6,
	        "departmentCode": "503",
	        "completeMedicalRecords": 3
	      },
	      {
	        "departmentName": "消化内科",
	        "completeRecordsRate": 1,
	        "totalMedicalRecords": 1,
	        "departmentCode": "505",
	        "completeMedicalRecords": 1
	      },
	      {
	        "departmentName": "神经外科",
	        "completeRecordsRate": 0,
	        "totalMedicalRecords": 1,
	        "departmentCode": "506",
	        "completeMedicalRecords": 0
	      },
	      {
	        "departmentName": "血管外科",
	        "completeRecordsRate": 0,
	        "totalMedicalRecords": 1,
	        "departmentCode": "507",
	        "completeMedicalRecords": 0
	      },
	      {
	        "departmentName": "血液科",
	        "completeRecordsRate": 0,
	        "totalMedicalRecords": 3,
	        "departmentCode": "508",
	        "completeMedicalRecords": 0
	      },
	      {
	        "departmentName": "老年病科",
	        "completeRecordsRate": 1,
	        "totalMedicalRecords": 1,
	        "departmentCode": "510",
	        "completeMedicalRecords": 1
	      },
	      {
	        "departmentName": "骨科(创伤)",
	        "completeRecordsRate": 0,
	        "totalMedicalRecords": 8,
	        "departmentCode": "512",
	        "completeMedicalRecords": 0,
	        "completeRecordsRateMom": null
	      },
	      {
	        "departmentName": "重症医学科",
	        "completeRecordsRate": 1,
	        "totalMedicalRecords": 3,
	        "departmentCode": "513",
	        "completeMedicalRecords": 3
	      },
	      {
	        "departmentName": "泌尿外科",
	        "completeRecordsRate": 0.25,
	        "totalMedicalRecords": 4,
	        "departmentCode": "515",
	        "completeMedicalRecords": 1
	      },
	      {
	        "departmentName": "骨科(关节)",
	        "completeRecordsRate": 0.25,
	        "totalMedicalRecords": 8,
	        "departmentCode": "516",
	        "completeMedicalRecords": 2,
	        "completeRecordsRateMom": -0.75
	      },
	      {
	        "departmentName": "胸外科、肿瘤外科",
	        "completeRecordsRate": 0.3333,
	        "totalMedicalRecords": 3,
	        "departmentCode": "519",
	        "completeMedicalRecords": 1
	      },
	      {
	        "departmentName": "风湿免疫科1",
	        "completeRecordsRate": 0,
	        "totalMedicalRecords": 1,
	        "departmentCode": "520",
	        "completeMedicalRecords": 0
	      },
	      {
	        "departmentName": "感染性疾病科",
	        "completeRecordsRate": 0.2857,
	        "totalMedicalRecords": 7,
	        "departmentCode": "525",
	        "completeMedicalRecords": 2
	      },
	      {
	        "departmentName": "肝胆外科",
	        "completeRecordsRate": 0,
	        "totalMedicalRecords": 1,
	        "departmentCode": "533",
	        "completeMedicalRecords": 0
	      },
	      {
	        "departmentName": "骨科(脊柱)",
	        "completeRecordsRate": 0,
	        "totalMedicalRecords": 5,
	        "departmentCode": "534",
	        "completeMedicalRecords": 0,
	        "completeRecordsRateMom": null
	      }
	    ]
	}
}
const quality_monthly = {
	"result": {
	    "dailyStatisticInfoModule": [
	      {
	        "name": "运行病历数",
	        "2018年03月01日": 10,
	        "2018年03月02日": 10,
	        "2018年03月03日": 11,
	        "2018年03月04日": 11,
	        "2018年03月05日": 16,
	        "2018年03月06日": 20,
	        "2018年03月07日": 21,
	        "2018年03月08日": 24,
	        "2018年03月09日": 26,
	        "2018年03月10日": 29,
	        "2018年03月11日": 33,
	        "2018年03月12日": 37,
	        "2018年03月13日": 46,
	        "2018年03月14日": 51,
	        "2018年03月15日": 52
	      },
	      {
	        "name": "按时完成病历数",
	        "2018年03月01日": 0,
	        "2018年03月02日": 0,
	        "2018年03月03日": 0,
	        "2018年03月04日": 0,
	        "2018年03月05日": 0,
	        "2018年03月06日": 0,
	        "2018年03月07日": 0,
	        "2018年03月08日": 2,
	        "2018年03月09日": 2,
	        "2018年03月10日": 2,
	        "2018年03月11日": 2,
	        "2018年03月12日": 2,
	        "2018年03月13日": 2,
	        "2018年03月14日": 2,
	        "2018年03月15日": 2
	      }
	    ],
	    "diffDepartStatisticInfoModule": [
	      {
	        "departCode": "501",
	        "completeRecordsCount": 0,
	        "totalRecordsCount": 2,
	        "departName": "内分泌科"
	      },
	      {
	        "departCode": "503",
	        "completeRecordsCount": 0,
	        "totalRecordsCount": 35,
	        "departName": "呼吸内科"
	      },
	      {
	        "departCode": "504",
	        "completeRecordsCount": 0,
	        "totalRecordsCount": 1,
	        "departName": "神经内科"
	      },
	      {
	        "departCode": "505",
	        "completeRecordsCount": 8,
	        "totalRecordsCount": 8,
	        "departName": "消化内科"
	      },
	      {
	        "departCode": "506",
	        "completeRecordsCount": 0,
	        "totalRecordsCount": 2,
	        "departName": "神经外科"
	      },
	      {
	        "departCode": "507",
	        "completeRecordsCount": 0,
	        "totalRecordsCount": 3,
	        "departName": "血管外科"
	      },
	      {
	        "departCode": "508",
	        "completeRecordsCount": 0,
	        "totalRecordsCount": 19,
	        "departName": "血液科"
	      },
	      {
	        "departCode": "510",
	        "completeRecordsCount": 0,
	        "totalRecordsCount": 3,
	        "departName": "老年病科"
	      },
	      {
	        "departCode": "512",
	        "completeRecordsCount": 0,
	        "totalRecordsCount": 80,
	        "departName": "骨科(创伤)"
	      },
	      {
	        "departCode": "513",
	        "completeRecordsCount": 8,
	        "totalRecordsCount": 16,
	        "departName": "重症医学科"
	      },
	      {
	        "departCode": "515",
	        "completeRecordsCount": 0,
	        "totalRecordsCount": 26,
	        "departName": "泌尿外科"
	      },
	      {
	        "departCode": "516",
	        "completeRecordsCount": 0,
	        "totalRecordsCount": 51,
	        "departName": "骨科(关节)"
	      },
	      {
	        "departCode": "519",
	        "completeRecordsCount": 0,
	        "totalRecordsCount": 36,
	        "departName": "胸外科、肿瘤外科"
	      },
	      {
	        "departCode": "520",
	        "completeRecordsCount": 0,
	        "totalRecordsCount": 3,
	        "departName": "风湿免疫科1"
	      },
	      {
	        "departCode": "525",
	        "completeRecordsCount": 0,
	        "totalRecordsCount": 67,
	        "departName": "感染性疾病科"
	      },
	      {
	        "departCode": "533",
	        "completeRecordsCount": 0,
	        "totalRecordsCount": 5,
	        "departName": "肝胆外科"
	      },
	      {
	        "departCode": "534",
	        "completeRecordsCount": 0,
	        "totalRecordsCount": 40,
	        "departName": "骨科(脊柱)"
	      }
	    ]
	}
}
export function getMockQuality(req, res, u) {
  let result = {};
  result = computeDays(req.query.beginDate, req.query.endDate) > 14 ? quality_monthly : quality_daily;
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getMockQuality,
};