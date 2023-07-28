'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Properties extends Model {
    static associate(models) {
      Properties.belongsTo(models.Realtors, { foreignKey: 'realtor_id' });
    }
  }
  Properties.init({
    property_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "District cannot be empty"
        },
        notNull: {
          msg: "District cannot be null"
        },
        len: {
          args: [1, 255],
          msg: "District must have between 1 and 255 characters"
        }
      }
    },
    square_meters: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Square meters cannot be empty"
        },
        notNull: {
          msg: "Square meters cannot be null"
        },
        isNumeric: {
          msg: "Square meters must be numeric"
        }
      }
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price cannot be empty"
        },
        notNull: {
          msg: "Price cannot be null"
        },
        isInt: {
          msg: "Price must be an integer"
        }
      }
    },
    date_built: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Date built cannot be empty"
        },
        notNull: {
          msg: "Date built cannot be null"
        },
        isDate: {
          msg: "Date built must be a valid date"
        }
      }
    },
    property_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Property type cannot be empty"
        },
        notNull: {
          msg: "Property type cannot be null"
        },
        len: {
          args: [1, 255],
          msg: "Property type must have between 1 and 255 characters"
        }
      }
    },
    realtor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Realtor ID cannot be empty"
        },
        notNull: {
          msg: "Realtor ID cannot be null"
        },
        isInt: {
          msg: "Realtor ID must be an integer"
        }
      }
    }
  }, {
    sequelize,
    tableName: 'properties',
    modelName: 'Properties',
    timestamps: false
  });
  return Properties;
};
