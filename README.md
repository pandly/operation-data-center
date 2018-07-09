简体中文

# Operation Data Center

一套为医院提供数据可视化方案。提供了柱状图、饼图、折线图、面积图等多种可视化形式。支持多页面切换

## 预览
![preview](operation-data-center.png)

## 内容

```
- 院长驾驶舱
  - 今日动态
    - 总门急诊人次
    - 中医处方数量
    - 非药物中治率
    - 出院人数
    - 收入
  - 重点指标
    - 耗材
    - 医疗质量
    - 手术
    - 预约
    - 床位
  - 工作台
- 异常
  - 403 无权限
  - 404 找不到
  - 500 服务器出错
```

## Demo 开发

```bash
$ git clone https://github.com/pandly/operation-data-center.git
$ cd operation-data-center
$ npm install
$ npm run start         # 访问 http://localhost:8000,启动时代理开发环境中的真实数据，如需更改代理接口地址，可以在.roadhogrc.mock.js中修改
$ npm run mock          # 访问 http://localhost:8000,启动时访问mock数据
$ npm run build         # 文件打包 
```
[demo地址](https://pandly.github.io/operation-data-center/dist/)

## 使用

```bash
- 通过选择时间范围，显示不同时间段的统计结果图。ps: 大于30天的数据和小于30天的数据会以不同的形式呈现。
- 一级页面点击相应的模块可以进入二级页面查看相应的详细信息。
```                   
