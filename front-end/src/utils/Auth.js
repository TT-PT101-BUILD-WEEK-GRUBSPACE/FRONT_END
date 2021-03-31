import React, { useState, useEffect, createContext, useReducer } from 'react'
import { userReducer, initialState, SET_USER } from '../reducers/userReducer'


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    
    const [pending, setPending] = useState(true)
    const [state, dispatch] = useReducer(userReducer, initialState)

    useEffect(() => {
        const userId = localStorage.getItem("userId")
        const email = localStorage.getItem("email")
        const username = localStorage.getItem("username")

        const loggedUser = {
            userId,
            email,
            username
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