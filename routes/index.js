
module.exports = function(app){

    app.get('/', (req, res) => {
        res.redirect('/pug');
    });

    const renderPugRoute = require('./renderPug');
    app.get('/pug', renderPugRoute.get);

    const renderEjsRoute = require('./renderEjs');
    app.get('/ejs', renderEjsRoute.get);
};