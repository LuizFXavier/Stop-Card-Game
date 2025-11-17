import type { WebSocketErrorDTO } from "./error.dto";
import type{GameEndDTO,
            PassTurnDTO, 
            PlayerActionDTO, 
            PlayerCardDTO, 
            PlayerIndexCardDTO, 
            StopRequestDTO, 
            WrongCutDTO, 
            WrongStopDTO } from "./game.dto";
import type { RoomDTO, JoinConfigDTO, JoinRoomDTO, GameInitDTO } from "./room.dto";
import type { SkillUseDTO } from "./skill.dto";

export interface ServerToClientEvents {

    joinRoom: (dto: JoinConfigDTO) => void;

    gameStart: () => void;

    gameInit: (dto: GameInitDTO) => void

    dealFinish: () => void

    spyFinish: () => void

    buyStack:(dto: PlayerCardDTO) => void;

    buyDiscard: (dto: PlayerCardDTO) => void
    
    exchangeCard: (dto: PlayerIndexCardDTO) => void;

    discard: () => void;

    passTurn: (dto: PassTurnDTO) => void

    wrongCut: (dto: WrongCutDTO) => void

    successCut: (dto: PlayerIndexCardDTO) => void

    wrongStop: (dto: WrongStopDTO) => void

    gameEnd: (dto: GameEndDTO) => void

    error: (dto: WebSocketErrorDTO) => void

    encerrarGame:(objStop:{pontuacoes:number[], ganhador:number}) => void;

}

export interface ClientToServerEvents {
    
    joinRoom: (dto: JoinRoomDTO) => void;

    gameStart: (dto: RoomDTO) => void;

    gameInit: (dto: RoomDTO) => void

    dealFinish: (dto: RoomDTO) => void

    spyFinish: (dto: RoomDTO) => void
    
    buyStack: (dto: PlayerActionDTO) => void;

    buyDiscard: (dto: PlayerActionDTO) => void;

    exchangeCard: (dto: PlayerIndexCardDTO) => void;

    discard: (dto: PlayerActionDTO) => void;

    endTurn: (dto: RoomDTO) => void;

    cut: (dto: PlayerIndexCardDTO) => void;
    
    stopRequest: (dto: StopRequestDTO) => void;

    aceitarHabilidade:(obj: SkillUseDTO) => void;
    negarHabilidade:(obj: SkillUseDTO) => void;
    enviarHabilidade:(obj: SkillUseDTO, hab:any) => void;
    usouHabilidade:(obj: SkillUseDTO) => void;
}

export interface InterServerEvents {

}

export interface SocketData {
    
}