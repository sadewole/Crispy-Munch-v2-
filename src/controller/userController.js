import model from '../db';
import helper from '../middlewares/helper';
import uuidv4 from 'uuid/v4';

const {
  User,
  LocalAuth
} = model


export default {
  signup: async (req, res) => {
    let {
      name,
      email,
      password
    } = req.value.body;
    try {
      email = email.toLowerCase().trim()
      const checkEmail = await helper.existEmail(email);
      if (checkEmail) {
        return res.status(403).json({
          msg: 'Email already exist'
        });
      }

      const hash = await helper.hashPassword(password);

      const user = await User.create({
        id: uuidv4(),
        name,
        email,
        role: 'CLIENT'
      })

      const localUser = await LocalAuth.create({
        id: uuidv4(),
        password: hash,
        email,
        user_id: user.id
      });

      const token = await helper.genToken(localUser);
      return await res.status(201).json({
        status: 201,
        type: 'POST',
        success: true,
        data: localUser,
        token,
        msg: "Thank you for registering. Check your email to verify account."
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
      success: true,
      data: user,
      token: `Bearer ${token}`,
      msg: "You've successfully signed in"
    });
  },

  secret: (req, res) => {
    res.status(200).json({
      type: 'GET',
      data: req.user,
      secret: 'resource'
    });
  },
  // note: this code is no more used in this project
  validate: async (req, res) => {
    const {
      validate
    } = req.query
    try {
      let checkSecret = await helper.activateSecret(validate);
      if (!checkSecret) {
        return res.status(400).json({
          msg: 'Authorisation error'
        })
      }

      // update user on validation
      const user = await LocalAuth.update({
        secretToken: '',
        active: true
      }, {
        returning: true,
        where: {
          id: checkSecret.id
        }
      })


      // gen token
      const token = helper.genToken(user);

      return res.status(200).json({
        type: 'PUT',
        success: true,
        token,
        data: user[1][0],
        msg: 'User activated successfully'
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        msg: err
      })
    }
  },

  verifyEmail: async (req, res) => {
    let {
      email
    } = req.body

    try {
      email = email.toLowerCase().trim()
      if (!email) return res.status(400).json({
        msg: 'Email field cannot be empty'
      })

      const checkEmail = await helper.existLocalEmail(email);
      if (!checkEmail) {
        return res.status(404).json({
          msg: 'Error, email not found'
        });
      }

      const {
        id
      } = checkEmail
      // gen token
      const token = helper.forgotPasswordToken(checkEmail);

      return res.status(200).json({
        type: 'POST',
        success: true,
        msg: 'Verified successfully',
        data: {
          id,
          token
        }
      })

    } catch (err) {
      return res.status(500).json({
        success: false,
        msg: err
      })
    }
  },
  changePassword: async (req, res) => {
    const {
      id,
      active_token
    } = req.query
    let {
      password
    } = req.body
    try {
      const hash = await helper.hashPassword(password);
      const user = await LocalAuth.update({
        password: hash
      }, {
        returning: true,
        where: {
          id
        }
      })
      // gen token
      const token = helper.genToken(user);

      return res.status(200).json({
        type: 'PUT',
        success: true,
        msg: 'Password changed successfully',
        data: user[1][0],
        token
      })
    } catch (err) {
      return res.status(500).json({
        msg: err
      })
    }
  },

  getSingleUser: async (req, res) => {
    const {
      id
    } = req.params
    try {
      const user = await User.findOne({
        where: {
          id
        }
      })
      if (!user) return res.status(404).json({
        msg: 'User doesn\'t exist'
      })

      return res.status(200).json({
        type: 'GET',
        success: true,
        msg: 'Request successfully',
        data: user
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        msg: err
      })
    }
  },

  upgradeUser: async (req, res) => {
    try {
      if (req.user.role === 'Admin') {
        return res.status(400).json({
          msg: 'Unauthorised'
        })
      }

      await User.update({
        role: 'Admin'
      }, {
        where: {
          id: req.params.id
        }
      })

      return res.status(200).json({
        TYPE: 'PUT',
        status: 200,
        msg: 'User now has the role of an admin'
      });
    } catch (err) {
      res.status(500).json({
        msg: err
      })
    }
  },

  deleteSingleUser: async (req, res) => {
    const {
      id
    } = req.params
    try {
      const user = await User.findOne({
        where: {
          id
        }
      })
      if (!user) return res.status(403).json({
        msg: 'Bad request'
      })

      await User.delete({
        where: {
          id
        }
      })

      return res.status(200).json({
        type: 'DELETE',
        success: true,
        msg: 'Deleted successfully'
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        msg: err
      })
    }
  }
};