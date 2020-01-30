import React, { Fragment, useState, useEffect } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import {
  postMenu,
  getSingleMenu,
  updateMenu
} from '../../../actions/catalogAction';
import { useDispatch, useSelector } from 'react-redux';

const AdminPost = ({ form }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [update, setUpdate] = useState({
    id: null,
    edit: false
  });
  let {
    menu: { singleData }
  } = useSelector(state => {
    return {
      menu: state.menu
    };
  });
  // handle change to retrieve image from file
  const handleChange = e => {
    setImageFile(e.target.files[0]);
  };

  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    // dispatch(getSingleMenu());

    // set field on editing form
    if (singleData !== null) {
      form.setFieldsValue({
        name: singleData.name,
        price: singleData.price
      });
      setUpdate({ id: singleData.id, edit: true });
      setVisible(true);
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    // validate form
    await form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        setTimeout(() => {
          // set simple loading style to form
          setLoading(false);
          setVisible(false);
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('price', values.price);
          formData.append('image', imageFile);

          // update menu if edit is true
          if (update.edit) {
            dispatch(updateMenu(formData, update.id));
            setUpdate({ edit: false, id: null });
            singleData = null;
          } else {
            // post menu if no error
            dispatch(postMenu(formData));
          }
        }, 1000);
      }
    });
    // reset fields
    await form.resetFields();
  };

  const handleOk = e => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 1000);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const { getFieldDecorator } = form;

  return (
    <Fragment>
      <Button onClick={showModal}> + Add Item</Button>

      <Modal
        title='Add to Crispy Munch catalog'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <form
          className='form'
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
          <div className='form-group'>
            <label htmlFor='name'>Food Name</label>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the food name!'
                  }
                ]
              })(<Input type='text' name='name' className='form-control' />)}
            </Form.Item>
          </div>
          <div className='form-group'>
            <label htmlFor='price'>Food Price</label>
            <Form.Item>
              {getFieldDecorator('price', {
                rules: [{ required: true, message: 'Please input the price!' }]
              })(<Input type='number' name='price' className='form-control' />)}
            </Form.Item>
          </div>
          <div className='form-group'>
            <label htmlFor='image'>Image</label>
            <Form.Item>
              {getFieldDecorator('image', {
                rules: [{ required: true, message: 'Please input food image!' }]
              })(
                <Input
                  type='file'
                  name='image'
                  className='form-control'
                  onChange={handleChange}
                />
              )}
            </Form.Item>
          </div>
          <div>
            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              className='btn btn-secondary btn-block'
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

const WrappedNormalFoodForm = Form.create({ name: 'normal_login' })(AdminPost);

export default WrappedNormalFoodForm;
