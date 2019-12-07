import db from '../model/index';
import helper from '../middlewares/helper';
import uuidv4 from 'uuid/v4';

export default {
  signup: async (req, res) => {
    const { name, email, password } = req.value.body;
    try {
      const hash = await helper.hashPassword(password);
      const newUser = [uuidv4(), name, email, hash];
      const text = `INSERT INTO users(id, name, email, password) VALUES($1, $2, $3, $4) returning *`;
      const user = await db.query(text, newUser);
      const token = helper.genToken(user.rows[0]);

      return res.status(200).json({
        type: 'POST',
        data: user.rows[0],
        token,
        msg: "You've successfully signed up"
      });
    } catch (err) {
      if (err.routine === '_bt_check_unique') {
        return res.status(400).send({
          msg: 'User with that EMAIL already exist'
        });
      }
      return res.status(500).json({
        msg: err
      });
    }
  },

  signin: async (req, res) => {
    const user = req.user;
    // gen token
    const token = helper.genToken(user);
    res.status(200).json({
      type: 'POST',
      data: user,
      token,
      msg: "You've successfully signed in"
    });
  },

  secret: (req, res) => {
    res.status(200).json({
      type: 'GET',
      data: req.user.rows[0],
      secret: 'resource'
    });
  }
};
