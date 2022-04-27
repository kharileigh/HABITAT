/**
 * Logs the HTTP method & route for each request
 * 
 * @param {object} req Express Request object 
 * @param {object} res Express Response object
 * @param {function} next Express function
 */
 function logRoutes (req, res, next) {
    
    console.log(req.method, req.originalUrl);

    next();
}

module.exports = logRoutes;