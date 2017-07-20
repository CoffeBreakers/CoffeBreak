module.exports = function(app, db) 
{
    app.get("/", function(req, res)
    {
        res.send("./public/index.html");
    })

    app.get('/profile', function(req, res)
    {
        res.send("./public/index.html");
    })

    app.get('/login', function(req, res)
    {
        res.send("./public/index.html");
    })
}