import type { JoinConfigDTO } from "$lib/refactor/types/socket/room.dto";

export type Variant = "bottom" | "right" | "top" | "left";

export function positionInfo(joinData:JoinConfigDTO){
    const mainPlayerID = joinData.identifier;
    const variants:Variant[] = ["bottom", "right", "top", "left"]; 
        
    const playerList = joinData.players;

    playerList.sort((a, b)=>{return a.id - b.id});

    const mainIndex = playerList.map(a => a.id).indexOf(mainPlayerID);
    console.log("mainIndex", mainIndex)
    console.log("ideny", mainPlayerID)
    let mappedPlayers:{name:string, variant:Variant, shiny:boolean}[] = []

    let c = 0;
    let isTwoPlayers = playerList.length === 2 ? 1 : 0;
    for(let i = mainIndex; c < playerList.length + isTwoPlayers; i = (i+1) % playerList.length){
        
        mappedPlayers.push({name:playerList[i].name, variant:variants[c], shiny:false})
        
        c = c + 1 + isTwoPlayers;
    }
    console.log("Listado:", playerList)
    console.log("Mapado:", mappedPlayers)


    return mappedPlayers;
}