import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


const Search_ = ({ users, inputText, setText, setUsers, setAlert, clearAlert, setLoading }) => {

    const onSubmit = (e) => {
        e.preventDefault();
        if (inputText === '') {
            setAlert('Please enter something', 'danger');

            setTimeout(() => {
                clearAlert();
            }, 5000);

        } else {
            setLoading(true);
            searchUsers(inputText);
            setText('');
        }
    }

    const searchUsers = (inputText) => {
        fetch(`https://api.github.com/search/users?q=${inputText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
          .then(res => res.json())
          .then(users => {
            setUsers(!users.errors ? users.items : []);
            if (users.total_count === 0) {
                setAlert('Nothing was found', 'danger');
    
              setTimeout(() => {
                clearAlert();
              }, 5000);
            }
            setLoading(false);
          })
      }

      const clearUsers = () => {
        setUsers([]);
        setLoading(false);
      }

        return (
            <div>
                <form onSubmit={onSubmit} className="form">
                    <input 
                    type="text" 
                    placeholder="search users..." 
                    value={inputText}
                    name="text" 
                    onChange={(e) => setText(e.target.value)} />
                    <button type="submit" className="btn btn-dark btn-block">Search</button>
                </form>
                { users.length > 0 ? <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button> : null }
            </div>
        )
}

Search_.propTypes = {
    users: PropTypes.array.isRequired,
    inputText: PropTypes.string.isRequired, 
    setText: PropTypes.func.isRequired, 
    setUsers: PropTypes.func.isRequired, 
    setAlert: PropTypes.func.isRequired, 
    clearAlert: PropTypes.func.isRequired, 
    setLoading: PropTypes.func.isRequired
}

const mapStateToProps = ({ users, inputText }) => ({
    users,
    inputText
})

const mapDispatchToProps = (dispatch) => ({
    setText: text => (dispatch({ type: 'HANDLE_TEXT_INPUT', payload: text })),
    setUsers: users => (dispatch({ type: 'SEARCH_USERS', payload: users })),
    setAlert: (msg, type) => (dispatch({ type: 'SET_ALERT', payload: {msg: msg, type: type} })),
    clearAlert: () => (dispatch({ type: 'CLEAR_ALERT' })),
    setLoading: (bool) => (dispatch({ type: 'SET_LOADING', payload: bool }))
})

export const Search = connect(mapStateToProps, mapDispatchToProps)(Search_);