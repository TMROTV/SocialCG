module.exports = function(req, res, next) {
    // respond with html page
    if (req.accepts('html')) {
        res.sendFile('./build/index.html', {root: __dirname+'/../../'});
        return;
    }
    res.status(404);
    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
};