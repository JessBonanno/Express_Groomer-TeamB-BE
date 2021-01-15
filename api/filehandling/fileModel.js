const db = require('../../data/db-config');

const create = async (filename) => {
  return await db('profiles').insert(filename).returning('*');
};

module.exports = create;
