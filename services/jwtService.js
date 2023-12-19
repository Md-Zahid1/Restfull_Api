import { JWT_SECRET } from "../config/index.js";
import  Jwt  from "jsonwebtoken";

class JwtService {
    static sign(payload, expiry = '1h', secret = JWT_SECRET) {
       return Jwt.sign(payload, secret, {expiresIn: expiry})
    }

    static verify(token, secret = JWT_SECRET) {
        return Jwt.verify(token, secret)
    }
}



export default JwtService