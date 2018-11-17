/**
 * Created by Rajesh on 11/14/18.
 */

module.exports = {

    view: function (req, res) {
        req.session.userId = 'Apple';
        console.log(req.session);
        res.render('login');
    },

    submit: function (req, res) {
        console.log(req.session.userId);
        res.render('login');
    }
};