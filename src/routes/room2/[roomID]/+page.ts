import type { PageLoad } from "../$types";

export const load:PageLoad = ({params}) =>{
    console.log(params.roomID)
    return {
        post:{
            roomID:params.roomID
        }
    }
}