import { UsaState } from "./data/stateData.interface";

type PartyColorVariant = 'default' | 'light' | 'dark';

const getPartyColor = (party: UsaState['party'], variant: PartyColorVariant = 'default') => {


	const colors = {
		republican: {
			default: '#e04b1a',
			light: '#ff7e4a',
			dark: '#b22a00'
		},
		democrat: {
			default: '#0044c9',
			light: '#4d6dff',
			dark: '#002d9e'
		},
		swing: {
			default: 'grey',
			light: 'lightgrey',
			dark: 'darkgrey'
		}
	};

	return colors[party][variant];
};

export { getPartyColor };

