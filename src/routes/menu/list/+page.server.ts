import { API_KEY } from "$env/static/private";
import { PUBLIC_URL } from "$env/static/public";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../../$types";

interface Room{
    id:string,
    size:number;
}

export const load : PageServerLoad = async()=>{
    try{
        const response = await fetch(`${PUBLIC_URL}/room/list/public`,{
        method: 'GET',
        headers:{
        'stop-api-key': `${API_KEY}`
        }
    })
    const responseData = await response.json();
    const rooms:Room[] = responseData.rooms;
    
    if(!response.ok){
        return fail(response.status,{
        sucesso: false,
        mensagem: "Error on rooms fetching."
        })
    }

    console.log(responseData)
    
    return{
        sucesso:true,
        rooms:rooms as {id:string, size:number}[]
    }
    }
    catch(e){
        return fail(500, { sucesso: false, mensagem: 'Error on server connecting.' });
    }
}