import jwtToken from 'jsonwebtoken';
import config from '../config';
import jwt_decode from "jwt-decode";

const createToken = (id: number, type: string) => {
    return jwtToken.sign({ id, type }, config.JWT.SECRET_KEY as string, { expiresIn: config.JWT.EXPIRES_IN });
}

const decodeToken = (token:string) => {
    return jwt_decode(token);
}

export default {
    createToken,
    decodeToken
};