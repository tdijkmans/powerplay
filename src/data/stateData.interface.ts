
export type Party = 'democrat' | 'republican' | 'swing';

export interface UsaState {
    id: string;
    x: number;
    y: number;
    d: string;
    dataId: string;
    stateName: string;
    party: Party;
    electoralVotes: number;
    capital: string;
    stateSlogan: string;
}




