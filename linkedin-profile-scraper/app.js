const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const sequelize = new Sequelize('linkedin_profiles', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

const Profile = sequelize.define('Profile', {
  name: DataTypes.STRING,
  url: DataTypes.STRING,
  about: DataTypes.TEXT,
  bio: DataTypes.TEXT,
  location: DataTypes.STRING,
  followerCount: DataTypes.STRING,
  connectionCount: DataTypes.STRING
}, {});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/profiles', async (req, res) => {
  const profile = await Profile.create(req.body);
  res.status(201).json(profile);
});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});
