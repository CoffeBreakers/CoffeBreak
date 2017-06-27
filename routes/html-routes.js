module.exports = function(app, db) 
{
    app.get("/", function(req, res)
    {
        res.send("./public/index.html");
    })
}