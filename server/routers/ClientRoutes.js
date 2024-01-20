// Your routes file
const express = require('express');
const router = express.Router();
const { getAllClients, getSingleClient, postSingleClient, deleteSingleClient, updateSingleClient } = require('../controllers/ClientController');
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');

const { ClientSchema } = require('../validators/Schemas');
const validate = require('../validators/validate');

// Middleware to parse JSON bodies
router.use(express.json());

// To get All Clients list
router.get('/', authMiddleware(getPermissions('MEDIUM')), getAllClients);

// To get Single Client Details
router.get('/:id', authMiddleware(getPermissions('MEDIUM')), getSingleClient);

// To Add a Client to Clients list
router.post('/add-client', authMiddleware(getPermissions('MEDIUM')), validate(ClientSchema), postSingleClient);

// To Delete Single Client Details
router.delete('/:id', authMiddleware(getPermissions('MEDIUM')), deleteSingleClient);

// To Update a Single Client Details
router.put('/:id', authMiddleware(getPermissions('MEDIUM')), validate(ClientSchema), updateSingleClient);

module.exports = router;
