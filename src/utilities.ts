import { UsaState } from "./data/stateData.interface";

const getPartyColor = (party: UsaState['party']) => {
	if (party === "republican") {
		return "#e04b1a";
	}
	if (party === "democrat") {
		return "#0044c9";
	}
	return "grey";
};

export { getPartyColor };
