import React from 'react'
import { connect } from 'react-redux';

const Alert_ = ({ alert }) => {
    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i>
                &nbsp;
                { alert.msg }
            </div>
        )
    )
}

const mapStateToProps = ({ alert }) => ({
    alert
});

export const Alert = connect(mapStateToProps, null)(Alert_);
