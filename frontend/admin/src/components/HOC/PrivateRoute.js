import React, { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../actions/auth.action';

export const PrivateRoute = ({ component: Component, role, ...rest }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const auth = useSelector(state => state.auth)
    const { user } = auth
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            dispatch(logoutAction());
            return (<Redirect to={`/login`} />)
        }

        // // validate role
        // if (role && user) {
        //     if (role !== user.profile.role) {
        //         dispatch(logoutAction());
        //         return (<Redirect to={`/login`} />)
        //     }
        // }
    }, [dispatch]);

    return (
        <Route {...rest} render={props => <Component {...props} />} />
    );
};


