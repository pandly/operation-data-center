import React from 'react';
import { Card, Divider } from 'antd';
import Compare from '../../../components/Compare';

import styles from './index.less';

const MonthlyCard = ({
	color, title, content, increase, decrease, unit = '', loading, onCardClick  
}) => {
	return (
		<Card
      className={styles.monthlyCard}
      hoverable
      loading={loading}
      onClick={onCardClick}
      style={{ marginBottom: 20, boxShadow: "0 0 4px 0 #E8E8E8" }}
      bodyStyle={{ padding: 0, height: 200 }}
		>
		  <div className={styles.monthlyCardContent}>
        <div className={styles.title} style={{ backgroundColor: color }}>{title}</div>
        <div className={styles.content}>
          <span className={styles.total} style={{ color }}>{content || '--'}</span>
          {unit ? (
            <span className={styles.unit}>{unit}</span>
          ) : null}       
        </div>
        <div className={styles.compare}>
          <Compare type='同比' value={increase} />
          <Divider type="vertical" />
          <Compare type='环比' value={decrease} />
        </div>
      </div>
		</Card>
	)
}

export default MonthlyCard;