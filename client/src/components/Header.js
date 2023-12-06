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
        if (x) {
            setFlag(true);
        } else {
            setFlag(false);
        }
        console.log("flag :", flag);
    }, [])

    return (
        <div className="">

            {flag ? <><Link className='btn' to="/createPost">Create Post</Link>   <Link className='btn' onClick={logout}>Logout</Link> </> : <><Link className='btn' to="/login">Login</Link> <Link className='btn' to="/signup">Signup</Link></>}
        </div>
    )
}

export default Header