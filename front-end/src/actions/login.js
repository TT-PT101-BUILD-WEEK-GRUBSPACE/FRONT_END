import { USER_LOGIN } from '../reducers/userReducer'

export const userLogin = (data) => {
    return { type: USER_LOGIN, payload: data }
}