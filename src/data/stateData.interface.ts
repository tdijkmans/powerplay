import { stateData } from "./stateData";

export type UsaState = typeof stateData[number];

type Party = UsaState["party"];
type StateName = UsaState["stateName"];
type Capital = UsaState["capital"];
type StateSlogan = UsaState["stateSlogan"];
type ElectoralVotes = UsaState["electoralVotes"];
type id = UsaState["id"];

