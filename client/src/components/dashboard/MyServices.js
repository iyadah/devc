import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {getMyServices, deleteService} from '../../actions/service'
import { Link } from 'react-router-dom'

const MyServices = ({ getMyServices, service: { services, loading }}) => {
    useEffect(() => {
        getMyServices();
    }, [getMyServices]);

    return (
        
        <div>
            My Services list
            

			<table className="table text-gray-400 border-separate space-y-6 text-sm">
				<thead className="bg-gray-800 text-gray-500">
					<tr>
						<th className="p-3">Title</th>
						<th className="p-3 text-left">Price</th>
						<th className="p-3 text-left">Deliver Days/Hours</th>
						<th className="p-3 text-left">Actions</th>

					</tr>
                   </thead>

                    {services.map(service => (
                    <tr className="bg-gray-800" key={service._id}>
            <td className="p-3">{service.title}</td>
            <td className="p-3">{service.price}</td>
            <td className="p-3">{service.serviceDeliveryDay}- days, and {service.serviceDeliveryDay}- hours</td>

            <td className="p-3">
							<a href="!#" onClick={() => deleteService(service._id)} className="text-gray-400 hover:text-gray-100 ml-2">
								<i className="material-icons-round text-base">delete_outline</i>
							</a>
			</td>

                    </tr>
                    
                    ))}

				<tbody >
				</tbody>
			</table>
        </div>
    )
}

MyServices.propTypes = {
    getMyServices: PropTypes.func.isRequired,
    service: PropTypes.object.isRequired

}


const mapStateToProps = state => ({
    service: state.service
});

export default connect(mapStateToProps, {getMyServices})(MyServices);