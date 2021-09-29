const db = require('../db');

async function getCarsRoutes() {
  const { rows } = await db.query('SELECT * FROM cars');
  return {
    code: 200,
    data: rows,
  };
}

async function delCarsRoutes(id) {
  const { rows } = await db.query('SELECT * FROM cars where id = $1', [id]);
  if (rows.length > 0) {
    await db.query('DELETE FROM cars WHERE id = $1', [id]);
    return {
      code: 200,
      data: true,
    };
  }
  return { code: 404, data: `id ${id} was not found in the database` };
}

module.exports = {
  getCarsRoutes,
  delCarsRoutes,
};
