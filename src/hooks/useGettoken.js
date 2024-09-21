import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
const useGettoken = () => {

    const [token, settoken] = useState(null)
    const tok = useSelector(state => state.user.currentUser.accessToken)
    useEffect(() => {
        console.log(tok)
        settoken(tok);
    }, [])
    
    return token
}

export default useGettoken 