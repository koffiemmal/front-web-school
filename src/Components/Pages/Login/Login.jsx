import { NavLink, useNavigate} from "react-router-dom";
import style from "../Login/Login.module.css"
import { useContext, useState } from "react";
import axios from "../../../api/axios";

import { UserContext } from "../../../Context/UserContextProvider";


const Login =()=>{



    let [emailInput,setEmailInput]=useState("")

    let [motDePasseInput,setMotDePasseInput]=useState("")

    let { auth, setAuth } = useContext(UserContext) || {};
    
    let navigate = useNavigate()

    return(

        <div className={style.container}>


<form className={style.formulaire} onSubmit={(e)=>{
    e.preventDefault()
    let Connection = {email_user:emailInput,motdepasse_user:motDePasseInput}
    axios.post("/user/getidForName",Connection)
    .then((res)=>{
        console.log(res.data);
       console.log(res.data.nom_user)
        localStorage.setItem('nomUtilisateur',res.data.nom_user )

})

    axios.post("/user/login",Connection)
    .then((res)=>{
      
        console.log(res.data);
        
        setAuth({...auth,token:res.data.accessToken}); 
        
            localStorage.setItem('accessToken', res.data.accessToken);
         
            localStorage.setItem('id_user',res.data.id_user)
         
            navigate({pathname: "/AcceuilConnect", state: { nomUtilisatuer: res.data.nom_user }})
  

        
    })
    .catch((error)=>{
        console.log(error);
      
    })


    axios.post("/user/loginAdmin",Connection)
    .then((res)=>{
        console.log(res.data);
        setAuth({...auth,token:res.data.accessToken}); 
        navigate("/Admin")
    })

}}>
    <table>
        <tbody>
         
            <tr>
                <td>
                    <label htmlFor="email">Email :</label><br />
                    <input type="email" name="email" id="email" required placeholder="example@exxxx.ccc" onInput={(e)=>{
                        setEmailInput(e.target.value)
                    }}/>
                </td>
            </tr>
          
       
            <tr>
                <td>
                    <label htmlFor="motdepasse">Mot de passe :</label><br />
                    <input type="password" name="motdepasse" id="motdepasse" required placeholder="password.." onInput={(e)=>{
                        setMotDePasseInput(e.target.value)
                    }}/>
                </td>
            </tr>
            <tr>
               <td>
               <button type="submit">Se Connecter</button><br />
               <p>Vous n'avez pas encore de comptes <br />
                 alors <NavLink to={"/signin"}>INSCRIVEZ VOUS!!!</NavLink></p>
               </td>
            </tr>
        </tbody>
    </table>
</form>


        </div>

    )
}

export default Login;

