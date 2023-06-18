<<<<<<< HEAD
import jwt  from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

    if (token) {
        try {
const decoded = jwt.verify(token, "confid123")
req.userId = decoded._id;
next();
        }
        catch (e) {
            return res.status(403).json({
                /* message: "Нет доступа" */
                message: "No access"
            })
        }

    } else {
       return res.status(403).json({
            /* message: "Нет доступа" */
            message: "No access"
        })
    }

    
    


}
=======
import jwt  from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

    if (token) {
        try {
const decoded = jwt.verify(token, "confid123")
req.userId = decoded._id;
next();
        }
        catch (e) {
            return res.status(403).json({
                /* message: "Нет доступа" */
                message: "No access"
            })
        }

    } else {
       return res.status(403).json({
            /* message: "Нет доступа" */
            message: "No access"
        })
    }

    
    


}
>>>>>>> 4566e7ad33f9df687c5bf31d689ec6252e3d8d3a
