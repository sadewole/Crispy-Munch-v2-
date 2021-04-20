import uuidv4 from 'uuid/v4';
import models from '../models';
import Helper from '../middlewares/helper';
import 'dotenv/config';

const { User, LocalAuth } = models;

const hash = Helper.hashPassword(process.env.DEFAULT_PASSWORD);

User.create({
  id: uuidv4(),
  name: process.env.DEFAULT_NAME,
  email: process.env.DEFAULT_EMAIL,
  role: process.env.DEFAULT_ROLE,
})
  .then((user) => {
    LocalAuth.create({
      id: uuidv4(),
      password: hash,
      email: process.env.DEFAULT_EMAIL,
      user_id: user.id,
    }).then((defaultAdmin) => {
      console.log(defaultAdmin);
    });
  })
  .catch((err) => {
    console.log(err);
  });
