import type { LayoutLoad } from "./$types";

export const load:LayoutLoad = ({params}) =>{
    console.log(params.roomID)
    return {
        post:{
            roomID:params.roomID
        }
    }
}