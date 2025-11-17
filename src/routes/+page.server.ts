
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { PUBLIC_URL } from "$env/static/public";
import {API_KEY} from "$env/static/private"

interface User{
    id:string,
    name:string
}


export const actions = {
    joinGuest: async({cookies})=>{
        try{
            const response = await fetch(`${PUBLIC_URL}/user/create/guest`,{
            method: 'POST',
            headers:{
            'stop-api-key': `${API_KEY}`
            }
        })
        const responseData = await response.json();
        const user:User = responseData.user;
        
        if(!response.ok){
            return fail(response.status,{
            sucesso: false,
            mensagem: "Erro ao entrar."
            })
        }
        cookies.set("userID", user.id, {
            path:'/',
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24
        })
        cookies.set("userName", user.name, {
            path:'/',
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24
        })
        console.log(user)
        
        return{
            sucesso:true
        }
        }
        catch(e){
            return fail(500, { sucesso: false, mensagem: 'Error on server connecting.' });
        }
    
  }

} satisfies Actions;