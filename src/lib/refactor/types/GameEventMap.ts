import type { GameEndDTO, PlayerIndexCardDTO, WrongCutDTO } from "./socket/game.dto";

export type GameEventMap = {
    
    'player:discard': () => void;
    'player:exchangeCard': (cardIndex:number) => void;
    'player:cut': (cardIndex:number) => void;
    'player:stopRequest':()=>void;
    
    'mainPlayer:stateChange':()=>void;

    'pile:buyStack': () => void;
    'discard:buyDiscard': () => void;

    'game:buyDiscard': () => void;
    'game:buyStack': () => void;
    'game:discard': () => void;
    'game:exchangeCard': (cardIndex:number) => void;
    'game:passTurn': (turnId:number) =>void;
    'game:endTurn': () =>void;
    'game:dealFinish':()=>void;
    'game:spyFinish':()=>void;
    'game:cut':(cardIndex:number)=>void;
    'game:stopRequest':()=>void;

    'network:buyStack': (data:{playerId:number, card:{rank:number, suit:number}}) => void;
    'network:buyDiscard': (data:{playerId:number, card:{rank:number, suit:number}}) => void;
    'network:discard': () => void;
    'network:passTurn': (data:{turn:number}) => void;
    'network:exchangeCard': (data:PlayerIndexCardDTO) => void;
    'network:dealFinish':()=>void;
    'network:spyFinish':()=>void;
    'network:successCut':(data:PlayerIndexCardDTO)=>void;
    'network:wrongCut':(data:WrongCutDTO)=>void;
    'network:gameEnd':(data:GameEndDTO)=>void;
}