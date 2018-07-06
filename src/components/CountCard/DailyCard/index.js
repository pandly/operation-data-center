import React from 'react';
import { Card } from 'antd';

import styles from './index.less';

const DailyCard = ({
	iconName, color, title, content, unit = '', loading, onCardClick  
}) => {
	return (
		<Card
      hoverable
      loading={loading}
      onClick={onCardClick}
      style={{ marginBottom: 20, boxShadow: "0 0 4px 0 #E8E8E8" }}
		>
		  <div className={styles.countCard}>
        <i className={`${iconName} ${styles.icon}`} style={{ color }}></i>
        <div className={styles.text}>
          <div className={styles.title}>{title}</div>
          <div>
            <span className={styles.total} style={{ color }}>{ content == undefined ? '--' : content }</span>
            {unit ? (
              <span className={styles.unit}>{unit}</span>
            ) : null}       
          </div>
        </div>
      </div>
		</Card>
	)
}

export default DailyCard;