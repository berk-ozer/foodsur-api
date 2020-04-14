const db = require("../../lib/db");
const Dietary_restriction = require('../models/Dietary_restriction')(db);

module.exports = () => {
  Dietary_restriction.sync({ force: true })
    .then(() => {
      Dietary_restriction.bulkCreate([
        {name: 'Vegan'},
        {name: 'Vegetarian'},
        {name: 'Sugar-conscious'},
        {name: 'Peanut-free'},
        {name: 'Tree-nut-free'},
        {name: 'Alcohol-free'},
        {name: 'Balanced diet'},
        {name: 'High-protein diet'},
        {name: 'Low-fat diet'},
        {name: 'Low-carb diet'}
      ])
    });
}

