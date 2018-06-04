
exports.get = function(req, res){

    const start = new Date();
    res.render('main', (err, html) => {
        console.log(`Time for Pug render: ${new Date() - start}ms`);
        res.send(html);
    });
};