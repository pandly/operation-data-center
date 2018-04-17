import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '院长驾驶舱',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '今日动态',
        path: 'report',
      }, 
      {
        name: '重点指标',
        path: 'indicator',
      }, 
    ],
  }, 
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
