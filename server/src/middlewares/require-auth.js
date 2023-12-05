import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
    try {
        const token = req.cookies.userJwt;
        console.log(token);
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        const data = jwt.verify(token, process.env.JWT_KEY);
        req.user = data
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "error occured" })
    }
}

export { authUser }