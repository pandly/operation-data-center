import React from 'react';
import empty from '../../assets/empty.png';
import styles from './index.less';

const Empty = ({
	 style
}) => {
	return (
		<div className={styles.empty}>
	      <img className={styles.img} src={empty} alt="empty"/>  
	    </div>
	)
}

export default Empty;
