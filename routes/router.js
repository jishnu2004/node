const Model = require('../models/model');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("my route");
});

//crud for faculty model
router.post('/faculty/create',(req,res)=>
{
    const data=new Model({
        name:req.body.name,
        age:req.body.age,
        // Employee_Id:req.body.Employee_Id
    });
    data.save()
        .then(() => {
            res.send('Data saved successfully');
        })
        .catch((error) => {
            res.status(500).send('Error saving data');
        });
});

// Retrieve all faculty members
router.get('/faculty/all', (req, res) => {
    Model.find()
        .then((faculties) => {
            res.status(200).json(faculties);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            res.status(500).send('Error fetching data');
        });
});

// Retrieve a single faculty member by ID
router.get('/faculty/get/:id', (req, res) => {
    const id = req.params.id;

    Model.findById(id)
        .then((faculty) => {
            if (!faculty) {
                return res.status(404).send('Faculty member not found');
            }
            res.status(200).json(faculty);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            res.status(500).send('Error fetching data');
        });
});

// Update a faculty member by ID
router.put('/faculty/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, age } = req.body;

    Model.findByIdAndUpdate(id, { name, age }, { new: true })
        .then((faculty) => {
            if (!faculty) {
                return res.status(404).send('Faculty member not found');
            }
            res.status(200).json(faculty);
        })
        .catch((error) => {
            console.error('Error updating data:', error);
            res.status(500).send('Error updating data');
        });
});

// Delete a faculty member by ID
router.delete('/faculty/delete/:id', (req, res) => {
    const id = req.params.id;

    Model.findByIdAndDelete(id)
        .then((faculty) => {
            if (!faculty) {
                return res.status(404).send('Faculty member not found');
            }
            res.status(200).send('Faculty member deleted successfully');
        })
        .catch((error) => {
            console.error('Error deleting data:', error);
            res.status(500).send('Error deleting data');
        });
});

module.exports = router;