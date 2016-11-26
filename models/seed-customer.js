'use strict';

module.exports = function(sequelize, DataTypes) {
  var SeedCustomer = sequelize.define('SeedCustomer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      unique: false
    },
    farm_location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    farm_size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groundnut_bought: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sunflower_bought: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    soya_bought: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    repeat_customer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  return SeedCustomer;
};
