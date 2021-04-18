import React, { useState, useEffect, createContext, useReducer } from 'react'
import { userReducer, initialState, SET_USER } from '../reducers/userReducer'


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    
    const [pending, setPending] = useState(true)
    const [state, dispatch] = useReducer(userReducer, initialState)

    useEffect(() => {
        const user_id = localStorage.getItem("userId")
        const user_email = localStorage.getItem("email")
        const user_username = localStorage.getItem("username")

        const loggedUser = {
            user_id,
            user_email,
            user_username
        }

        dispatch({type: SET_USER, payload: loggedUser})

        setPending(false)
    },[])

    if(pending) {
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}