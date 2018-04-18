export function computeDays(startDate, endDate) {
  const startDateObj = new Date(startDate.replace(/-/g, "/"));
  const endDateObj = new Date(endDate.replace(/-/g, "/"));
  const time = endDateObj.getTime() - startDateObj.getTime();
  const days = parseInt(time / (1000 * 60 * 60 * 24));
  return days;
};

const surgery_daily = {
	"result": {
	    "diffCategorySurgeryModule": [
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "31549",
	        "surgeryLevel": 1,
	        "departCode": "505",
	        "surgeryName": "淋巴活组织检查",
	        "departName": "消化内科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "31550",
	        "surgeryLevel": 1,
	        "departCode": "505",
	        "surgeryName": "颈部淋巴结活检",
	        "departName": "消化内科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "30036",
	        "surgeryLevel": 3,
	        "departCode": "506",
	        "surgeryName": "钻孔硬脑膜下积液引流",
	        "departName": "神经外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "30037",
	        "surgeryLevel": 3,
	        "departCode": "506",
	        "surgeryName": "硬脑膜下血肿钻孔引流术",
	        "departName": "神经外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "30070",
	        "surgeryLevel": 3,
	        "departCode": "506",
	        "surgeryName": "颅骨修补（正）术NOS",
	        "departName": "神经外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "32950",
	        "surgeryLevel": 1,
	        "departCode": "506",
	        "surgeryName": "下颌骨骨折闭合性复位术",
	        "departName": "神经外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "32952",
	        "surgeryLevel": 3,
	        "departCode": "506",
	        "surgeryName": "下颌骨骨折开放性复位术",
	        "departName": "神经外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34924",
	        "surgeryLevel": 1,
	        "departCode": "506",
	        "surgeryName": "体表肿块切除术",
	        "departName": "神经外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "36827",
	        "surgeryLevel": 3,
	        "departCode": "506",
	        "surgeryName": "鞍区占位病变切除术",
	        "departName": "神经外科"
	      },
	      {
	        "surgeryCount": 3,
	        "surgeryCode": "31404",
	        "surgeryLevel": 4,
	        "departCode": "507",
	        "surgeryName": "曲张静脉结扎术",
	        "departName": "血管外科"
	      },
	      {
	        "surgeryCount": 5,
	        "surgeryCode": "31416",
	        "surgeryCountMom": 4,
	        "surgeryLevel": 1,
	        "departCode": "507",
	        "surgeryName": "大隐静脉高位结扎剥脱术",
	        "departName": "血管外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "33954",
	        "surgeryLevel": 1,
	        "departCode": "507",
	        "surgeryName": "腹主动脉造影术",
	        "departName": "血管外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "30405",
	        "surgeryLevel": 1,
	        "departCode": "511",
	        "surgeryName": "结膜病损切除术",
	        "departName": "眼科"
	      },
	      {
	        "surgeryCount": 9,
	        "surgeryCode": "30567",
	        "surgeryCountMom": 8,
	        "surgeryLevel": 4,
	        "departCode": "511",
	        "surgeryName": "人工晶体植入加超声乳化",
	        "departName": "眼科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "35022",
	        "surgeryLevel": 1,
	        "departCode": "511",
	        "surgeryName": "共同性斜视矫正术",
	        "departName": "眼科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "36497",
	        "surgeryLevel": 1,
	        "departCode": "511",
	        "surgeryName": "眼睑肉赘切除术",
	        "departName": "眼科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "36869",
	        "surgeryCountMom": 1,
	        "surgeryLevel": 2,
	        "departCode": "511",
	        "surgeryName": "翼状胬肉切除术伴组织细胞移植术",
	        "departName": "眼科"
	      },
	      {
	        "surgeryCount": 5,
	        "surgeryCode": "33259",
	        "surgeryCountMom": 4,
	        "surgeryLevel": 3,
	        "departCode": "512",
	        "surgeryName": "肱骨骨折开放性复位术伴固定术",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 3,
	        "surgeryCode": "33270",
	        "surgeryLevel": 3,
	        "departCode": "512",
	        "surgeryName": "股骨骨折开放性复位术伴固定术",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 3,
	        "surgeryCode": "33271",
	        "surgeryCountMom": 2,
	        "surgeryLevel": 2,
	        "departCode": "512",
	        "surgeryName": "胫骨骨折开放性复位术伴固定术",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33272",
	        "surgeryCountMom": 0,
	        "surgeryLevel": 2,
	        "departCode": "512",
	        "surgeryName": "腓骨骨折开放性复位术伴固定术",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "33278",
	        "surgeryLevel": 2,
	        "departCode": "512",
	        "surgeryName": "髌骨骨折开放性复位术伴固定术",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "33281",
	        "surgeryCountMom": 1,
	        "surgeryLevel": 2,
	        "departCode": "512",
	        "surgeryName": "锁骨骨折开放性复位术伴内固定术",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33371",
	        "surgeryLevel": 3,
	        "departCode": "512",
	        "surgeryName": "踝关节切开术",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33632",
	        "surgeryLevel": 1,
	        "departCode": "512",
	        "surgeryName": "腱鞘囊肿切除术",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34308",
	        "surgeryLevel": 1,
	        "departCode": "512",
	        "surgeryName": "异物取出  ＮＯＳ",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 10,
	        "surgeryCode": "34565",
	        "surgeryCountMom": 0.25,
	        "surgeryLevel": 4,
	        "departCode": "512",
	        "surgeryName": "椎体成形术",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34653",
	        "surgeryLevel": 1,
	        "departCode": "512",
	        "surgeryName": "趾关节离断术",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "34889",
	        "surgeryLevel": 1,
	        "departCode": "512",
	        "surgeryName": "去除锁骨内固定装置",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34892",
	        "surgeryLevel": 1,
	        "departCode": "512",
	        "surgeryName": "去除桡骨内固定装置",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34897",
	        "surgeryLevel": 1,
	        "departCode": "512",
	        "surgeryName": "去除髌骨内固定装置",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 5,
	        "surgeryCode": "34898",
	        "surgeryLevel": 1,
	        "departCode": "512",
	        "surgeryName": "去除胫骨内固定装置",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "34899",
	        "surgeryLevel": 1,
	        "departCode": "512",
	        "surgeryName": "去除腓骨内固定装置",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "34910",
	        "surgeryCountMom": -0.6,
	        "surgeryLevel": 3,
	        "departCode": "512",
	        "surgeryName": "股骨粗隆骨折切开复位伴内固定术",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33975",
	        "surgeryLevel": 1,
	        "departCode": "513",
	        "surgeryName": "冠状动脉造影术  ＮＯＳ",
	        "departName": "重症医学科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34865",
	        "surgeryLevel": 3,
	        "departCode": "514",
	        "surgeryName": "直肠粘膜环切术",
	        "departName": "肛肠外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34924",
	        "surgeryLevel": 1,
	        "departCode": "514",
	        "surgeryName": "体表肿块切除术",
	        "departName": "肛肠外科"
	      },
	      {
	        "surgeryCount": 5,
	        "surgeryCode": "36925",
	        "surgeryLevel": 1,
	        "departCode": "514",
	        "surgeryName": "肛周痔切除术",
	        "departName": "肛肠外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "32276",
	        "surgeryCountMom": -0.5,
	        "surgeryLevel": 4,
	        "departCode": "515",
	        "surgeryName": "经输尿管镜输尿管取石术",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "32278",
	        "surgeryCountMom": 0,
	        "surgeryLevel": 2,
	        "departCode": "515",
	        "surgeryName": "输尿管探查术",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 3,
	        "surgeryCode": "32339",
	        "surgeryLevel": 3,
	        "departCode": "515",
	        "surgeryName": "经尿道膀胱肿瘤切除术(TUR-BT)",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "32392",
	        "surgeryLevel": 3,
	        "departCode": "515",
	        "surgeryName": "尿道狭窄切除术",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "32469",
	        "surgeryLevel": 1,
	        "departCode": "515",
	        "surgeryName": "前列腺活组织检查",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 3,
	        "surgeryCode": "34409",
	        "surgeryLevel": 4,
	        "departCode": "515",
	        "surgeryName": "腹腔镜下肾上腺肿瘤切除术",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34423",
	        "surgeryLevel": 4,
	        "departCode": "515",
	        "surgeryName": "阴茎增粗术 ",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34442",
	        "surgeryCountMom": 0,
	        "surgeryLevel": 4,
	        "departCode": "515",
	        "surgeryName": "经尿道输尿管镜输尿管钬激光碎石取石术",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "34446",
	        "surgeryLevel": 4,
	        "departCode": "515",
	        "surgeryName": "腹腔镜根治性前列腺切除术",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "34452",
	        "surgeryLevel": 3,
	        "departCode": "515",
	        "surgeryName": "经阴道无张力尿道中段吊带术",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "35187",
	        "surgeryCountMom": 0,
	        "surgeryLevel": 1,
	        "departCode": "515",
	        "surgeryName": "经尿道激光诱导前列腺切除术(TULIP)",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "35189",
	        "surgeryLevel": 4,
	        "departCode": "515",
	        "surgeryName": "经尿道前列腺电汽化术(TEVAP)",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "35483",
	        "surgeryLevel": 4,
	        "departCode": "515",
	        "surgeryName": "经皮肾镜碎石术",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "36772",
	        "surgeryCountMom": 0,
	        "surgeryLevel": 6,
	        "departCode": "515",
	        "surgeryName": "精囊镜检查",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 3,
	        "surgeryCode": "36777",
	        "surgeryCountMom": 0.5,
	        "surgeryLevel": 7,
	        "departCode": "515",
	        "surgeryName": "经输尿管软镜肾结石钬激光碎石取石术",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "36808",
	        "surgeryLevel": 1,
	        "departCode": "515",
	        "surgeryName": "经尿道膀胱血块清除术",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "33259",
	        "surgeryCountMom": 1,
	        "surgeryLevel": 3,
	        "departCode": "516",
	        "surgeryName": "肱骨骨折开放性复位术伴固定术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33260",
	        "surgeryCountMom": -0.5,
	        "surgeryLevel": 2,
	        "departCode": "516",
	        "surgeryName": "桡骨骨折开放性复位术伴固定术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "33271",
	        "surgeryCountMom": -0.7143,
	        "surgeryLevel": 2,
	        "departCode": "516",
	        "surgeryName": "胫骨骨折开放性复位术伴固定术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 3,
	        "surgeryCode": "33280",
	        "surgeryLevel": 3,
	        "departCode": "516",
	        "surgeryName": "踝骨骨折开放性复位术伴固定术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33281",
	        "surgeryLevel": 2,
	        "departCode": "516",
	        "surgeryName": "锁骨骨折开放性复位术伴内固定术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "33331",
	        "surgeryLevel": 1,
	        "departCode": "516",
	        "surgeryName": "髋脱位闭合复位术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "33376",
	        "surgeryLevel": 4,
	        "departCode": "516",
	        "surgeryName": "关节镜检查",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33377",
	        "surgeryLevel": 1,
	        "departCode": "516",
	        "surgeryName": "肩关节镜检查",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 8,
	        "surgeryCode": "33522",
	        "surgeryCountMom": 0.6,
	        "surgeryLevel": 4,
	        "departCode": "516",
	        "surgeryName": "全髋关节置换",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33709",
	        "surgeryLevel": 1,
	        "departCode": "516",
	        "surgeryName": "胫腓骨截断矫形术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34556",
	        "surgeryLevel": 4,
	        "departCode": "516",
	        "surgeryName": "全膝关节置换",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "34565",
	        "surgeryCountMom": 0,
	        "surgeryLevel": 4,
	        "departCode": "516",
	        "surgeryName": "椎体成形术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34844",
	        "surgeryLevel": 1,
	        "departCode": "516",
	        "surgeryName": "清创缝合术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34888",
	        "surgeryLevel": 1,
	        "departCode": "516",
	        "surgeryName": "去除肩胛骨内固定装置",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "34889",
	        "surgeryCountMom": 0,
	        "surgeryLevel": 1,
	        "departCode": "516",
	        "surgeryName": "去除锁骨内固定装置",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34893",
	        "surgeryLevel": 1,
	        "departCode": "516",
	        "surgeryName": "去除尺骨内固定装置",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "34898",
	        "surgeryLevel": 1,
	        "departCode": "516",
	        "surgeryName": "去除胫骨内固定装置",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34899",
	        "surgeryLevel": 1,
	        "departCode": "516",
	        "surgeryName": "去除腓骨内固定装置",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 5,
	        "surgeryCode": "35490",
	        "surgeryCountMom": 1.5,
	        "surgeryLevel": 4,
	        "departCode": "516",
	        "surgeryName": "人工股骨头置换术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "35518",
	        "surgeryCountMom": 0,
	        "surgeryLevel": 3,
	        "departCode": "516",
	        "surgeryName": "膝关节副韧带修补术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "35526",
	        "surgeryLevel": 1,
	        "departCode": "516",
	        "surgeryName": "下肢截骨矫正术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "35597",
	        "surgeryLevel": 1,
	        "departCode": "516",
	        "surgeryName": "关节镜探查半月板成型术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "36812",
	        "surgeryCountMom": 0,
	        "surgeryLevel": 1,
	        "departCode": "516",
	        "surgeryName": "肩关节镜下肩袖修复术、重建术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34924",
	        "surgeryLevel": 1,
	        "departCode": "518",
	        "surgeryName": "体表肿块切除术",
	        "departName": "整形外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "30235",
	        "surgeryLevel": 3,
	        "departCode": "519",
	        "surgeryName": "甲状腺部分切除术",
	        "departName": "胸外科、肿瘤外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "31416",
	        "surgeryLevel": 1,
	        "departCode": "519",
	        "surgeryName": "大隐静脉高位结扎剥脱术",
	        "departName": "胸外科、肿瘤外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "31864",
	        "surgeryLevel": 2,
	        "departCode": "519",
	        "surgeryName": "阑尾切除术",
	        "departName": "胸外科、肿瘤外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "32115",
	        "surgeryLevel": 3,
	        "departCode": "519",
	        "surgeryName": "腹股沟斜疝修补.高位疝囊结扎.单侧",
	        "departName": "胸外科、肿瘤外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "32160",
	        "surgeryCountMom": -0.6667,
	        "surgeryLevel": 2,
	        "departCode": "519",
	        "surgeryName": "剖腹探查术",
	        "departName": "胸外科、肿瘤外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33642",
	        "surgeryCountMom": 0,
	        "surgeryLevel": 2,
	        "departCode": "519",
	        "surgeryName": "国窝囊肿切除",
	        "departName": "胸外科、肿瘤外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34732",
	        "surgeryLevel": 4,
	        "departCode": "519",
	        "surgeryName": "食管癌根治术(食管-胃吻合术)二切口",
	        "departName": "胸外科、肿瘤外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "34924",
	        "surgeryCountMom": -0.5,
	        "surgeryLevel": 1,
	        "departCode": "519",
	        "surgeryName": "体表肿块切除术",
	        "departName": "胸外科、肿瘤外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "35636",
	        "surgeryLevel": 1,
	        "departCode": "519",
	        "surgeryName": "右半结肠癌扩大根治切除术",
	        "departName": "胸外科、肿瘤外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "30678",
	        "surgeryLevel": 1,
	        "departCode": "522",
	        "surgeryName": "耳廓部分切除术",
	        "departName": "耳鼻喉科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "30777",
	        "surgeryLevel": 3,
	        "departCode": "522",
	        "surgeryName": "鼻内镜下鼻病损切除",
	        "departName": "耳鼻喉科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "32167",
	        "surgeryLevel": 3,
	        "departCode": "523",
	        "surgeryName": "腹腔镜检查",
	        "departName": "妇产科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "32603",
	        "surgeryCountMom": 0,
	        "surgeryLevel": 4,
	        "departCode": "523",
	        "surgeryName": "腹腔镜下卵巢囊肿切除",
	        "departName": "妇产科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "32693",
	        "surgeryLevel": 1,
	        "departCode": "523",
	        "surgeryName": "宫腔镜检查",
	        "departName": "妇产科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "32778",
	        "surgeryLevel": 2,
	        "departCode": "523",
	        "surgeryName": "阴道前后壁修补术",
	        "departName": "妇产科"
	      },
	      {
	        "surgeryCount": 7,
	        "surgeryCode": "32876",
	        "surgeryCountMom": 1.3333,
	        "surgeryLevel": 3,
	        "departCode": "523",
	        "surgeryName": "子宫下段横切口剖宫产术",
	        "departName": "妇产科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "35053",
	        "surgeryLevel": 3,
	        "departCode": "523",
	        "surgeryName": "宫腔镜下取异物",
	        "departName": "妇产科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "35054",
	        "surgeryLevel": 5,
	        "departCode": "523",
	        "surgeryName": "宫腔镜下子宫内膜息肉电切割术",
	        "departName": "妇产科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "35590",
	        "surgeryLevel": 1,
	        "departCode": "523",
	        "surgeryName": "盆底重建术",
	        "departName": "妇产科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "36879",
	        "surgeryLevel": 7,
	        "departCode": "523",
	        "surgeryName": "宫腔镜下子宫活组织检查",
	        "departName": "妇产科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "30231",
	        "surgeryLevel": 3,
	        "departCode": "533",
	        "surgeryName": "甲状腺结节切除术",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "30236",
	        "surgeryLevel": 3,
	        "departCode": "533",
	        "surgeryName": "甲状腺次全切除术",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "31674",
	        "surgeryLevel": 4,
	        "departCode": "533",
	        "surgeryName": "胃癌根治术",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "32115",
	        "surgeryLevel": 3,
	        "departCode": "533",
	        "surgeryName": "腹股沟斜疝修补.高位疝囊结扎.单侧",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 3,
	        "surgeryCode": "32116",
	        "surgeryLevel": 3,
	        "departCode": "533",
	        "surgeryName": "腹股沟斜疝高位疝囊结扎术.单侧",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "32167",
	        "surgeryCountMom": 0,
	        "surgeryLevel": 3,
	        "departCode": "533",
	        "surgeryName": "腹腔镜检查",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33642",
	        "surgeryLevel": 2,
	        "departCode": "533",
	        "surgeryName": "国窝囊肿切除",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33746",
	        "surgeryLevel": 1,
	        "departCode": "533",
	        "surgeryName": "副乳切除术",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33822",
	        "surgeryLevel": 1,
	        "departCode": "533",
	        "surgeryName": "皮脂囊肿切除术",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34399",
	        "surgeryCountMom": -0.5,
	        "surgeryLevel": 4,
	        "departCode": "533",
	        "surgeryName": "腹腔镜下胆囊切除术",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "34924",
	        "surgeryLevel": 1,
	        "departCode": "533",
	        "surgeryName": "体表肿块切除术",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "35043",
	        "surgeryCountMom": 1,
	        "surgeryLevel": 1,
	        "departCode": "533",
	        "surgeryName": "大清创缝合术",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "35224",
	        "surgeryLevel": 2,
	        "departCode": "533",
	        "surgeryName": "肋骨骨内固定不伴骨折复位术",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33059",
	        "surgeryLevel": 3,
	        "departCode": "534",
	        "surgeryName": "拇外翻修补术",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33259",
	        "surgeryLevel": 3,
	        "departCode": "534",
	        "surgeryName": "肱骨骨折开放性复位术伴固定术",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33264",
	        "surgeryLevel": 2,
	        "departCode": "534",
	        "surgeryName": "尺桡骨骨折开放性复位术伴固定术",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "33281",
	        "surgeryLevel": 2,
	        "departCode": "534",
	        "surgeryName": "锁骨骨折开放性复位术伴内固定术",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33376",
	        "surgeryLevel": 4,
	        "departCode": "534",
	        "surgeryName": "关节镜检查",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "33632",
	        "surgeryLevel": 1,
	        "departCode": "534",
	        "surgeryName": "腱鞘囊肿切除术",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34532",
	        "surgeryCountMom": -0.5,
	        "surgeryLevel": 3,
	        "departCode": "534",
	        "surgeryName": "腰椎后路减压融合内固定术",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 11,
	        "surgeryCode": "34565",
	        "surgeryCountMom": 0.5714,
	        "surgeryLevel": 4,
	        "departCode": "534",
	        "surgeryName": "椎体成形术",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34889",
	        "surgeryLevel": 1,
	        "departCode": "534",
	        "surgeryName": "去除锁骨内固定装置",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryCode": "34897",
	        "surgeryLevel": 1,
	        "departCode": "534",
	        "surgeryName": "去除髌骨内固定装置",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "34899",
	        "surgeryLevel": 1,
	        "departCode": "534",
	        "surgeryName": "去除腓骨内固定装置",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "35297",
	        "surgeryLevel": 2,
	        "departCode": "534",
	        "surgeryName": "肩锁关节脱位切复内固定术",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "35815",
	        "surgeryLevel": 1,
	        "departCode": "534",
	        "surgeryName": "正中神经松解术",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 3,
	        "surgeryCode": "36792",
	        "surgeryLevel": 7,
	        "departCode": "534",
	        "surgeryName": "椎间孔镜下腰椎间盘髓核摘除术",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryCode": "36800",
	        "surgeryLevel": 7,
	        "departCode": "534",
	        "surgeryName": "膝关节镜下骨关节炎清理术",
	        "departName": "骨科(脊柱)"
	      }
	    ],
	    "diffLevelSurgeryModule": [
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "31549",
	        "departCode": "505",
	        "surgeryName": "淋巴活组织检查",
	        "departName": "消化内科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "31550",
	        "departCode": "505",
	        "surgeryName": "颈部淋巴结活检",
	        "departName": "消化内科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "32950",
	        "departCode": "506",
	        "surgeryName": "下颌骨骨折闭合性复位术",
	        "departName": "神经外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "34924",
	        "departCode": "506",
	        "surgeryName": "体表肿块切除术",
	        "departName": "神经外科"
	      },
	      {
	        "surgeryCount": 5,
	        "surgeryType": 0,
	        "surgeryCode": "31416",
	        "surgeryCountMom": 4,
	        "departCode": "507",
	        "surgeryName": "大隐静脉高位结扎剥脱术",
	        "departName": "血管外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryType": 0,
	        "surgeryCode": "33954",
	        "departCode": "507",
	        "surgeryName": "腹主动脉造影术",
	        "departName": "血管外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "30405",
	        "departCode": "511",
	        "surgeryName": "结膜病损切除术",
	        "departName": "眼科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryType": 0,
	        "surgeryCode": "35022",
	        "departCode": "511",
	        "surgeryName": "共同性斜视矫正术",
	        "departName": "眼科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryType": 0,
	        "surgeryCode": "36497",
	        "departCode": "511",
	        "surgeryName": "眼睑肉赘切除术",
	        "departName": "眼科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "33632",
	        "departCode": "512",
	        "surgeryName": "腱鞘囊肿切除术",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "34308",
	        "departCode": "512",
	        "surgeryName": "异物取出  ＮＯＳ",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "34653",
	        "departCode": "512",
	        "surgeryName": "趾关节离断术",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryType": 0,
	        "surgeryCode": "34889",
	        "departCode": "512",
	        "surgeryName": "去除锁骨内固定装置",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "34892",
	        "departCode": "512",
	        "surgeryName": "去除桡骨内固定装置",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "34897",
	        "departCode": "512",
	        "surgeryName": "去除髌骨内固定装置",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 5,
	        "surgeryType": 0,
	        "surgeryCode": "34898",
	        "departCode": "512",
	        "surgeryName": "去除胫骨内固定装置",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryType": 0,
	        "surgeryCode": "34899",
	        "departCode": "512",
	        "surgeryName": "去除腓骨内固定装置",
	        "departName": "骨科(创伤)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "33975",
	        "departCode": "513",
	        "surgeryName": "冠状动脉造影术  ＮＯＳ",
	        "departName": "重症医学科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 1,
	        "surgeryCode": "33799",
	        "departCode": "514",
	        "surgeryName": "藏毛囊肿切除术",
	        "departName": "肛肠外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "34924",
	        "departCode": "514",
	        "surgeryName": "体表肿块切除术",
	        "departName": "肛肠外科"
	      },
	      {
	        "surgeryCount": 5,
	        "surgeryType": 0,
	        "surgeryCode": "36925",
	        "departCode": "514",
	        "surgeryName": "肛周痔切除术",
	        "departName": "肛肠外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 1,
	        "surgeryCode": "32407",
	        "departCode": "515",
	        "surgeryName": "尿道口成形术",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryType": 1,
	        "surgeryCode": "32469",
	        "departCode": "515",
	        "surgeryName": "前列腺活组织检查",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 1,
	        "surgeryCode": "32492",
	        "departCode": "515",
	        "surgeryName": "睾丸鞘膜切开引流术",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 1,
	        "surgeryCode": "32494",
	        "departCode": "515",
	        "surgeryName": "阴囊切开探查术",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "35187",
	        "surgeryCountMom": 0,
	        "departCode": "515",
	        "surgeryName": "经尿道激光诱导前列腺切除术(TULIP)",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "36808",
	        "departCode": "515",
	        "surgeryName": "经尿道膀胱血块清除术",
	        "departName": "泌尿外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryType": 0,
	        "surgeryCode": "33331",
	        "departCode": "516",
	        "surgeryName": "髋脱位闭合复位术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "33377",
	        "departCode": "516",
	        "surgeryName": "肩关节镜检查",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "33709",
	        "departCode": "516",
	        "surgeryName": "胫腓骨截断矫形术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "34844",
	        "departCode": "516",
	        "surgeryName": "清创缝合术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "34888",
	        "departCode": "516",
	        "surgeryName": "去除肩胛骨内固定装置",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryType": 0,
	        "surgeryCode": "34889",
	        "surgeryCountMom": 0,
	        "departCode": "516",
	        "surgeryName": "去除锁骨内固定装置",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "34893",
	        "departCode": "516",
	        "surgeryName": "去除尺骨内固定装置",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryType": 0,
	        "surgeryCode": "34898",
	        "departCode": "516",
	        "surgeryName": "去除胫骨内固定装置",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "34899",
	        "departCode": "516",
	        "surgeryName": "去除腓骨内固定装置",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "35526",
	        "departCode": "516",
	        "surgeryName": "下肢截骨矫正术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "35597",
	        "departCode": "516",
	        "surgeryName": "关节镜探查半月板成型术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "36812",
	        "surgeryCountMom": 0,
	        "departCode": "516",
	        "surgeryName": "肩关节镜下肩袖修复术、重建术",
	        "departName": "骨科(关节)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 1,
	        "surgeryCode": "34308",
	        "departCode": "518",
	        "surgeryName": "异物取出  ＮＯＳ",
	        "departName": "整形外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 1,
	        "surgeryCode": "34844",
	        "departCode": "518",
	        "surgeryName": "清创缝合术",
	        "departName": "整形外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "34924",
	        "departCode": "518",
	        "surgeryName": "体表肿块切除术",
	        "departName": "整形外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 1,
	        "surgeryCode": "35043",
	        "surgeryCountMom": 0,
	        "departCode": "518",
	        "surgeryName": "大清创缝合术",
	        "departName": "整形外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "31416",
	        "departCode": "519",
	        "surgeryName": "大隐静脉高位结扎剥脱术",
	        "departName": "胸外科、肿瘤外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryType": 0,
	        "surgeryCode": "34924",
	        "surgeryCountMom": -0.5,
	        "departCode": "519",
	        "surgeryName": "体表肿块切除术",
	        "departName": "胸外科、肿瘤外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "35636",
	        "departCode": "519",
	        "surgeryName": "右半结肠癌扩大根治切除术",
	        "departName": "胸外科、肿瘤外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "30678",
	        "departCode": "522",
	        "surgeryName": "耳廓部分切除术",
	        "departName": "耳鼻喉科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "32693",
	        "departCode": "523",
	        "surgeryName": "宫腔镜检查",
	        "departName": "妇产科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "35590",
	        "departCode": "523",
	        "surgeryName": "盆底重建术",
	        "departName": "妇产科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "33746",
	        "departCode": "533",
	        "surgeryName": "副乳切除术",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "33822",
	        "departCode": "533",
	        "surgeryName": "皮脂囊肿切除术",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryType": 0,
	        "surgeryCode": "34924",
	        "departCode": "533",
	        "surgeryName": "体表肿块切除术",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 3,
	        "surgeryType": 1,
	        "surgeryCode": "35043",
	        "surgeryCountMom": 0.5,
	        "departCode": "533",
	        "surgeryName": "大清创缝合术",
	        "departName": "肝胆外科"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "33632",
	        "departCode": "534",
	        "surgeryName": "腱鞘囊肿切除术",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "34889",
	        "departCode": "534",
	        "surgeryName": "去除锁骨内固定装置",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 2,
	        "surgeryType": 0,
	        "surgeryCode": "34897",
	        "departCode": "534",
	        "surgeryName": "去除髌骨内固定装置",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "34899",
	        "departCode": "534",
	        "surgeryName": "去除腓骨内固定装置",
	        "departName": "骨科(脊柱)"
	      },
	      {
	        "surgeryCount": 1,
	        "surgeryType": 0,
	        "surgeryCode": "35815",
	        "departCode": "534",
	        "surgeryName": "正中神经松解术",
	        "departName": "骨科(脊柱)"
	      }
	    ]
	}
}
const surgery_monthly = {
	"result": {
	    "diffCategorySurgeryModule": [
	      {
	        "name": "择期手术",
	        "2018年02月21日": 16,
	        "2018年02月22日": 16,
	        "2018年02月23日": 16,
	        "2018年02月24日": 12,
	        "2018年02月25日": 0,
	        "2018年02月26日": 18,
	        "2018年02月27日": 16,
	        "2018年02月28日": 22,
	        "2018年03月01日": 18,
	        "2018年03月02日": 20,
	        "2018年03月03日": 1,
	        "2018年03月04日": 0,
	        "2018年03月05日": 23,
	        "2018年03月06日": 25,
	        "2018年03月07日": 30,
	        "2018年03月08日": 22,
	        "2018年03月09日": 16,
	        "2018年03月10日": 1,
	        "2018年03月11日": 0,
	        "2018年03月12日": 16,
	        "2018年03月13日": 28,
	        "2018年03月14日": 33,
	        "2018年03月15日": 20,
	        "2018年03月16日": 14,
	        "2018年03月17日": 0,
	        "2018年03月18日": 0,
	        "2018年03月19日": 11,
	        "2018年03月20日": 21,
	        "2018年03月21日": 20,
	        "2018年03月22日": 25,
	        "2018年03月23日": 9,
	        "2018年03月24日": 1,
	        "2018年03月25日": 1,
	        "2018年03月26日": 14,
	        "2018年03月27日": 19,
	        "2018年03月28日": 25,
	        "2018年03月29日": 15,
	        "2018年03月30日": 17,
	        "2018年03月31日": 0,
	        "2018年04月01日": 1,
	        "2018年04月02日": 21,
	        "2018年04月03日": 19,
	        "2018年04月04日": 28
	      },
	      {
	        "name": "急诊手术",
	        "2018年02月21日": 1,
	        "2018年02月22日": 2,
	        "2018年02月23日": 2,
	        "2018年02月24日": 3,
	        "2018年02月25日": 2,
	        "2018年02月26日": 6,
	        "2018年02月27日": 3,
	        "2018年02月28日": 4,
	        "2018年03月01日": 3,
	        "2018年03月02日": 4,
	        "2018年03月03日": 2,
	        "2018年03月04日": 2,
	        "2018年03月05日": 6,
	        "2018年03月06日": 2,
	        "2018年03月07日": 2,
	        "2018年03月08日": 4,
	        "2018年03月09日": 1,
	        "2018年03月10日": 0,
	        "2018年03月11日": 0,
	        "2018年03月12日": 3,
	        "2018年03月13日": 5,
	        "2018年03月14日": 2,
	        "2018年03月15日": 0,
	        "2018年03月16日": 2,
	        "2018年03月17日": 1,
	        "2018年03月18日": 1,
	        "2018年03月19日": 2,
	        "2018年03月20日": 4,
	        "2018年03月21日": 3,
	        "2018年03月22日": 3,
	        "2018年03月23日": 5,
	        "2018年03月24日": 1,
	        "2018年03月25日": 2,
	        "2018年03月26日": 3,
	        "2018年03月27日": 1,
	        "2018年03月28日": 5,
	        "2018年03月29日": 3,
	        "2018年03月30日": 1,
	        "2018年03月31日": 2,
	        "2018年04月01日": 1,
	        "2018年04月02日": 1,
	        "2018年04月03日": 4,
	        "2018年04月04日": 3
	      }
	    ],
	    "diffLevelSurgeryModule": [
	      {
	        "name": "一类手术",
	        "2018年02月21日": 1,
	        "2018年02月22日": 4,
	        "2018年02月23日": 1,
	        "2018年02月24日": 2,
	        "2018年02月25日": 0,
	        "2018年02月26日": 9,
	        "2018年02月27日": 8,
	        "2018年02月28日": 8,
	        "2018年03月01日": 12,
	        "2018年03月02日": 4,
	        "2018年03月03日": 0,
	        "2018年03月04日": 0,
	        "2018年03月05日": 10,
	        "2018年03月06日": 8,
	        "2018年03月07日": 11,
	        "2018年03月08日": 4,
	        "2018年03月09日": 1,
	        "2018年03月10日": 0,
	        "2018年03月11日": 0,
	        "2018年03月12日": 12,
	        "2018年03月13日": 13,
	        "2018年03月14日": 9,
	        "2018年03月15日": 6,
	        "2018年03月16日": 4,
	        "2018年03月17日": 0,
	        "2018年03月18日": 0,
	        "2018年03月19日": 2,
	        "2018年03月20日": 11,
	        "2018年03月21日": 10,
	        "2018年03月22日": 9,
	        "2018年03月23日": 3,
	        "2018年03月24日": 0,
	        "2018年03月25日": 0,
	        "2018年03月26日": 3,
	        "2018年03月27日": 3,
	        "2018年03月28日": 11,
	        "2018年03月29日": 5,
	        "2018年03月30日": 2,
	        "2018年03月31日": 0,
	        "2018年04月01日": 0,
	        "2018年04月02日": 8,
	        "2018年04月03日": 8,
	        "2018年04月04日": 9
	      },
	      {
	        "name": "二类手术",
	        "2018年02月21日": 4,
	        "2018年02月22日": 1,
	        "2018年02月23日": 3,
	        "2018年02月24日": 5,
	        "2018年02月25日": 1,
	        "2018年02月26日": 2,
	        "2018年02月27日": 1,
	        "2018年02月28日": 3,
	        "2018年03月01日": 1,
	        "2018年03月02日": 4,
	        "2018年03月03日": 0,
	        "2018年03月04日": 1,
	        "2018年03月05日": 5,
	        "2018年03月06日": 0,
	        "2018年03月07日": 5,
	        "2018年03月08日": 5,
	        "2018年03月09日": 4,
	        "2018年03月10日": 0,
	        "2018年03月11日": 0,
	        "2018年03月12日": 1,
	        "2018年03月13日": 4,
	        "2018年03月14日": 5,
	        "2018年03月15日": 3,
	        "2018年03月16日": 3,
	        "2018年03月17日": 1,
	        "2018年03月18日": 0,
	        "2018年03月19日": 6,
	        "2018年03月20日": 6,
	        "2018年03月21日": 2,
	        "2018年03月22日": 5,
	        "2018年03月23日": 6,
	        "2018年03月24日": 1,
	        "2018年03月25日": 1,
	        "2018年03月26日": 2,
	        "2018年03月27日": 6,
	        "2018年03月28日": 10,
	        "2018年03月29日": 1,
	        "2018年03月30日": 3,
	        "2018年03月31日": 1,
	        "2018年04月01日": 2,
	        "2018年04月02日": 3,
	        "2018年04月03日": 3,
	        "2018年04月04日": 6
	      },
	      {
	        "name": "三类手术",
	        "2018年02月21日": 3,
	        "2018年02月22日": 5,
	        "2018年02月23日": 7,
	        "2018年02月24日": 3,
	        "2018年02月25日": 1,
	        "2018年02月26日": 3,
	        "2018年02月27日": 3,
	        "2018年02月28日": 7,
	        "2018年03月01日": 1,
	        "2018年03月02日": 6,
	        "2018年03月03日": 0,
	        "2018年03月04日": 0,
	        "2018年03月05日": 7,
	        "2018年03月06日": 7,
	        "2018年03月07日": 10,
	        "2018年03月08日": 10,
	        "2018年03月09日": 8,
	        "2018年03月10日": 0,
	        "2018年03月11日": 0,
	        "2018年03月12日": 1,
	        "2018年03月13日": 3,
	        "2018年03月14日": 7,
	        "2018年03月15日": 3,
	        "2018年03月16日": 5,
	        "2018年03月17日": 0,
	        "2018年03月18日": 1,
	        "2018年03月19日": 1,
	        "2018年03月20日": 1,
	        "2018年03月21日": 3,
	        "2018年03月22日": 5,
	        "2018年03月23日": 1,
	        "2018年03月24日": 1,
	        "2018年03月25日": 2,
	        "2018年03月26日": 5,
	        "2018年03月27日": 3,
	        "2018年03月28日": 3,
	        "2018年03月29日": 5,
	        "2018年03月30日": 6,
	        "2018年03月31日": 1,
	        "2018年04月01日": 0,
	        "2018年04月02日": 4,
	        "2018年04月03日": 5,
	        "2018年04月04日": 6
	      },
	      {
	        "name": "四类手术",
	        "2018年02月21日": 9,
	        "2018年02月22日": 7,
	        "2018年02月23日": 7,
	        "2018年02月24日": 5,
	        "2018年02月25日": 0,
	        "2018年02月26日": 9,
	        "2018年02月27日": 6,
	        "2018年02月28日": 8,
	        "2018年03月01日": 6,
	        "2018年03月02日": 9,
	        "2018年03月03日": 3,
	        "2018年03月04日": 1,
	        "2018年03月05日": 4,
	        "2018年03月06日": 11,
	        "2018年03月07日": 5,
	        "2018年03月08日": 7,
	        "2018年03月09日": 4,
	        "2018年03月10日": 1,
	        "2018年03月11日": 0,
	        "2018年03月12日": 4,
	        "2018年03月13日": 10,
	        "2018年03月14日": 12,
	        "2018年03月15日": 6,
	        "2018年03月16日": 4,
	        "2018年03月17日": 0,
	        "2018年03月18日": 0,
	        "2018年03月19日": 3,
	        "2018年03月20日": 4,
	        "2018年03月21日": 8,
	        "2018年03月22日": 6,
	        "2018年03月23日": 4,
	        "2018年03月24日": 0,
	        "2018年03月25日": 0,
	        "2018年03月26日": 6,
	        "2018年03月27日": 7,
	        "2018年03月28日": 4,
	        "2018年03月29日": 7,
	        "2018年03月30日": 7,
	        "2018年03月31日": 0,
	        "2018年04月01日": 0,
	        "2018年04月02日": 7,
	        "2018年04月03日": 7,
	        "2018年04月04日": 7
	      },
	      {
	        "name": "特殊手术",
	        "2018年02月21日": 0,
	        "2018年02月22日": 0,
	        "2018年02月23日": 0,
	        "2018年02月24日": 0,
	        "2018年02月25日": 0,
	        "2018年02月26日": 0,
	        "2018年02月27日": 1,
	        "2018年02月28日": 0,
	        "2018年03月01日": 0,
	        "2018年03月02日": 0,
	        "2018年03月03日": 0,
	        "2018年03月04日": 0,
	        "2018年03月05日": 0,
	        "2018年03月06日": 0,
	        "2018年03月07日": 0,
	        "2018年03月08日": 0,
	        "2018年03月09日": 0,
	        "2018年03月10日": 0,
	        "2018年03月11日": 0,
	        "2018年03月12日": 0,
	        "2018年03月13日": 1,
	        "2018年03月14日": 1,
	        "2018年03月15日": 0,
	        "2018年03月16日": 0,
	        "2018年03月17日": 0,
	        "2018年03月18日": 0,
	        "2018年03月19日": 1,
	        "2018年03月20日": 1,
	        "2018年03月21日": 0,
	        "2018年03月22日": 0,
	        "2018年03月23日": 0,
	        "2018年03月24日": 0,
	        "2018年03月25日": 0,
	        "2018年03月26日": 0,
	        "2018年03月27日": 1,
	        "2018年03月28日": 0,
	        "2018年03月29日": 0,
	        "2018年03月30日": 0,
	        "2018年03月31日": 0,
	        "2018年04月01日": 0,
	        "2018年04月02日": 0,
	        "2018年04月03日": 0,
	        "2018年04月04日": 0
	      },
	      {
	        "name": "检查操作",
	        "2018年02月21日": 0,
	        "2018年02月22日": 0,
	        "2018年02月23日": 0,
	        "2018年02月24日": 0,
	        "2018年02月25日": 0,
	        "2018年02月26日": 0,
	        "2018年02月27日": 0,
	        "2018年02月28日": 0,
	        "2018年03月01日": 0,
	        "2018年03月02日": 0,
	        "2018年03月03日": 0,
	        "2018年03月04日": 0,
	        "2018年03月05日": 1,
	        "2018年03月06日": 0,
	        "2018年03月07日": 0,
	        "2018年03月08日": 0,
	        "2018年03月09日": 0,
	        "2018年03月10日": 0,
	        "2018年03月11日": 0,
	        "2018年03月12日": 0,
	        "2018年03月13日": 0,
	        "2018年03月14日": 0,
	        "2018年03月15日": 0,
	        "2018年03月16日": 0,
	        "2018年03月17日": 0,
	        "2018年03月18日": 0,
	        "2018年03月19日": 0,
	        "2018年03月20日": 0,
	        "2018年03月21日": 0,
	        "2018年03月22日": 0,
	        "2018年03月23日": 0,
	        "2018年03月24日": 0,
	        "2018年03月25日": 0,
	        "2018年03月26日": 0,
	        "2018年03月27日": 0,
	        "2018年03月28日": 0,
	        "2018年03月29日": 0,
	        "2018年03月30日": 0,
	        "2018年03月31日": 0,
	        "2018年04月01日": 0,
	        "2018年04月02日": 0,
	        "2018年04月03日": 0,
	        "2018年04月04日": 0
	      },
	      {
	        "name": "治疗操作",
	        "2018年02月21日": 0,
	        "2018年02月22日": 1,
	        "2018年02月23日": 0,
	        "2018年02月24日": 0,
	        "2018年02月25日": 0,
	        "2018年02月26日": 1,
	        "2018年02月27日": 0,
	        "2018年02月28日": 0,
	        "2018年03月01日": 1,
	        "2018年03月02日": 1,
	        "2018年03月03日": 0,
	        "2018年03月04日": 0,
	        "2018年03月05日": 2,
	        "2018年03月06日": 1,
	        "2018年03月07日": 1,
	        "2018年03月08日": 0,
	        "2018年03月09日": 0,
	        "2018年03月10日": 0,
	        "2018年03月11日": 0,
	        "2018年03月12日": 1,
	        "2018年03月13日": 2,
	        "2018年03月14日": 1,
	        "2018年03月15日": 2,
	        "2018年03月16日": 0,
	        "2018年03月17日": 0,
	        "2018年03月18日": 0,
	        "2018年03月19日": 0,
	        "2018年03月20日": 2,
	        "2018年03月21日": 0,
	        "2018年03月22日": 3,
	        "2018年03月23日": 0,
	        "2018年03月24日": 0,
	        "2018年03月25日": 0,
	        "2018年03月26日": 1,
	        "2018年03月27日": 0,
	        "2018年03月28日": 2,
	        "2018年03月29日": 0,
	        "2018年03月30日": 0,
	        "2018年03月31日": 0,
	        "2018年04月01日": 0,
	        "2018年04月02日": 0,
	        "2018年04月03日": 0,
	        "2018年04月04日": 3
	      }
	    ]
	}
}
export function getMockSurgery(req, res, u) {
  let result = {};
  result = computeDays(req.query.beginDate, req.query.endDate) >= 14 ? surgery_monthly : surgery_daily;
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getMockSurgery,
};