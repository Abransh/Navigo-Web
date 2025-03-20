"use strict";
exports.__esModule = true;
exports.dataSourceOptions = void 0;
// src/config/typeorm.config.ts
var typeorm_1 = require("typeorm");
var dotenv = require("dotenv");
var path = require("path");
// Load environment variables
dotenv.config();
exports.dataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'navigo',
    // Entities and migrations
    entities: [path.join(__dirname, '..', '**', 'entities', '*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, '..', 'migrations', '*{.ts,.js}')],
    // Environment-dependent settings
    synchronize: process.env.NODE_ENV !== 'production' && process.env.DB_SYNC === 'true',
    logging: process.env.NODE_ENV !== 'production' && process.env.DB_LOGGING === 'true'
};
var dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports["default"] = dataSource;
