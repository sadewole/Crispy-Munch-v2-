import User from '../model';
import helper from '../middlewares/helper';
import uuidv4 from 'uuid/v4';

export default {
  signup: async (req, res) => {
    const { name, email, password } = req.value.body;
    try {
      const checkEmail = await helper.existEmail(email);
      if (checkEmail) {
        return res.status(403).json({
          msg: 'Email already exist'
        });
      }

      const hash = await helper.hashPassword(password);

      const newUser = await User.create({
        id: uuidv4(),
        name,
        password: hash,
        email
      });
      const token = helper.genToken(newUser);

      return await res.status(201).json({
        status: 201,
        type: 'POST',
        success: true,
        data: newUser,
        token,
        msg: "You've successfully signed up"
      });
    } catch (err) {
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
