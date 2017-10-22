var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    /*  
     *   DELETE one blog; URL: /blog/id 
     */
    app.delete('/blog/:id', function (req, res) {
        var id = req.params.id;
        var details = {
            '_id': new ObjectID(id)
        };
        db.collection('blog').remove(details, function (err, item) {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(item);
            }
        });
    });
    /*  
     *   PUT one blog; URL: /blog/id 
     */
    app.put('/blog/:id', function (req, res) {
        var id = req.params.id;
        var details = {
            '_id': new ObjectID(id)
        };
        var blog = {
            'title': req.body.title
            , 'text': req.body.text
        }
        db.collection('blog').update(details, blog, function (err, result) {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(result);
            }
        });
    });
    /*  
     *   POST one blog; 
     *   URL: /blog/
     *   Cotent-Type: application/json
     *   JSON Create Example:
     *   {
     *        "text": "outro",
     *        "title": "teste"
     *   }
     *
     */
    app.post('/blog', function (req, res) {
        tokenize(req, res);
        db.collection('blog').insert(req.body, function (err, result) {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                //   res.send(result.ops[0]);
            }
        });
    });
};