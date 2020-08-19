const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
    check,
    validationResult
} = require('express-validator');


const User = require('../../models//User');


// -------------------------SIGNUP--------------------------
// @route   GET api/users
// @desc    Register Route
// @access  Public

router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('name', 'Name must be 3 character long').isLength({
            min: 3
        }),
        check('email', 'Please include a valid email').isEmail(),
        check('password').isLength({
            min: 5
        }).withMessage('Password must be at least 5 chars long').matches(/\d/).withMessage('Password must contain a number')


    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const {
            name,
            email,
            password
        } = req.body;

        try {
            // see if user exists
            // NOTE : ANYTHING WHICH RETURNS A PROMISE ,WE PLACE "await" infront of it

            let user = await User.findOne({
                email
            });

            if (user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'User alraedy exists'
                    }]
                })
            }

            // user doesnt exists so
            // Get user Avatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm',
            });

            user = new User({
                name,
                email,
                avatar,
                password
            });

            // Encrypt Password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            // Json Web Token
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'), {
                    expiresIn: '5d'
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token
                    })
                })


            // res.send(token);

        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }

        // console.log(req.body);
    });

module.exports = router