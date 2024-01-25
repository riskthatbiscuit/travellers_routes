const router = require("express").Router();
const sequlize = require("../../config/connection");
const { Location, Traveller, Trips } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const tripsData = await Trips.findAll({
      include: [{ model: Location }],
    });
    res.status(200).json(tripsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
    try {
        const tripsData = await Trips.create(req.body);
        res.status(200).json(tripsData);
    } catch (err) {
        res.status(400).json(err)
    }
})

router.delete('/:id', async (req, res) => {
  try {
    const tripsData = await Trips.destroy(
        {where: {id: req.params.id}}
    )
    if (!tripsData) {
      res.status(400).json({message: 'No trip with this ID'});
      return
    }

    res.status(200).json(tripsData);
  } catch (err) {
    res.status(400).json(err);
  }
})

module.exports = router;
