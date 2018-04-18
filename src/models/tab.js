const panes = JSON.parse(sessionStorage.getItem('panes'));

export default {
	namespace: 'tab',

	state: {
		panes: panes ? panes.panes : [
		  {
		  	title: '今日动态',
		  	key: '/dashboard/report',
		  	content: ''
		  }
		],
		activeKey: panes ? panes.activeKey : '/dashboard/report'
	},

	reducers: {
		update(state, { payload }) {
			const findIndex = state.panes.find(item => item.title === payload.title)
			const panes = findIndex === undefined ? [...state.panes, payload] : state.panes
			sessionStorage.setItem('panes', JSON.stringify({ 
				panes,
        		activeKey: payload.key, 
			}));
        	return {
        		panes,
        		activeKey: payload.key,
        	}
		},
		check(state, { activeKey }) {
			sessionStorage.setItem('panes', JSON.stringify({ 
				...state,
				activeKey
			}));
			return {
				...state,
				activeKey
			}
		},
		delete(state, { payload }) {
			const { findIndex, lastKey } = payload;
			let panes = state.panes.concat();
            panes.splice(findIndex, 1);
            sessionStorage.setItem('panes', JSON.stringify({ 
				panes,
        		activeKey: lastKey, 
			}));
            return {
            	panes,
            	activeKey: lastKey
            }
		}
	}
}