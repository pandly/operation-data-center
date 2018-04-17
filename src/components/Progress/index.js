import React from 'react';
import { formatPercent } from '../../utils/utils';

import styles from './index.less';

const Progress = ({
	width = 0, 
  vertical= false,
  percent = 0, 
  radius = 0, 
  color = '#3AC9A8', 
  background = false,
  textSize = 14
}) => {
  var progressStyle = {
    height: 0,
    width: 0
  }
  //有背景且水平
  if(background && !vertical) {
    var progressStyle = {
      width: '95%',
      alignItems: 'center'
    }
    var progressOuter = {
      background,
      borderRadius: radius,
      width: '100%',
      height: width,
      marginRight: 10,
      flex: 1
    }
    var progressInner = {
      height: width,
      width: formatPercent(percent),
      borderRadius: radius,
      background: color,
    }
  }
  //没有背景且水平
  if(!background && !vertical) {
    var progressStyle = {
      width: '100%'
    } 
    var progressOuter = {
      width: formatPercent(percent),
      marginRight: 10,
    }
    var progressInner = {
      width: '100%',
      height: width,
      borderRadius: radius,
      background: color,
    }
  }
  //有背景且垂直 
  if(background && vertical) {
    var progressStyle = {
      height: '100%',
      flexDirection: 'column-reverse'
    }
    var progressOuter = {
      background,
      borderRadius: radius,
      height: '100%',
      width,
      marginTop: 5,
      display: 'flex',
      flexDirection: 'column-reverse',
    }
    var progressInner = {
      width,
      height: formatPercent(percent),
      display: 'inline-block',
      borderRadius: radius,
      background: color,
    }
  }
  //无背景且垂直
  if(!background && vertical) {
    var progressStyle = {
      height: '100%',
      flexDirection: 'column-reverse',
      alignItems: 'center'
    }
    var progressOuter = {
      borderRadius: radius,
      height: formatPercent(percent),
      width,
      marginTop: 5,
      display: 'flex',
      flexDirection: 'column-reverse',
    }
    var progressInner = {
      width,
      height: '100%',
      display: 'inline-block',
      borderRadius: radius,
      background: color,
    }
  }
	return (
		<div style={progressStyle} className={styles.progress}>
      <div style={progressOuter} className={styles.progressOuter}>
        <div style={progressInner} className={styles.progressInner}></div>
      </div>
      <div className={styles.progressText} style={{ color, fontSize: textSize }}>
        {formatPercent(percent)}
      </div>
    </div>
	)
}

export default Progress;