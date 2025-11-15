export type GameEventMap = {
    
    'player:discard': () => void;
    'player:exchangeCard': (card:{index:number}) => void;
    'player:cut': (data:{playerId:number, cardIndex:number}) => void;
    
    'mainPlayer:stateChange':()=>void;

    'pile:buyStack': () => void;
    'discard:buyDiscard': () => void;

    'game:buyDiscard': () => void;
    'game:buyStack': () => void;
    'game:discard': () => void;
    'game:turnPass': (turnId:number) =>void;

    'network:buyStack': (data:{playerId:number, card:{rank:number, suit:number}}) => void;
    'network:buyDiscard': (data:{playerId:number, card:{rank:number, suit:number}}) => void;
    'network:discard': (data:{playerId:number}) => void;
    'network:passTurn': (data:{turn:number}) => void;
}