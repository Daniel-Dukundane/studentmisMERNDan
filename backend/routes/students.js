const router = require('express').Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - classname
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The name of the student
 *         email:
 *           type: string
 *           description: The email of the student
 *         classname:
 *           type: string
 *           description: The classname of the student
 *         phone:
 *           type: string
 *           description: The phone of the student
 *       example:
 *         id: d5fE_asz
 *         name: The New Turing Omnibus
 *         email: Alexander K. Dewdney
 *         classname: CS-101
 *         phone: (123) 456-7890
 */
/**
  * @swagger
  * tags:
  *   name: Students
  *   description: The students managing API
  */



const { authentication } = require('../middlewares/auth.middleware');
const Student = require('../models/student.model');

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Returns the list of all the students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: The list of the students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.route('/').get((req, res) => {
  Student.find()
    .then((students) => res.json(students))
    .catch((err) => res.status(400).json('Error: ' + err));
});

/**
 * @swagger
 * /students/add:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: The student was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       500:
 *         description: Some server error
 */

router.route('/add').post(authentication, (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const classname = req.body.classname;
  const phone = req.body.phone;

  const newStudent = new Student({
    name,
    email,
    classname,
    phone,
  });

  newStudent
    .save()
    .then(() => res.json('Student added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/search').get((req, res) => {
  Student.find({
    $or: [
      { name: new RegExp(req.query.text, 'ig') },
      { email: new RegExp(req.query.text, 'ig') },
    ],
  })
    .then((students) => res.json(students))
    .catch((err) => res.status(500).json(`something went wrong`));
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get the student by id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The student id
 *     responses:
 *       200:
 *         description: The student description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: The student was not found
 */

router.route('/:id').get((req, res) => {
  Student.findById(req.params.id)
    .then((student) => res.json(student))
    .catch((err) =>
      res.status(400).json(`Student with id ${req.params.id} not found`)
    );
});


/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Remove the student by id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The student id
 * 
 *     responses:
 *       200:
 *         description: The student was deleted
 *       404:
 *         description: The student was not found
 */


router.route('/:id').delete((req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(() => res.json('Student deleted.'))
    .catch((err) =>
      res.status(400).json(`Student with id ${req.params.id} not found`)
    );
});

/**
 * @swagger
 * /students/update/{id}:
 *  post:
 *    summary: Update the student by the id
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The student id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Student'
 *    responses:
 *      200:
 *        description: The student was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The Student was not found
 *      500:
 *        description: Some error happened
 */

router.route('/update/:id').post((req, res) => {
  Student.findById(req.params.id)
    .then((student) => {
      student.name = req.body.name ? req.body.name : student.name;
      student.email = req.body.email ? req.body.email : student.email;
      student.classname = req.body.classname
        ? req.body.classname
        : student.classname;
      student.phone = req.body.phone ? req.body.phone : student.phone;

      student
        .save()

        .then(() => res.json('Student updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
