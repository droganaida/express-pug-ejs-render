
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const common = require('./common');

let app = express();
app.set('views', __dirname + '/templates');
app.set('view engine', 'pug');

// ------- render post processing
app.use((req, res, next) => {

    const render = res.render;
    res.render = function (view, in_options, fn) {

        let self = this;
        let options = in_options || {};
        const req = this.req;
        let defaultFn;

        if (typeof options == 'function') {
            fn = options;
            options = {};
        }
        defaultFn = (err, str) => {
            if (err) return req.next(err);
            self.send(str);
        };
        if (typeof fn != 'function') {
            fn = defaultFn;
        }

        render.call(self, view, options, (err, html) => {

            const minify = require('html-minifier').minify;
            let result = html;
            try {
                result = minify(html, {
                    removeAttributeQuotes: true,
                    minifyCSS: true,
                    collapseWhitespace: true
                });
            } catch (err) {}
            fn(err, result);
        });
    };
    next();
});

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(common.setVariables);

require('./routes')(app);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message
    });
});
app.use((req, res, next) => {
    res.status(404);
    res.render('error', {
        message: 'Not found'
    });
});

const httpServer = http.createServer(app);
const port = 3000;
httpServer.on('listening', () => {
    console.log(`Listening on port ${port}`)
});
httpServer.listen(port, '127.0.0.1');