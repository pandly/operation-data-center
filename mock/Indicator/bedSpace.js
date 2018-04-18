export function computeDays(startDate, endDate) {
  const startDateObj = new Date(startDate.replace(/-/g, "/"));
  const endDateObj = new Date(endDate.replace(/-/g, "/"));
  const time = endDateObj.getTime() - startDateObj.getTime();
  const days = parseInt(time / (1000 * 60 * 60 * 24));
  return days;
};

const bedSpace_daily = {
	"result": {
	    "internalSliceBedInfoModule": {
	      "approvedBedCount": 5054,
	      "useBedCount": 342,
	      "bedUsedRate": 0.0677,
	      "diffSickBlockBedUsedInfo": [
	        {
	          "wardBedUsedRate": 0,
	          "wardName": "十五病区"
	        },
	        {
	          "wardBedUsedRate": 0.0643,
	          "wardName": "ICU病区"
	        },
	        {
	          "wardBedUsedRate": 0.0689,
	          "wardName": "十三病区"
	        },
	        {
	          "wardBedUsedRate": 0.0593,
	          "wardName": "十八病区"
	        },
	        {
	          "wardBedUsedRate": 0.0612,
	          "wardName": "六病区"
	        },
	        {
	          "wardBedUsedRate": 0.0691,
	          "wardName": "十四病区"
	        },
	        {
	          "wardBedUsedRate": 0.0637,
	          "wardName": "十六病区"
	        }
	      ]
	    },
	    "surgicalSliceBedInfoModule": {
	      "approvedBedCount": 6846,
	      "useBedCount": 442,
	      "bedUsedRate": 0.0646,
	      "diffSickBlockBedUsedInfo": [
	        {
	          "wardBedUsedRate": 0.105,
	          "wardName": "五病区"
	        },
	        {
	          "wardBedUsedRate": 0.044,
	          "wardName": "七病区"
	        },
	        {
	          "wardBedUsedRate": 0.0836,
	          "wardName": "十病区"
	        },
	        {
	          "wardBedUsedRate": 0.0578,
	          "wardName": "十七病区"
	        },
	        {
	          "wardBedUsedRate": 0.0538,
	          "wardName": "十一病区"
	        },
	        {
	          "wardBedUsedRate": 0.0703,
	          "wardName": "十二病区"
	        },
	        {
	          "wardBedUsedRate": 0.0472,
	          "wardName": "九病区"
	        },
	        {
	          "wardBedUsedRate": 0.0659,
	          "wardName": "八病区"
	        }
	      ]
	    },
	    "specialSliceBedInfoModule": {
	      "approvedBedCount": 714,
	      "useBedCount": 99,
	      "bedUsedRate": 0.1387,
	      "diffSickBlockBedUsedInfo": [
	        {
	          "wardBedUsedRate": 0.4557,
	          "wardName": "二病区"
	        },
	        {
	          "wardBedUsedRate": 0.1857,
	          "wardName": "血透病区"
	        },
	        {
	          "wardBedUsedRate": 0,
	          "wardName": "感染病区"
	        },
	        {
	          "wardBedUsedRate": 0.1816,
	          "wardName": "脑外重症病区"
	        },
	        {
	          "wardBedUsedRate": 0.0816,
	          "wardName": "急诊病区"
	        },
	        {
	          "wardBedUsedRate": 0.0661,
	          "wardName": "十九病区"
	        }
	      ]
	    },
	    "diffSickBlockInfoModule": null,
	    "highestTurnoverTopTenModule": null,
	    "lowestTurnoverTopTenModule": null
	}
}
const bedSpace_monthly = {
	"result": {
	    "internalSliceBedInfoModule": null,
	    "surgicalSliceBedInfoModule": null,
	    "specialSliceBedInfoModule": null,
	    "diffSickBlockInfoModule": [
	      {
	        "wardName": "ICU病区",
	        "areaName": "内科片",
	        "turnoverRate": 0.67,
	        "turnoverRateMom": 0.09
	      },
	      {
	        "wardName": "六病区",
	        "areaName": "内科片",
	        "turnoverRate": 1.37,
	        "turnoverRateMom": 0.08
	      },
	      {
	        "wardName": "十三病区",
	        "areaName": "内科片",
	        "turnoverRate": 1.67,
	        "turnoverRateMom": 0.36
	      },
	      {
	        "wardName": "十五病区",
	        "areaName": "内科片",
	        "turnoverRate": 1.58,
	        "turnoverRateMom": 0.23
	      },
	      {
	        "wardName": "十八病区",
	        "areaName": "内科片",
	        "turnoverRate": 1.77,
	        "turnoverRateMom": 0.28
	      },
	      {
	        "wardName": "十六病区",
	        "areaName": "内科片",
	        "turnoverRate": 2.11,
	        "turnoverRateMom": 0.7
	      },
	      {
	        "wardName": "十四病区",
	        "areaName": "内科片",
	        "turnoverRate": 2.1,
	        "turnoverRateMom": 0.22
	      },
	      {
	        "wardName": "七病区",
	        "areaName": "外科片",
	        "turnoverRate": 1.81,
	        "turnoverRateMom": 0.64
	      },
	      {
	        "wardName": "九病区",
	        "areaName": "外科片",
	        "turnoverRate": 1.98,
	        "turnoverRateMom": 0.53
	      },
	      {
	        "wardName": "五病区",
	        "areaName": "外科片",
	        "turnoverRate": 1.1,
	        "turnoverRateMom": 0.27
	      },
	      {
	        "wardName": "八病区",
	        "areaName": "外科片",
	        "turnoverRate": 2.16,
	        "turnoverRateMom": 0.73
	      },
	      {
	        "wardName": "十一病区",
	        "areaName": "外科片",
	        "turnoverRate": 1.9,
	        "turnoverRateMom": 0.41
	      },
	      {
	        "wardName": "十七病区",
	        "areaName": "外科片",
	        "turnoverRate": 1.97,
	        "turnoverRateMom": 0.28
	      },
	      {
	        "wardName": "十二病区",
	        "areaName": "外科片",
	        "turnoverRate": 2.13,
	        "turnoverRateMom": 0.63
	      },
	      {
	        "wardName": "十病区",
	        "areaName": "外科片",
	        "turnoverRate": 1.53,
	        "turnoverRateMom": 0.58
	      },
	      {
	        "wardName": "二病区",
	        "areaName": "特殊科室片",
	        "turnoverRate": 0.4,
	        "turnoverRateMom": 0.15
	      },
	      {
	        "wardName": "十九病区",
	        "areaName": "特殊科室片",
	        "turnoverRate": 0.6,
	        "turnoverRateMom": 0.1
	      },
	      {
	        "wardName": "急诊病区",
	        "areaName": "特殊科室片",
	        "turnoverRate": 0.51,
	        "turnoverRateMom": 0.09
	      },
	      {
	        "wardName": "感染病区",
	        "areaName": "特殊科室片",
	        "turnoverRate": 0.58,
	        "turnoverRateMom": -0.08
	      },
	      {
	        "wardName": "脑外重症病区",
	        "areaName": "特殊科室片",
	        "turnoverRate": 0.19,
	        "turnoverRateMom": 0.03
	      },
	      {
	        "wardName": "血透病区",
	        "areaName": "特殊科室片",
	        "turnoverRate": 0.51,
	        "turnoverRateMom": 0.07
	      }
	    ],
	    "highestTurnoverTopTenModule": [
	      {
	        "turnoverRate": 6,
	        "departName": "急诊医学科"
	      },
	      {
	        "turnoverRate": 4.8,
	        "departName": "眼科"
	      },
	      {
	        "turnoverRate": 3.5686,
	        "departName": "妇产科"
	      },
	      {
	        "turnoverRate": 3.4444,
	        "departName": "泌尿外科"
	      },
	      {
	        "turnoverRate": 2.8542,
	        "departName": "心血管内科"
	      },
	      {
	        "turnoverRate": 2.7111,
	        "departName": "呼吸内科"
	      },
	      {
	        "turnoverRate": 2.4,
	        "departName": "耳鼻喉科"
	      },
	      {
	        "turnoverRate": 2.38,
	        "departName": "骨科(创伤)"
	      },
	      {
	        "turnoverRate": 2.1739,
	        "departName": "风湿免疫科2"
	      },
	      {
	        "turnoverRate": 2.1667,
	        "departName": "内分泌科"
	      }
	    ],
	    "lowestTurnoverTopTenModule": [
	      {
	        "turnoverRate": 0,
	        "departName": "儿科"
	      },
	      {
	        "turnoverRate": 0,
	        "departName": "血透科室"
	      },
	      {
	        "turnoverRate": 0,
	        "departName": "脑外重症室"
	      },
	      {
	        "turnoverRate": 0,
	        "departName": "感染性疾病科"
	      },
	      {
	        "turnoverRate": 0,
	        "departName": "口腔科"
	      },
	      {
	        "turnoverRate": 0,
	        "departName": "针灸推拿科"
	      },
	      {
	        "turnoverRate": 0.9722,
	        "departName": "老年病科"
	      },
	      {
	        "turnoverRate": 1.1154,
	        "departName": "血液科"
	      },
	      {
	        "turnoverRate": 1.2,
	        "departName": "重症医学科"
	      },
	      {
	        "turnoverRate": 1.3,
	        "departName": "血管外科"
	      }
	    ]
	}
}

export function getMockBedSpace(req, res, u) {
  let result = {};
  console.log(req.query)
  result = computeDays(req.query.beginDate, req.query.endDate) > 14 ? bedSpace_monthly : bedSpace_daily;
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getMockBedSpace,
};