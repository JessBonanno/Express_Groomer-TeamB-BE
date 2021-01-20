const db = require('../../data/db-config');

const update = async (location) => {
  return await db('profiles').insert(location).returning('*');
};

module.exports = update;
