import db from '../models/index.cjs';
import { Op } from 'sequelize';
import { handleErrors } from '../middlewares/error-handler.js';

export async function getAllRealtorsController(req, res) {
  try {
    ///// SQL+sequelize.query: /////
    /*
    const query = `
            SELECT * FROM realtors
            LIMIT :limit OFFSET :offset;
        `;
    const { limit = 10, offset = 0 } = req.query;

    const result = await db.sequelize.query(query, {
      replacements: { limit, offset },
      type: db.sequelize.QueryTypes.SELECT
    });
    */

    const { limit, offset } = req.query;

    const result = await db.Realtors.findAll({
      limit: limit || 10,
      offset: offset || 0
    });

    return res.status(200).json(result);
  } catch (err) {
    handleErrors(err, res);
  }
}

export async function createRealtorController(req, res) {
  const { first_name, last_name, phone, email, registration_date } = req.body;
  if (req.body.realtor_id) {
    return res.status(400).json({ error: 'Cannot specify realtor_id in request' });
  }
  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    const existingRealtor = await db.Realtors.findOne({
      where: {
        email: {
          [Op.eq]: email
        }
      },
      transaction
    });

    /*
    const existingRealtor = await db.sequelize.query(
      `SELECT * FROM realtors WHERE email = :email`,
      {
        replacements: { email },
        type: db.sequelize.QueryTypes.SELECT,
        transaction
      }
    );
    */

    if (existingRealtor) {
      transaction.rollback();
      return res.status(400).json({ error: 'Email must be unique' });
    }
    const result = await db.Realtors.create(
      {
        first_name,
        last_name,
        phone,
        email,
        registration_date
      },
      {
        transaction
      }
    );

    /*
    const result = await db.sequelize.query(
      `INSERT INTO realtors (first_name, last_name, phone, email, registration_date)
      VALUES (:first_name, :last_name, :phone, :email, :registration_date)`,
      {
        replacements: { first_name, last_name, phone, email, registration_date },
        type: db.sequelize.QueryTypes.INSERT,
        transaction
      }
    );
    */

    await transaction.commit();
    return res.status(200).json(result);
  } catch (err) {
    if (transaction) await transaction.rollback();
    handleErrors(err, res);
  }
}

export async function updateRealtorController(req, res) {
  try {
    const { realtor_id, first_name, last_name, phone, email, registration_date } = req.body;
    const result = await db.Realtors.update(
      {
        first_name,
        last_name,
        phone,
        email,
        registration_date
      },
      {
        where: {
          realtor_id
        }
      }
    );

    /*
    const result = await db.sequelize.query(
      `
      UPDATE Realtors
      SET first_name = :first_name,
          last_name = :last_name,
          phone = :phone,
          email = :email,
          registration_date = :registration_date
      WHERE realtor_id = :realtor_id
      `,
      {
        replacements: { realtor_id, first_name, last_name, phone, email, registration_date },
        type: db.sequelize.QueryTypes.UPDATE,
      }
    );
    */

    return res.status(200).json(result);
  } catch (err) {
    handleErrors(err, res);
  }
}

export async function deleteRealtorController(req, res) {
  try {
    const { realtor_id } = req.body;
    await db.Properties.destroy({
      where: {
        realtor_id: realtor_id
      }
    });
    await db.Realtors.destroy({
      where: {
        realtor_id: realtor_id
      }
    });
    return res.status(200).json({ message: 'Realtor and associated properties deleted successfully' });
  } catch (err) {
    handleErrors(err, res);
  }
}
