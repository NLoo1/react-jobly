import JoblyApi from "./api";
import { useState, useEffect } from "react";


export function Profile({currentUser, token}){

    const [isLoaded, setIsLoaded] = useState(false)
    const [userData, setUserData] = useState(null)

    useEffect( () => {
        async function getProfile(){
            const resp = await JoblyApi.getUser(currentUser, token)
            setUserData(resp)
        }
        getProfile()
        setIsLoaded(true)
        }
    , [isLoaded])
    return(
        <section>
            {isLoaded ? 
            <section>
                I loaded 
                </section>    
            :
            <section>I have not loaded :(</section>
        }
        </section>
    )
}