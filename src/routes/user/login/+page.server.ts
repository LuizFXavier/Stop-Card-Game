
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { PUBLIC_URL } from "$env/static/public";
import {API_KEY} from "$env/static/private"

interface User{
    id:string,
    name:string
}

export const actions = {
    login: async({request, cookies})=>{
        try{
            const formData = await request.formData();
            
            const email:string = formData.get("email")?.toString() ?? "";
            const password:string = formData.get("password")?.toString() ?? "";

            const payload = {
                email:email,
                password:password,
            }
            const response = await fetch(`${PUBLIC_URL}/user/login`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'stop-api-key': `${API_KEY}`
                },
                body: JSON.stringify(payload)
            })

            console.log(response)
            
            if(!response.ok){
                return fail(response.status,{
                sucesso: false,
                mensagem: "Error on login attempt."
                })
            }

            const responseData = await response.json();
            const user:User = responseData.user;

            cookies.set("userID", user.id, {
                path:'/',
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 7
            })
            cookies.set("userName", user.id, {
                path:'/',
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 7
            })
            
            return{
                sucesso:true
            }
        }
        catch(e){
            return fail(500, { sucesso: false, mensagem: 'Error on server connecting.' });
        }
    
  }

} satisfies Actions;