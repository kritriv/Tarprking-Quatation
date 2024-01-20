// Your routes file
const express = require('express');
const router = express.Router();
const { getAllClients, getSingleClient, postSingleClient, deleteSingleClient, updateSingleClient } = require('../controllers/ClientController');

const Clientschema = require('../validators/Schemas/Clientvalidate');
const validate = require('../validators/validate');

// Middleware to parse JSON bodies
router.use(express.json());

// To get All Clients list
router.get('/clients', getAllClients);

// To get Single Client Details
router.get('/clients/:id', getSingleClient);

// To Add a Client to Clients list
router.post('/clients/add-client', validate(Clientschema), postSingleClient);

// To Delete Single Client Details
router.delete('/clients/:id', deleteSingleClient);

// To Update a Single Client Details
router.put('/clients/:id',  validate(Clientschema), updateSingleClient);

module.exports = router;
