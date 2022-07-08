const router = require('express').Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - owner
 *         - chasisNumber
 *         - company
 *         - year
 *         - price
 *         - plateNumber
 *         - modelname
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         owner:
 *           type: string
 *           description: The owner name
 *         chasisNumber:
 *           type: string
 *           description: The vehicle chasis number
 *         company:
 *           type: string
 *           description: The vehicle manufacture company
 *         year:
 *           type: string
 *           description: The vehicle manufacture year
 *         price:
 *           type: string
 *           description: The vehicle price
 *         plateNumber:
 *           type: string
 *           description: The vehicle plate number
 *         modelname:
 *           type: string
 *           description: The vehicle model name
 *       example:
 *         id: d5fE_asz
 *         owner: Daniel
 *         chasisNumber: AN12334
 *         company: Toyota
 *         year: 2005
 *         price: 13 million
 *         plateNumber: RAC234M
 *         modelname: Toyota RAV4
 */
/**
  * @swagger
  * tags:
  *   name: Vehicles
  *   description: The owners managing API
  */

const Vehicle = require('../models/vehicle.model');
const { authentication } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Returns the list of all the vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: The list of the vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 */
 router.route('/').get((req, res) => {
    Vehicle.find()
      .then((vehicles) => res.json(vehicles))
      .catch((err) => res.status(400).json('Error: ' + err));
  });

  
/**
 * @swagger
 * /vehicles/add:
 *   post:
 *     summary: Add  new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: The vehicle was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       500:
 *         description: Some server error
 */

router.route('/add').post((req, res) => {
    const owner = req.body.owner;
    const chasisNumber = req.body.chasisNumber;
    const company = req.body.company;
    const year = req.body.year;
    const price = req.body.price;
    const plateNumber = req.body.plateNumber;
    const modelname = req.body.modelname;

  
    const newVehicle = new Vehicle({
        owner,
        chasisNumber,
        company,
        year,
        price,
        plateNumber,
        modelname,
    });

    newVehicle.save()
        .then(() => res.json('Vehicle added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
}
);
  

  
/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Get the vehicle by id
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The vehicle id
 *     responses:
 *       200:
 *         description: The vehicle description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: The vehicle was not found
 */

router.route('/:id').get((req, res) => {
    Vehicle.findById(req.params.id)
      .then((vehicle) => res.json(vehicle))
      .catch((err) =>
        res.status(400).json(`Vehicle with id ${req.params.id} not found`)
      );
  });
  

  
/**
 * @swagger
 * /vehicle/{id}:
 *   delete:
 *     summary: Remove the vehicle by id
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The vehicle id
 * 
 *     responses:
 *       200:
 *         description: The vehicle was deleted
 *       404:
 *         description: The vehicle was not found
 */


router.route('/:id').delete((req, res) => {
    Vehicle.findByIdAndDelete(req.params.id)
      .then(() => res.json('Vehicle deleted.'))
      .catch((err) =>
        res.status(400).json(`Vehicle with id ${req.params.id} not found`)
      );
  });
  
  
/**
 * @swagger
 * /vehicles/update/{id}:
 *  put:
 *    summary: Update the vehicle by the id
 *    tags: [Vehicles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The vehicle id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Vehicle'
 *    responses:
 *      200:
 *        description: The vehicle was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Vehicle'
 *      404:
 *        description: The owner was not found
 *      500:
 *        description: Some error happened
 */

router.route('/update/:id').put((req, res) => {
    Vehicle.findById(req.params.id)
      .then((vehicle) => {

        vehicle.owner = req.body.owner?req.body.owner:vehicle.owner;
        vehicle.chasisNumber = req.body.chasisNumber?req.body.chasisNumber:vehicle.chasisNumber;
        vehicle.company = req.body.company?req.body.company:vehicle.company;
        vehicle.year = req.body.year?req.body.year:vehicle.year;
        vehicle.price = req.body.price?req.body.price:vehicle.price;
        vehicle.plateNumber = req.body.plateNumber?req.body.plateNumber:vehicle.plateNumber;
        vehicle.modelname = req.body.modelname?req.body.modelname:vehicle.modelname;

        vehicle.save()
            .then(() => res.json('Vehicle updated!'))
            .catch((err) => res.status(400).json('Error: ' + err));
            
       
      })
      .catch((err) => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;
  