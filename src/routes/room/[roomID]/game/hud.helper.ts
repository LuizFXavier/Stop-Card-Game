import type { JoinData } from "$lib/refactor/types/InitData";

export type Variant = "bottom" | "right" | "top" | "left";

export function positionInfo(joinData:JoinData){
    const mainPlayerID = joinData.identifier;
    const variants:Variant[] = ["bottom", "right", "top", "left"]; 
        
    const playerList = joinData.players;

    playerList.sort((a, b)=>{return a.id - b.id});

    const mainIndex = playerList.map(a => a.id).indexOf(mainPlayerID);

    let mappedPlayers:{name:string, variant:Variant}[] = []

    let c = 0;
    let isTwoPlayers = playerList.length === 2 ? 1 : 0;
    for(let i = mainIndex; c < playerList.length + isTwoPlayers; i = (i+1) % playerList.length){
        
        mappedPlayers.push({name:playerList[i].name, variant:variants[c]})
        
        c = c + 1 + isTwoPlayers;
    }

    return mappedPlayers;
}