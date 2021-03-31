export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const SET_USER = 'SET_USER'
export const EDITING_USER = 'EDITING_USER'
export const UPDATE_USER = 'UPDATE_USER'

export const initialState = {
    editingUser: false,
    isAuthenticated: false,
    user: null,
    token: null,
}

export const userReducer = ( state, action ) => {
    switch (action.type ) {
        case USER_LOGIN: 
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('userId', action.payload.user_id)
        localStorage.setItem('email', action.payload.email)
        localStorage.setItem('username')
        return {
            ...state,
            isAuthenticated: true,
            user: {
                userId: action.payload.payload.userId,
                username: action.payload.payload.username
            }
        }
        case USER_LOGOUT:
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            localStorage.removeItem("email")
            localStorage.removeItem("username")
            return{
                ...state,
                isAuthenticated: false,
                user: null
            }
        case SET_USER:
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case EDITING_USER:
            return {
                ...state,
                editingUser: !state.editingUser,
            }
        case UPDATE_USER:
            localStorage.setItem('userId', Number(action.payload.userId))
            localStorage.setItem('email', action.payload.email)
            localStorage.setItem('username', action.payload.username)
            return{
                ...state,
                user: action.payload,
                editingUser: false,
            }
        default:
            return state;
}
}