
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { PUBLIC_URL } from "$env/static/public";
import {API_KEY} from "$env/static/private"

export const load : PageServerLoad = async({cookies})=>{
    const userID = cookies.get("userID");
    const userName = cookies.get("userName");

    if(!userID || !userName){
        return {
            hasLogin:false
        }
    }
    return {
        hasLogin:true,
        userName:userName
    }
}

export const actions = {
    createRoom: async({request, cookies})=>{
        const allRules = ["6", "7", "8", "9", "10", "Q", "J", "tirar10", "as", "coringa"]
        
        try{
            const userID = cookies.get("userID")!;
            const formData = await request.formData();

            const rules: [string, number][] = allRules.map(chave => {
            // Se formData.has(chave) for true, retorna 1. Se false, retorna 0.
                return [chave, formData.has(chave) ? 1 : 0];
            });

            const password:string = formData.get("password")?.toString() ?? "";
            const numCards:number = Number(formData.get("numCards"))
            rules.push(["numCartas", numCards])

            console.log(rules)

            const payload = {
                userID:userID,
                password:password,
                rules:rules
            }
            
            const response = await fetch(`${PUBLIC_URL}/room/create`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'stop-api-key': `${API_KEY}`
                },
                body: JSON.stringify(payload)
            })

            const responseData = await response.json();
            const roomID = responseData.roomID;

            console.log(responseData)
            
            return{
                sucesso:true,
                roomID:roomID
            }
        }
        catch(e){
            return fail(500, { sucesso: false, mensagem: 'Error on server connecting.' });
        }
    
  }

} satisfies Actions;