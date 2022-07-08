const router = require('express').Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Owner:
 *       type: object
 *       required:
 *         - name
 *         - nationalID
 *         - phoneNumber
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The owner name
 *         nationalID:
 *           type: string
 *           description: The owner nationalID
 *         phoneNumber:
 *           type: string
 *           description: The owner phoneNumber
 *         address:
 *           type: string
 *           description: The owner address
 *       example:
 *         id: d5fE_asz
 *         name: Daniel
 *         nationalID: 12002455789989
 *         phoneNumber: 078888787
 *         address: kigali
 */
/**
  * @swagger
  * tags:
  *   name: Owners
  *   description: The owners managing API
  */

const Owner = require('../models/owners.model');
const { authentication } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /owners:
 *   get:
 *     summary: Returns the list of all the owners
 *     tags: [Owners]
 *     responses:
 *       200:
 *         description: The list of the owners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Owner'
 */
 router.route('/').get( (req, res) => {
    Owner.find()
      .then((owners) => res.json(owners))
      .catch((err) => res.status(400).json('Error: ' + err));
  });

  
/**
 * @swagger
 * /owners/add:
 *   post:
 *     summary: Create a new owner
 *     tags: [Owners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     responses:
 *       200:
 *         description: The owner was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       500:
 *         description: Some server error
 */

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const nationalID = req.body.nationalID;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
  
    const newOwner = new Owner({
      name,
      nationalID,
      phoneNumber,
      address,
    });
  
    newOwner
      .save()
      .then(() => res.json('Owner added!'))
      .catch((err) => res.status(400).json('Error: ' + err));
  });

  
/**
 * @swagger
 * /owners/{id}:
 *   get:
 *     summary: Get the owner by id
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The owner id
 *     responses:
 *       200:
 *         description: The owner description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       404:
 *         description: The student was not found
 */

router.route('/:id').get((req, res) => {
    Owner.findById(req.params.id)
      .then((owner) => res.json(owner))
      .catch((err) =>
        res.status(400).json(`Owner with id ${req.params.id} not found`)
      );
  });
  

  
/**
 * @swagger
 * /owners/{id}:
 *   delete:
 *     summary: Remove the owner by id
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The owner id
 * 
 *     responses:
 *       200:
 *         description: The owner was deleted
 *       404:
 *         description: The owner was not found
 */


router.route('/:id').delete((req, res) => {
    Owner.findByIdAndDelete(req.params.id)
      .then(() => res.json('Owner deleted.'))
      .catch((err) =>
        res.status(400).json(`Owner with id ${req.params.id} not found`)
      );
  });
  
  
/**
 * @swagger
 * /owners/update/{id}:
 *  put:
 *    summary: Update the owner by the id
 *    tags: [Owners]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The owner id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Owner'
 *    responses:
 *      200:
 *        description: The owner was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Owner'
 *      404:
 *        description: The owner was not found
 *      500:
 *        description: Some error happened
 */

router.route('/update/:id').put((req, res) => {
    Owner.findById(req.params.id)
      .then((owner) => {
        owner.name = req.body.name ? req.body.name : owner.name;
        owner.nationalID = req.body.nationalID ? req.body.nationalID : owner.nationalID;
        owner.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : owner.phoneNumber;
          owner.phone = req.body.address ? req.body.address : owner.address;
  
          owner
          .save()
  
          .then(() => res.json('Owner updated!'))
          .catch((err) => res.status(400).json('Error: ' + err));
      })
      .catch((err) => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;
  