export interface ISession {
    id?: string;
    sessionDate: string;
    sessionDescription: string;
    animalTags: string[];
    plannedActivities: string;
    vaccines?: string[];
}

export interface IActivity {
    id?: string;
    name: string;
    status: boolean;
}

export interface ISuinoActivity {
    id?: string;
    earTag: string;
    activity: IActivity | IActivity[];
}
