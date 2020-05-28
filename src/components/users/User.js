import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner } from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Repos } from '../repos/Repos';

const User_ = (props) => {

    useEffect(() => {
        getUser(props.match.params.login);
        getUserRepos(props.match.params.login);
    }, 
    [props.match.params.login]);

    const getUser = (username) => {
        fetch(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
          .then((res) => res.json())
          .then((userInfo) => {
            props.setUser(userInfo);
          });
      }

    const getUserRepos = (username) => {
      fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        .then((res) => res.json())
        .then((reposInfo) => props.setRepos(reposInfo));
    }


    const { 
        name,
        company, 
        avatar_url, 
        location, 
        bio, 
        blog, 
        login, 
        html_url, 
        followers, 
        following, 
        public_repos, 
        public_gists, 
        hireable 
    } = props.user;

    const { loading, repos } = props;

    if(loading) {
        return <Spinner />
    }
    return (
        <Fragment>
            <Link to="/" className="btn btn-light">
                Back to search
            </Link>
            Hireable:
            &nbsp;
            {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" />}
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} alt="avatar" className="round-img" style={{width: '150px'}} />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className="btn btn-dark my-1">
                        Visit Github Profile
                    </a>
                    <ul>
                        <li>
                            {login && (
                                <Fragment>
                                    <strong>Username:</strong>
                                    &nbsp;
                                    {login}
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {company && (
                                <Fragment>
                                    <strong>Company:</strong>
                                    &nbsp;
                                    {company}
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {blog && (
                                <Fragment>
                                    <strong>Website:</strong>
                                    &nbsp;
                                    {blog}
                                </Fragment>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center grid-4">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-danger">Public repos: {public_repos}</div>
                <div className="badge badge-dark">Public gists: {public_gists}</div>
            </div>
            <Repos repos={repos} />
        </Fragment>
    )
}

User_.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func,
    getUserRepos: PropTypes.func
}

const mapStateToProps = (state) => ({
    user: state.user,
    loading: state.loading,
    repos: state.repos
});

const mapDispatchToProps = (dispatch) => ({
    setUser: user => (dispatch({type: 'GET_USER', payload: user})),
    setRepos: repos => (dispatch({ type: 'GET_USER_REPOS', payload: repos }))
});


export const User = connect(mapStateToProps, mapDispatchToProps)(User_);