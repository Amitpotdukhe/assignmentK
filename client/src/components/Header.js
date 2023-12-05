import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';

const Header = () => {


    const [user, setUser] = useState("")
    const [flag, setFlag] = useState(false)

    const logout = () => {
        Cookies.remove("userJwt");
        setUser("");
        setFlag(!flag);
    }

    useEffect(() => {
        const x = Cookies.get("userJwt")
        console.log(x);
        if (x.length > 0) {
            setFlag(true);
        } else {
            setFlag(false);
        }
        console.log("flag :", flag);
    }, [])

    return (
        <div>

            {flag ? <><Link to="/createPost">Create Post</Link>   <Link onClick={logout}>Logout</Link> </> : <Link to="/login">Login</Link>}
        </div>
    )
}

export default Header