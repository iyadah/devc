import React from 'react'
import PropTypes from 'prop-types'
import {useFormik} from 'formik'

function FormicSh(props) {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            channel: ''
        }
    });

    console.log(formik.values)
    return (
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-6">
            <div className="mb-4">
                <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                       type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
            </div>    
            <div className="mb-4">
                <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="text" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
            </div>     
            <div className="mb-4">
                <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="text" id="channel" name="channel" onChange={formik.handleChange} value={formik.values.channel} />
            </div>    
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 rounded focus:outline-none focus:shadow-outline" type="button">
               &nbsp; Submit &nbsp;
            </button>
            </form>
        </div>
    )
}

FormicSh.propTypes = {

}

export default FormicSh

