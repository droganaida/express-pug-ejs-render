
async function setVariables(req, res, next) {
    res.locals.printArray = ['Hello', 'CAT', 'Pug is awesome', 'EJS is cool', 'BlondieCode', 'Random', 'BANANAS', 'JavaScript', 'happy coding'];
    res.locals.colorArray = ['011936', 'B38CC9', '465362', '82A3A1', 'C0DFA1'];
    res.locals.sizeArray = [200, 100, 300, 250, 380, 450, 500, 150];
    await next();
}

module.exports.setVariables = setVariables;