const Location = require('./Location');
const Traveller = require('./Traveller');
const Trips = require('./Trips');

// Traveller.hasMany(Trips, {
//     foreignKey: 'traveller_id',
//     onDelete: 'CASCADE'
// });

// Trips.belongsTo(Traveller, {
//     foreignKey: 'traveller_id',
// });


// Trips.belongsTo(Location, {
//     foreignKey: 'location_id',
// });

// Location.hasOne(Trips, {
//     foreignKey: 'location_id',
//     onDelete: 'CASCADE'
// });

Traveller.belongsToMany(Location, {
    through: {
        model: Trips,
        unique: false
    },
    as: 'planned_trips',
});

Location.belongsToMany(Traveller, {
    through: {
        model: Trips,
        unique: false
    },
    as: 'location_travellers',
});


module.exports = {Location, Traveller, Trips};