import { use } from "react"
import AuthContext from '../Context/AuthContext'


export const useAuth = ()=>{
    const authInfo = use(AuthContext)
    return authInfo
}

// export default useAuth

