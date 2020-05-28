import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UserItem } from './UserItem';
import { Spinner } from '../layout/Spinner';

const Users_ = ({ users, loading }) => { 

    if (loading) {
       return <Spinner />
    } else {
        return (
            <div style={userStyle}>
               { users.map((user) => (
                   <UserItem key={user.id} user={user} />
               )) } 
            </div>
        )
    }
    
}

Users_.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}


const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
};

const mapStateToProps = ({users, loading}) => ({
    users,
    loading
})

export const Users = connect(mapStateToProps, null)(Users_);