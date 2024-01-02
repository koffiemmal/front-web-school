import {NavLink} from "react-router-dom";
import React, { useContext } from 'react';
import { UserContext } from "../../../Context/UserContextProvider";
import { Outlet } from "react-router-dom";
import style from "../HomeLayout/Header.module.css"
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "../../../api/axios";


const Header = ({nom}) => {



    let nomUtilisatuer = localStorage.getItem('nomUtilisateur')

//fixation de l'accestoken

let { auth, setAuth } = useContext(UserContext) || {};

useEffect(()=>{

  const stockAccessToken = localStorage.getItem('accessToken')


  if(stockAccessToken){

    setAuth({...auth,token:stockAccessToken})

  }

},[])


   let [nomSug,setNomSug]=useState("")
   let [aviSug,setAviSug]=useState("")
 
    
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('nomUtilisateur')
        setAuth({...auth,token:null});
        navigate('/');
    };


    let navigate = useNavigate()
    return(
<div>
        <div className={style.header}>
   <div className={style.logoEcole}>
   </div>

   <div className={style.navbar}>
<span className={style.acceuil} ><NavLink to={"/"}>Acceuil</NavLink></span>
    <span><NavLink to={"/Filiere"}>Formation</NavLink></span>
    <span><NavLink to={"Activite"}>Activite</NavLink></span>
    <span><NavLink to={"/Chat"}>Salon</NavLink></span>
    <span><NavLink to={"/Apropos"}>Apropos</NavLink></span>

   </div>
   <div className={style.loginAndName}>
        {nomUtilisatuer?(
            <div className={style.username}>
              <span>Bonjour  {nomUtilisatuer} </span>
              <button className={style.login}type='button' onClick={handleLogout}>
                <div className={style.iconesdeconnexion}></div>
              </button>
            </div>
          ) : (
            <div className={style.login}>
              <span>
                <NavLink to='/Login'>Login</NavLink>
              </span>
            </div>
          )} 
         
        </div>
    

        </div>
        <Outlet/>
     

        <footer>
    <div className={style.footer}>
    <div className={style.aboutUs}>
        <h2>En savoir plus</h2>
      <p>Lorem ipsum dolor sit, <br /> amet consecteturbr <br /> adipisicing elit. Consectetur, ex! Lorem <br /> ipsum, dolor sit amet consectetur adipisicing <br /> elit. Dicta eius fuga enim perferendis laborum ullam.</p>
      <h2>Contact</h2>
    
      <p>+2824342488483 <br />jidi@"jnn.com"
        
      </p>
    </div>
    <div className={style.ourservices}>
        <h2>
            Nos services
        </h2>
   
        <ul className={style.ul}>
            <li>Creation d'article</li> 
            <li>Chat entre etudiant</li>
            <li>redirection authentification</li>
            <li>connexion a la BD</li>
            <li>Parties filieres</li>
            <li> Partie Cours</li>
            <li>Page d'acceuil</li>
        </ul>
        
    </div>
    <div className={style.amelioration}>
        <h2>Suggestion</h2><br />
        <form onSubmit={(e)=>{
          e.preventDefault()
          let Suggestion={nom_suggetion:nomSug,commentaire:aviSug}
          console.log(Suggestion)
   axios.post("/user/suggestion",Suggestion)
          .then((res)=>{
            console.log("success suggesion")
          }) 
        
        }}>
            <table>
                <tbody>
                    <tr>
                        <td><input type="text" id="nom" placeholder="entrer votre nom.." onInput={(e)=>{
                          setNomSug(e.target.value)
                        }}/><br /> <br />
                      <textarea name="" id="" cols="30" rows="10" placeholder="vos avis" onInput={(e)=>{
                        setAviSug(e.target.value)
                      }}></textarea></td>
                    </tr>
                    <tr>
                      <td>
                        <button type="submit">Envoyer</button>
                      </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    </div>
    <div className={style.copyright}>
        <p>&copy; 2023 Messan. Tous droits reservés</p>
    </div>
    
</footer>
        </div>


    )
}

export default Header