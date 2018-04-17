const mock_dynamic = {
  "result": {
  	//总门急诊人次
    "totalEmergencyVisitsModule": {
      "totalEmergencyVisitsMom": 0.1653,
      "totalEmergencyVisits": 52553,
      "totalEmergencyVisitsYoy": -0.1404
    },
    //中医处方数量
    "chinaPrescriptionsModule": {
      "chinaPrescriptionsMom": 0.338,
      "chinaPrescriptions": 19897,
      "chinaPrescriptionsYoy": 0.069
    },
    //非药物中治率(门诊)
    "nondrugTreatmentRateModule": {
      "nondrugTreatmentRate": 0.0321,
      "nondrugTreatmentRateYoy": 0.0073,
      "nondrugTreatmentRateMom": 0.006
    },
    //住院
    "inHospitalModule": [
      {
        "recover": 1968,
        "recoverYoy": 0.105,
        "recoverMom": 0.2495
      },
      {
        "admissionsYoy": 0.1275,
        "admissions": 1972,
        "admissionsMom": 0.3406
      },
      {
        "inHospitalMom": 0.2862,
        "inHospital": 25772,
        "inHospitalYoy": -0.0103
      }
    ],
    //总收入
    "totalIncomeModule": [
      {
        "inHospitalIncome": 37621717.1,
        "inHospitalIncomeMom": 0.3073,
        "inHospitalIncomeYoy": 0.1069
      },
      {
        "drugIncomeMom": 0.2381,
        "drugIncomeYoy": 0.0855,
        "drugIncome": 23913973.43
      },
      {
        "outpatientEmergencyIncomeYoy": 0.0312,
        "outpatientEmergencyIncomeMom": 0.3109,
        "outpatientEmergencyIncome": 16997740.74
      },
      {
        "totalIncome": 54619457.84,
        "totalIncomeMom": 0.3084,
        "totalIncomeYoy": 0.0822
      },
      {
        "nonDrugIncomeYoy": 0.0796,
        "nonDrugIncomeMom": 0.369,
        "nonDrugIncome": 30705484.41
      }
    ],
    //患者负担
    "patientBurdenModule": [
      {
        "perOutpatientTreatFees": 73.76,
        "perOutpatientTreatFeesYoy": 0.074,
        "perOutpatientTreatFeesMom": 0.0186
      },
      {
        "perMedicalExaminationFeesMom": -0.6146,
        "perMedicalExaminationFees": 52.91,
        "perMedicalExaminationFeesYoy": -0.5761
      },
      {
        "perPrescriptionFeesMom": -0.0065,
        "perPrescriptionFees": 202.14,
        "perPrescriptionFeesYoy": -0.0044
      },
      {
        "perDaysOfRecoverYoy": -0.104,
        "perDaysOfRecover": 13.1,
        "perDaysOfRecoverMom": 0.0299
      },
      {
        "perRecoverDrugFeesYoy": -0.0816,
        "perRecoverDrugFees": 17930.96,
        "perRecoverDrugFeesMom": -0.0794
      },
      {
        "perOutpatientEmergencyFeesYoy": 0.1996,
        "perOutpatientEmergencyFees": 323.44,
        "perOutpatientEmergencyFeesMom": 0.125
      },
      {
        "perOutpatientDrugFeesYoy": 0.0538,
        "perOutpatientDrugFees": 195.81,
        "perOutpatientDrugFeesMom": -0.0884
      },
      {
        "perInHospitalFeesMom": -0.1094,
        "perInHospitalFeesYoy": -0.0672,
        "perInHospitalFees": 6424.63
      }
    ]
  }
}

export default mock_dynamic;