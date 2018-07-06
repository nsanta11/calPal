const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const passport = require('../../mongo-connector/passport');


router.post('/', (req, res) => {
    console.log('user signup');

    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/auth.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router

// router.post('/signup', passport.authenticate('local-signup', {
//     successRedirect : '/auth/profile',
//     failureRedirect : 'auth/signup'
// }));

// router.post('/login', passport.authenticate('local-login', {
//     successRedirect : '/auth/profile',
//     failureRedirect : '/auth/login'
// }));

// router.get('/profile', isLoggedIn, (req, res) => {
//     // get the user out of session and pass to template
//     res.render('profile.js', {
//         user : req.user 
//     });
//     res.status(200).json(req.user);
// });
// router.get('/logout', isLoggedIn, (req, res) => {
//     req.logout();
//     res.status(200).json({
//         'message': 'successfully logout'
//     });
// });

// module.exports = router;


//route middleware to ensure user is logged in
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated())
//         return next();
//     res.status(400).json({
//         'message': 'access denied'
//     });
// }
