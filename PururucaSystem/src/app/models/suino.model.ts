interface IWeight {
    weight: number;
    date: Date;
}

export interface ISuino {
    id?: string;
    earTag: number;
    fatherEarTag: number;
    motherEarTag: number;
    dateOfBirth: string;
    dateOfDeparture: string;
    status: 'Ativo' | 'Vendido' | 'Morto';
    gender: 'M' | 'F';
    weighings?: Array<IWeight>;
}
