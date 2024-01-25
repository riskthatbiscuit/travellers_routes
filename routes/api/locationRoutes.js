const router = require('express').Router();
const sequlize = require('../../config/connection');
const {Location, Traveller, Trips} = require('../../models')

router.get('/', async (req, res) => {
    try {
        const locationData = await Location.findAll({
            include: [{model: Trips}],
        })
        res.status(200).json(locationData)
    } catch (err) {
        res.status(400).json(err);
    }

})

router.post('/', async (req, res) => {
    try {
        const locationData = await Location.create(req.body)
        res.status(200).json(locationData)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const locationData = await Location.findByPk(
            req.params.id,
            {
                include: [{model: Trips}]
            }
        )
        res.status(200).json(locationData)
    } catch (err) {
        res.status(400).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const locationData = await Location.destroy(
            {where: {id: req.params.id}}
        )
        res.status(200).json(locationData)
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router