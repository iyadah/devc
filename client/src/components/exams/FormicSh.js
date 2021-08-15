import React from 'react'
import PropTypes from 'prop-types'
import {useFormik} from 'formik'

function FormicSh(props) {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            channel: ''
        },
        onSubmit: values =>{
            console.log(values)
        },
        validate: values=>{
            let errors = {};
            if(!values.name)
                errors.name = 'required';
            if(!values.email)
                errors.email = 'required';
            if(!values.channel)
                errors.channel = 'required';
            
            return errors;
        }

    });

    return (
        <div className="w-full max-w-xs">
            <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-6">
            <div className="mb-4">
                <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                       type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                		{formik.touched.name && formik.errors.name ? <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
		                	Name is required!
		                </span>: null}
            </div>    
            <div className="mb-4">
                <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="text" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                		{formik.touched.email && formik.errors.email ? <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
		                	email is required!
		                </span>: null}           
            </div>     
            <div className="mb-4">
                <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="text" id="channel" name="channel" onChange={formik.handleChange} value={formik.values.channel} onBlur={formik.handleBlur} />
                		{formik.touched.channel && formik.errors.channel ? <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
		                	channel is required!
		                </span>: null}    
            </div>    
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">
               &nbsp; Submit &nbsp;
            </button>
            </form>
        </div>
    )
}

FormicSh.propTypes = {

}

export default FormicSh

