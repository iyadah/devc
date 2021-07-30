import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile'
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(()=>{
        getProfiles();
    }, []);

    return (
        <Fragment>
            {loading ? <Spinner /> : <Fragment>
                <h1> Developers</h1>
                <div className="profiles">
                    {profiles.length > 0 ? <h4> a </h4> : <h4> No profiles...</h4>}
                </div>
                </Fragment>}
            
        </Fragment>
    )
}
;
Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Profiles);
