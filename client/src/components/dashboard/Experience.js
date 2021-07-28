import React, { Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile'

function Experience({ experience, deleteExperience }) {
    const experiences = experience.map(exp => (
        <tr className="bg-gray-800" key={exp._id}>
            <td className="p-3">{exp.company}</td>
            <td className="p-3">{exp.title}</td>
            <td className="p-3">
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {
                    exp.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>) 
                }
            </td>
            <td className="p-3">
							<a onClick={() => deleteExperience(exp._id)} className="text-gray-400 hover:text-gray-100 ml-2">
								<i className="material-icons-round text-base">delete_outline</i>
							</a>
			</td>

        </tr>
    ));

    return (
        <Fragment>
            <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
	rel="stylesheet"></link>
            <h2> Experience Cridentials</h2>
			<table className="table text-gray-400 border-separate space-y-6 text-sm">
				<thead className="bg-gray-800 text-gray-500">
					<tr>
						<th className="p-3">Company</th>
						<th className="p-3 text-left">Title</th>
						<th className="p-3 text-left">Years</th>
						<th className="p-3 text-left">Action</th>
					</tr>
				</thead>
				<tbody >
                    {experiences}
				</tbody>
			</table>

            
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
};

export default connect(null, {deleteExperience})(Experience)

