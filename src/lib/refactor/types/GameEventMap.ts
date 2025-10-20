export type GameEventMap = {
    'player:buyStack': (player:{id:Number}) => void;
    'player:buyDiscard': (player:{id:Number}) => void;
    'player:discard': (player:{id:Number}) => void;
    'player:exchangeCard': (card:{index:Number}) => void;
    'player:cut': (data:{playerId:Number, cardIndex:Number}) => void;

    'network:buy': (data:{playerId:Number, card:{value:Number, suit:String}}) => void;
    
}