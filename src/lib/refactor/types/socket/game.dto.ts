export interface PlayerActionDTO {
    playerID: number
}

export interface PlayerCardDTO {
    identifier: number
    card: {rank: number, suit: number}
}

export interface PlayerCardResDTO {
    res: PlayerCardDTO
    roomID: string
}

export interface PlayerIndexCardDTO {
    playerID: number,
    indexCard: number
}

export interface PlayerIndexCardResDTO {
    res: PlayerIndexCardDTO
    roomID: string
}

export interface PassTurnDTO {
    turn: number
}

export interface WrongCutDTO {
    playerID: number, 
    indexCard: number, 
    penaltyCard: {rank: number, suit: number}
}

export interface WrongCutResDTO {
    res: WrongCutDTO
    roomID: string
}

export interface StopRequestDTO {
    playerID: number, 
    valid: boolean
}

export interface WrongStopDTO {
    idPlayer: number, 
    penaltyCard: {
        rank: number, 
        suit: number
    }
}

export interface WrongStopResDTO {
    res: WrongStopDTO
    roomID: string
}

export interface GameEndDTO {
    playerIDStop: number, 
    idWinner: number, 
    points: number[]
}

export interface GameEndResDTO {
    res: GameEndDTO,
    roomID: string
}