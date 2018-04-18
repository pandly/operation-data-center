import React from 'react';
import { Icon } from 'antd';

import styles from './index.less';

const NoData = ({
	 style
}) => {
	return (
		<div style={style} className={styles.noData}>
      <Icon type="exclamation-circle-o" className={styles.icon}/> 
      <div className={styles.text}>暂无数据</div>  
    </div>
	)
}

export default NoData;