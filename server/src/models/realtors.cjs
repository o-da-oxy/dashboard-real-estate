'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Realtors extends Model {
    static associate(models) {
      Realtors.hasMany(models.Properties, { foreignKey: 'realtor_id' });
    }
  }
  Realtors.init({
    realtor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name cannot be empty"
        },
        notNull: {
          msg: "First name cannot be null"
        },
        len: {
          args: [1, 255],
          msg: "First name must have between 1 and 255 characters"
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name cannot be empty"
        },
        notNull: {
          msg: "Last name cannot be null"
        },
        len: {
          args: [1, 255],
          msg: "Last name must have between 1 and 255 characters"
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Phone cannot be empty"
        },
        notNull: {
          msg: "Phone cannot be null"
        },
        len: {
          args: [11],
          msg: "Phone must have 11 characters (8XXXXXXXXXX)"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must be unique"
      },
      validate: {
        notEmpty: {
          msg: "Email cannot be empty"
        },
        notNull: {
          msg: "Email cannot be null"
        },
        isEmail: {
          msg: "Email must be a valid email address"
        }
      }
    },
    registration_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    tableName: 'realtors',
    modelName: 'Realtors',
    timestamps: false
  });
  return Realtors;
};
