const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/users.model');


router.route('/').get((req, res) => {
    Users.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json('Error: ' + err));
    }
);

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashed = bcrypt.hashSync(password, 10);

    const newUser = new Users({
        name,
        email,
        password:hashed,
    });

    newUser
        .save()
        .then(() => res.json('User added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    }
);

router.route('/:id').get((req, res) => {
    Users.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) =>
            res.status(400).json(`User with id ${req.params.id} not found`)
        );
    }
);

router.route('/:id').delete((req, res) => {
    Users.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch((err) =>
            res.status(400).json(`User with id ${req.params.id} not found`)
        );
    }
);

router.route('/update/:id').post((req, res) => {
    Users.findById(req.params.id)
        .then((user) => {
            user.name = req.body.name ? req.body.name : user.name;
            user.email = req.body.email ? req.body.email : user.email;
            user.password = req.body.password ? req.body.password : user.password;

            user
                .save()
                .then(() => res.json('User updated!'))
                .catch((err) => res.status(400).json('Error: ' + err));
        }
        )
        .catch((err) =>
            res.status(400).json(`User with id ${req.params.id} not found`)
        );
    }
);

//login
router.route('/login').post((req, res) => {
    Users.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const validPassword = bcrypt.compareSync(req.body.password, user.password);
            if(!validPassword){
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign({ id: user._id ,email:user.email}, "DANIEL_KEY_67", { expiresIn: '1w' });
            res.status(200).send({sucess:true, user, token });
        }
        )
        .catch((err) => res.status(400).json('Error: ' + err));
    }
);




module.exports= router;
    