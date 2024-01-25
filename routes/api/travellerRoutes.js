const router = require('express').Router();
const sequlize = require('../../config/connection');
const {Location, Traveller, Trips} = require('../../models');

router.get('/', async (req, res) => {
    try {
        const travellerData = await Traveller.findAll();
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.post('/', async (req, res) => {
    try {
        const travellerData = await Traveller.create(req.body);
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const travellerData = await Traveller.findByPk(req.params.id, {
            include: [{ model: Location, through: Trips, as: "planned_trips" }]
        });

        if (!travellerData) {
            res.status(400).json({message: "No traveller found with that id!"});
        }

        res.status(200).json(travellerData)
    } catch (err) {
        res.status(400).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const travellerData = await Traveller.destroy(
            {where: {id: req.params.id}}
        );

        if(!travellerData) {
            res.status(200).json({message: "No traveller found with that id!"})
        }

        res.status(200).json(travellerData);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;