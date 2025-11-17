import type { LayoutServerLoad } from './$types';

export const load : LayoutServerLoad = async({cookies})=>{
    const userID = cookies.get("userID");
    const userName = cookies.get("userName");

    if(!userID || !userName){
        return {
            hasLogin:false
        }
    }
    return {
        hasLogin:true,
        userName:userName,
        userID:userID
    }
}