import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

import {createService} from '../../actions/service';

import {Link} from 'react-router-dom';

const CreateService = ({ createService, history  }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        price: '',
        serviceDeliveryDay: '',
        serviceDeliveryHour: ''

    });

    const {
        title='',
        description='',
        image='',
        price='',
        serviceDeliveryDay='',
        serviceDeliveryHour=''
 
    } = formData;


    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


    const onSubmit = (e) => {
        console.log(formData);
        e.preventDefault();
        createService(formData, history);
      };

    return (
        <Fragment>
                 <h1 className="large text-primary">
        Create new service
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={ e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="title" name="title" value={title} onChange={ e => onChange(e)}/>
          <small className="form-text">Attractive service title</small>
        </div>
        <div className="form-group">
          <textarea placeholder="description" name="description" value={description} onChange={ e => onChange(e)} />
          <small className="form-text">Add details to describe the service</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="image URL" name="image" value={image} onChange={ e => onChange(e)} />
          <small className="form-text">Image URL</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Price"
            name="price" value={price} onChange={ e => onChange(e)}/>
          <small className="form-text">Price in $ dollars</small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="serviceDeliveryDay"
            name="serviceDeliveryDay" value={serviceDeliveryDay} onChange={ e => onChange(e)}/>
          <small className="form-text">How many days to deliver</small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="serviceDeliveryHour"
            name="serviceDeliveryHour" value={serviceDeliveryHour} onChange={ e => onChange(e)}/>
          <small className="form-text">How many hours to deliver</small>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/services">Go Back</Link>
      </form>
 
        </Fragment>
    );
};

CreateService.propTypes = {
    CreateService: PropTypes.func.isRequired
};


export default connect(null, { createService, setAlert })(
  CreateService
);

