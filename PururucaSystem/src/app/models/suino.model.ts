export interface IWeight {
    id?: string
    weight: number
    date: string
}

export interface ISuino {
    id?: string
    earTag: number
    fatherEarTag: number
    motherEarTag: number
    dateOfBirth: string
    dateOfDeparture: string
    status: 'Ativo' | 'Vendido' | 'Morto'
    gender: 'M' | 'F'
    weighings?: Array<IWeight>
}
