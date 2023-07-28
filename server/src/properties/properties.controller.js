import db from '../models/index.cjs';
import { handleErrors } from '../middlewares/error-handler.js';

export async function getAllPropertiesController(req, res) {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const query = `SELECT * FROM properties LIMIT ${limit} OFFSET ${offset}`;
    const properties = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
    res.status(200).json(properties);
  } catch (err) {
    handleErrors(err, res);
  }
}

export async function createPropertyController(req, res) {
  const {
    district,
    square_meters,
    price,
    date_built,
    property_type,
    realtor_id
  } = req.body;
  if (req.body.property_id) {
    return res.status(400).json({ error: 'Cannot specify property_id in request' });
  }
  try {
    const existingRealtor = await db.Realtors.findOne({
      where: {
        realtor_id: realtor_id
      }
    });

    if (!existingRealtor) {
      return res.status(400).json({ error: 'Realtor with the provided ID does not exist' });
    }

    const existingProperty = await db.Properties.findOne({
      where: {
        realtor_id: realtor_id
      }
    });

    if (existingProperty) {
      return res.status(400).json({ error: 'Realtor already has a property' });
    }

    const transaction = await db.sequelize.transaction();

    try {
      await db.Properties.create({
        district,
        square_meters,
        price,
        date_built,
        property_type,
        realtor_id
      }, { transaction });
      await transaction.commit();
      res.status(200).json({ message: 'Property created successfully' });
    } catch (err) {
      await transaction.rollback();
      handleErrors(err, res);
    }
  } catch (err) {
    handleErrors(err, res);
  }
}

export async function updatePropertyController(req, res) {
  const { property_id, district, square_meters, price, date_built, property_type, realtor_id } = req.body;
  console.log(req.body)
  try {
    const existingRealtor = await db.Realtors.findOne({
      where: {
        realtor_id: realtor_id
      }
    });
    if (!existingRealtor) {
      return res.status(400).json({ error: 'Realtor with the provided ID does not exist' });
    }

    const existingProperty = await db.Properties.findOne({
      where: {
        property_id: property_id
      }
    });
    if (!existingProperty) {
      return res.status(400).json({ error: 'Property with the provided ID does not exist' });
    }

    const allRealtorsIds = `SELECT realtor_id FROM properties`;
    if (allRealtorsIds.includes(realtor_id) && existingProperty.realtor_id !== realtor_id) {
      return res.status(400).json({ error: 'Realtor already has a property' });
    }

    const query = `UPDATE properties
                 SET district = '${district}',
                     square_meters = '${square_meters}',
                     price = '${price}',
                     date_built = '${date_built}',
                     property_type = '${property_type}',
                     realtor_id = '${realtor_id}'
                 WHERE property_id = ${property_id}`;
    await db.sequelize.query(query);
    res.status(200).json({ message: 'Property updated successfully' });
  } catch (err) {
    handleErrors(err, res);
  }
}

export async function deletePropertyController(req, res) {
  const propertyId = req.body.property_id;
  try {
    const propertyQuery = `DELETE FROM properties WHERE property_id = ${propertyId}`;
    await db.sequelize.query(propertyQuery);
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (err) {
    handleErrors(err, res);
  }
}
