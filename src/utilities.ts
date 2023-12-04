import { Party } from "./data/stateData.interface";

const getPartyColor = (party: Party) => {
	if (party === "republican") {
		return "#e04b1a";
	} else if (party === "democrat") {
		return "#0044c9";
	} else {
		return "grey";
	}
};

export { getPartyColor };
