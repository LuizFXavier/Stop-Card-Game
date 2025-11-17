
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { PUBLIC_URL } from "$env/static/public";
import {API_KEY} from "$env/static/private"


export const actions = {
    signup: async({request})=>{
        try{
            const formData = await request.formData();
            
            const name:string = formData.get("name")?.toString() ?? "";
            const email:string = formData.get("email")?.toString() ?? "";
            const password:string = formData.get("password")?.toString() ?? "";

            const payload = {
                name:name,
                email:email,
                password:password,
            }
            const response = await fetch(`${PUBLIC_URL}/user/register`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'stop-api-key': `${API_KEY}`
                },
                body: JSON.stringify(payload)
            })
            
            if(!response.ok){
                return fail(response.status,{
                sucesso: false,
                mensagem: "Error on account creation."
                })
            }
            
            return{
                sucesso:true
            }
        }
        catch(e){
            return fail(500, { sucesso: false, mensagem: 'Error on server connecting.' });
        }
    
  }

} satisfies Actions;