import JwtService from '../services/jwtService.js'


const auth = async (req, res, next) => {

    let authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "Username or password wrong!" });
    }

    const token = authHeader.split(' ')[1]
    console.log('token', token)

    try {
        const { _id, role } = await JwtService.verify(token);
        const user = {
            _id,
            role
        }

        console.log("user", user)
        req.user = user;
        next()

    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
}


export default auth