export function isAuthorised (req:any, res:any, next:any) {
    if (req &&
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization === 'admin') {
        next();
    } else {
        res.status(401).send()
    }
}