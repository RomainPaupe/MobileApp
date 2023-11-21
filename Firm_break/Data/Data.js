import { createContext, useState } from "react"

const userContext = createContext();

const UserProvider = ({children}) =>{
    const [user, setUser] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        profilePicture:'https://www.nailseatowncouncil.gov.uk/wp-content/uploads/blank-profile-picture-973460_1280.jpg',
    })

    return(
        <userContext.Provider value={[user, setUser]}>
            {children}
        </userContext.Provider>
    )
}

export {userContext, UserProvider}