import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile'
const profileItem = props => {
    return (
        <div>
            
        </div>
    )
}

profileItem.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    profile: profile.state
})

export default connect(mapStateToProps, {getProfiles})(profileItem);
