"use strict";

const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const dbName = process.env.YACHT_DB_NAME;
const dbUser = process.env.YACHT_DB_USER_NAME;
const dbPassword = process.env.YACHT_DB_PASSWORD;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: "localhost",
  port: 5432,
  dialect: 'postgres'
});

let models = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach(function(modelName) {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

sequelize.sync();

models.sequelize = sequelize;

module.exports = models;
