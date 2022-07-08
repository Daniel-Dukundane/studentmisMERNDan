const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - nationalID
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         phone:
 *           type: string
 *           description: The user phone number
 *         nationalID:
 *           type: string
 *           description: The user national ID
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         id: d5fE_asz
 *         name: Daniel
 *         email: dan@gmail.com
 *         phone: 078888787
 *         nationalID: 122002334343
 *         password: 123456789
 */
/**
  * @swagger
  * tags:
  *   name: Users
  *   description: The users managing API
  */
const Users = require('../models/users.model');
const { authentication } = require('../middlewares/auth.middleware');


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.route('/').get((req, res) => {
    Users.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json('Error: ' + err));
    }
);


/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const nationalID = req.body.nationalID;
    const password = req.body.password;

    const hashed = bcrypt.hashSync(password, 10);

    const newUser = new Users({
        name,
        email,
        phone,
        nationalID,
        
        password:hashed,
    });

    newUser
        .save()
        .then(() => res.json('User added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    }
);


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

router.route('/:id').get((req, res) => {
    Users.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) =>
            res.status(400).json(`User with id ${req.params.id} not found`)
        );
    }
);


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

router.route('/:id').delete((req, res) => {
    Users.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch((err) =>
            res.status(400).json(`User with id ${req.params.id} not found`)
        );
    }
);

/**
 * @swagger
 * /users/update/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

router.route('/update/:id').put((req, res) => {
    Users.findById(req.params.id)
        .then((user) => {
            user.name = req.body.name ? req.body.name : user.name;
            user.email = req.body.email ? req.body.email : user.email;
            user.phone = req.body.phone ? req.body.phone : user.phone;
            user.nationalID = req.body.nationalID ? req.body.nationalID : user.nationalID;
            
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
    