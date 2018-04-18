export function computeDays(startDate, endDate) {
  const startDateObj = new Date(startDate.replace(/-/g, "/"));
  const endDateObj = new Date(endDate.replace(/-/g, "/"));
  const time = endDateObj.getTime() - startDateObj.getTime();
  const days = parseInt(time / (1000 * 60 * 60 * 24));
  return days;
};

const emphasis_monthly = {
	result: {
	    "supplyModule": [
	      {
	        "materialRate": 0.1475,
	        "materialRateLastMonth": 0.1325,
	        "materialRateLastYear": 0.1567,
	        "name": "耗材收入占比"
	      },
	      {
	        "materialRate": 0.0046,
	        "materialRateLastMonth": 0.0054,
	        "materialRateLastYear": 0.0049,
	        "name": "高值耗材成本"
	      }
	    ],
	    "medicalQuantityModule": 0.68,
	    "surgeryModule": {
	      "specialSurgeryCount": 5,
	      "emerSurgeryCount": 65,
	      "fourTypeSurgeryCount": 116,
	      "checkOperationCount": 1,
	      "oneTypeSurgeryRate": 0.2991,
	      "emerSurgeryCountMom": 0.25,
	      "oneTypeSurgeryCount": 131,
	      "twoTypeSurgeryRate": 0.1712,
	      "twoTypeSurgeryCount": 75,
	      "threeTypeSurgeryCount": 92,
	      "treatmentOperationCount": 18,
	      "treatmentOperationRate": 0.0411,
	      "electiveSurgeryCount": 373,
	      "threeTypeSurgeryRate": 0.21,
	      "specialSurgeryRate": 0.0114,
	      "fourTypeSurgeryRate": 0.2648,
	      "electiveSurgeryCountMom": 0.8107,
	      "checkOperationRate": 0.0023
	    },
	    "bedModule": {
	      "turnoverRate": 2.1853,
	      "turnoverRateMom": 0.4372
	    },
	    "medicalTechnologyModule": [
	      {
	        "medicalTechName": "血透检查",
	        "medicalTechType": "CR",
	        "medicalTechCount": 0,
	        "medicalTechCountMom": null
	      },
	      {
	        "medicalTechName": "CT检查",
	        "medicalTechType": "CT",
	        "medicalTechCount": 5207,
	        "medicalTechCountMom": 0.2651
	      },
	      {
	        "medicalTechName": "DR检查",
	        "medicalTechType": "DR",
	        "medicalTechCount": 5448,
	        "medicalTechCountMom": 0.7535
	      },
	      {
	        "medicalTechName": "心电图",
	        "medicalTechType": "ECG",
	        "medicalTechCount": 2900,
	        "medicalTechCountMom": 0.5191
	      },
	      {
	        "medicalTechName": "内镜检查",
	        "medicalTechType": "ES",
	        "medicalTechCount": 473,
	        "medicalTechCountMom": 1.0128
	      },
	      {
	        "medicalTechName": "乳腺检查",
	        "medicalTechType": "MG",
	        "medicalTechCount": 44,
	        "medicalTechCountMom": 1.9333
	      },
	      {
	        "medicalTechName": "MR检查",
	        "medicalTechType": "MR",
	        "medicalTechCount": 1733,
	        "medicalTechCountMom": 0.7576
	      },
	      {
	        "medicalTechName": "数字肠胃检查",
	        "medicalTechType": "RF",
	        "medicalTechCount": 146,
	        "medicalTechCountMom": 1.9796
	      },
	      {
	        "medicalTechName": "超声",
	        "medicalTechType": "US",
	        "medicalTechCount": 7478,
	        "medicalTechCountMom": 0.7338
	      },
	      {
	        "medicalTechName": "介入治疗检查",
	        "medicalTechType": "XA",
	        "medicalTechCount": 76,
	        "medicalTechCountMom": 0.8537
	      }
	    ],
	    "reservationModule": {
	      "reservationCountMom": 0.1071,
	      "visitRate": 0.9651,
	      "visitCount": 2573,
	      "visitCountMom": 0.1071,
	      "reservationCount": 2666
	    }
	}
}
const emphasis_daily = {
	"result": {
	    "supplyModule": [
	      {
	        "materialRate": 0.1571,
	        "name": "耗材收入占比"
	      },
	      {
	        "materialRate": 0.0059,
	        "name": "高值耗材成本"
	      }
	    ],
	    "medicalQuantityModule": {
	      "completeMedicalRecordsRate": 0.392
	    },
	    "surgeryModule": {
	      "specialSurgeryCount": 1,
	      "emerSurgeryCount": 30,
	      "fourTypeSurgeryCount": 58,
	      "checkOperationCount": 1,
	      "oneTypeSurgeryRate": 0.3239,
	      "oneTypeSurgeryCount": 69,
	      "twoTypeSurgeryRate": 0.1315,
	      "twoTypeSurgeryCount": 28,
	      "threeTypeSurgeryCount": 48,
	      "treatmentOperationCount": 8,
	      "treatmentOperationRate": 0.0376,
	      "electiveSurgeryCount": 183,
	      "threeTypeSurgeryRate": 0.2254,
	      "specialSurgeryRate": 0.0047,
	      "fourTypeSurgeryRate": 0.2723,
	      "checkOperationRate": 0.0047
	    },
	    "bedModule": {
	      "totalBedCount": 11494,
	      "otherBedCount": 11138,
	      "citicalBedCount": 264,
	      "emergencyBedCount": 204
	    },
	    "medicalTechnologyModule": [
	      {
	        "medicalTechName": "血透检查",
	        "medicalTechType": "CR",
	        "medicalTechCount": 0
	      },
	      {
	        "medicalTechName": "CT检查",
	        "medicalTechType": "CT",
	        "medicalTechCount": 2451
	      },
	      {
	        "medicalTechName": "DR检查",
	        "medicalTechType": "DR",
	        "medicalTechCount": 2472
	      },
	      {
	        "medicalTechName": "心电图",
	        "medicalTechType": "ECG",
	        "medicalTechCount": 1354
	      },
	      {
	        "medicalTechName": "内镜检查",
	        "medicalTechType": "ES",
	        "medicalTechCount": 205
	      },
	      {
	        "medicalTechName": "乳腺检查",
	        "medicalTechType": "MG",
	        "medicalTechCount": 23
	      },
	      {
	        "medicalTechName": "MR检查",
	        "medicalTechType": "MR",
	        "medicalTechCount": 764
	      },
	      {
	        "medicalTechName": "数字肠胃检查",
	        "medicalTechType": "RF",
	        "medicalTechCount": 58
	      },
	      {
	        "medicalTechName": "超声",
	        "medicalTechType": "US",
	        "medicalTechCount": 3411
	      },
	      {
	        "medicalTechName": "介入治疗检查",
	        "medicalTechType": "XA",
	        "medicalTechCount": 45
	      }
	    ],
	    "reservationModule": {
	      "visitRate": 0.9651,
	      "visitCount": 1162,
	      "reservationCount": 1204
	    }
	}
}

export function getMockEmphasis(req, res, u) {
  let result = {};
  console.log(req.query)
  result = computeDays(req.query.beginDate, req.query.endDate) >= 14 ? emphasis_monthly : emphasis_daily;
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getMockEmphasis,
};

