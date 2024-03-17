import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Context } from '../index';
import MainTask from '../page/MainTask';
import Auth from '../page/Auth';
import { MAIN_ROUTE, LOGIN_ROUTE } from "../utils/consts.js";
import { observer } from 'mobx-react-lite';
import { check } from '../http/userAPI';

const AppRouter = observer(() => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const { user } = useContext(Context);
    useEffect(() => {
        check().then(data => {
            if (data !== null)
                setIsAuthorized(true);
        }).catch(error => {
            setIsAuthorized(false);
        });
    }, [check]);

    return (
        <Routes>
            {localStorage.getItem('token') === null || isAuthorized === false ? (
                <Route
                    key={LOGIN_ROUTE}
                    path={LOGIN_ROUTE} element={<Auth />}
                />
            ) : (
                <Route
                    key={MAIN_ROUTE}
                    path={MAIN_ROUTE}
                    element={user.isAuth && isAuthorized ? <MainTask /> : <Auth />}
                />
            )}
            {user.isAuth && localStorage.getItem('token') && isAuthorized ? (
                <Route
                    path="*"
                    element={<Navigate to={MAIN_ROUTE} />}
                />
            ) : (
                <Route
                    path="*"
                    element={<Navigate to={LOGIN_ROUTE} />}
                />
            )}
        </Routes>
    );
});

export default AppRouter;