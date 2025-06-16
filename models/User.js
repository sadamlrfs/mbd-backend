const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // koneksi Sequelize kamu

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // email harus unik
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Users",
    timestamps: true, // otomatis menambahkan createdAt dan updatedAt
  }
);

module.exports = User;
