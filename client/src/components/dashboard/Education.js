import React, { Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment'

function Education({ education }) {
    const educations = education.map(exp => (
        <tr class="bg-gray-800" key={exp._id}>
            <td class="p-3">{exp.school}</td>
            <td class="p-3">{exp.title}</td>
            <td class="p-3">
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {
                    exp.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>) 
                }
            </td>
            <td class="p-3">
							<a href="#" class="text-gray-400 hover:text-gray-100 ml-2">
								<i class="material-icons-round text-base">delete_outline</i>
							</a>
			</td>

        </tr>
    ));

    return (
        <Fragment>
            <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
	rel="stylesheet"></link>
            <h2> Education Cridentials</h2>
			<table class="table text-gray-400 border-separate space-y-6 text-sm">
				<thead class="bg-gray-800 text-gray-500">
					<tr>
						<th class="p-3">Company</th>
						<th class="p-3 text-left">Title</th>
						<th class="p-3 text-left">Years</th>
						<th class="p-3 text-left">Action</th>
					</tr>
				</thead>
				<tbody >
                    {educations}
				</tbody>
			</table>

            
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired


};

export default Education

