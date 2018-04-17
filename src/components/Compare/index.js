import React from 'react';
import { formatPercent } from '../../utils/utils';

const Compare = ({
	type = null, value = '', style
}) => {
	return (
		<span style={style}>
	        <span style={{ color: '#999', marginRight: 5 }}>{type}</span>
	        {value > 0 ? (
	          <i className="icon-up"></i>
	        ) : (
	          value < 0 ? (
	            <i className="icon-down"></i>
	          ) : null
	        )}
	        <span style={{ color: '#333' }}>
	          {typeof value === 'number' ? formatPercent(value) : '--'}
	        </span>
	    </span>
	)
}

export default Compare;