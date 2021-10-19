/* eslint-disable eqeqeq */
/* eslint-disable guard-for-in */
const db = require('../db');

async function getCars() {
  const { rows } = await db.query('SELECT * FROM cars');
  return {
    code: 200,
    data: rows,
  };
}

async function deleteCar(id) {
  const { rows } = await db.query('DELETE FROM cars WHERE id = $1', [id]);
  if (rows.length < 0) {
    return { code: 404, data: `id ${id} was not found in the database` };
  }
  return {
    code: 200,
    data: `Car with the id ${id} has been deleted`,
  };
}

async function changeStatusCar(id, data) {
  const { rows } = await db.query('SELECT * FROM cars WHERE id = $1', [id]);
  // console.log(rows);
  if (rows.length <= 0) return { code: 404, data: `id ${id} was not found in the database` };

  const props = [];
  for (const prop in data) {
    props.push(`${prop}='${data[prop]}'`);
  }
  const cmd = `UPDATE cars SET ${props.join(',')} WHERE id = $1`;
  await db.query(cmd, [id]);
  return {
    code: 200,
    data: `Car with id ${id} was updated successfully`,
  };
}

async function getIdFromOwner(owner) {
  const { rows } = await db.query('SELECT id FROM owner WHERE first_name = $1 AND last_name = $2', [
    owner.firstName,
    owner.lastName,
  ]);
  return rows[0].id;
}

async function addCar(c) {
  const { rows } = await db.query('SELECT MAX(id) AS max FROM cars');
  const id = rows[0].max + 1;
  const idOwn = await getIdFromOwner(c.owner);

  await db.query(
    `INSERT INTO cars (id, title, image, status, price, miles, year_of_make, description, owner)
                           VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    [id, c.title, c.image, c.status, c.price, c.miles, c.year_of_make, c.description, idOwn],
  );
  return {
    code: 200,
    data: `Car with ID: ${id} has been added`,
  };
}

async function getCarByID(query) {
  const { id } = query;
  if (id) {
    const { rows } = await db.query(
      'SELECT title, image, status, price, miles, year_of_make, description, first_name,last_name FROM cars c JOIN owner o on o.id = c.owner WHERE c.id = $1;',
      [id],
    );
    if (rows.length > 0) {
      return {
        code: 200,
        data: rows,
      };
    }
  }
  return {
    code: 404,
    data: 'Not found in the Database',
  };
}

async function getCarByOwner(query) {
  const { firstName, lastName } = query;
  if (firstName && lastName) {
    const { rows } = await db.query(
      'SELECT title, image, status, price, miles, year_of_make, description FROM cars c JOIN owner o on o.id = c.owner WHERE o.first_name = $1 AND o.last_name = $2;',
      [firstName, lastName],
    );
    if (rows.length > 0) {
      return {
        code: 200,
        data: rows,
      };
    }
  }
  return {
    code: 404,
    data: 'Not found in the Database',
  };
}

module.exports = {
  getCars,
  deleteCar,
  changeStatusCar,
  addCar,
  getCarByID,
  getCarByOwner,
};
