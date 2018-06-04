
exports.get = function(req, res){

    const start = new Date();
    res.render('main.ejs', (err, html) => {
        console.log(`Time for EJS render: ${new Date() - start}ms`);
        res.send(html);
    });
};