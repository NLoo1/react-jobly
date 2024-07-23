import { Card, CardBody, CardTitle } from "reactstrap";
import JoblyApi from "./api";
import { useState, useEffect } from "react";
import { CardComponent } from "./routesList";


export function Profile({currentUser, token}){

    const [isLoaded, setIsLoaded] = useState(false)
    const [userData, setUserData] = useState(null)


    // console.log(localStorage)
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
            {isLoaded && userData ? 
            <section>
                {/* {console.log(userData)} */}


                <CardComponent type="users" user={userData.user.username} />
                </section>    
            :
            <section>I have not loaded :(</section>
        }
        </section>
    )
}