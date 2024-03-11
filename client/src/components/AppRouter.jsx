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
            {<Route
                key={LOGIN_ROUTE}
                path={LOGIN_ROUTE} element={localStorage.getItem('token') === null || isAuthorized === false ? <Auth /> : <MainTask />}
            />}
            {<Route
                key={MAIN_ROUTE}
                path={MAIN_ROUTE}
                element={user.isAuth && localStorage.getItem('token') && isAuthorized === true ? <MainTask /> : <Auth />}
            />}
            {<Route
                path="*"
                element={user.isAuth && localStorage.getItem('token') && isAuthorized === true ?
                    <Navigate
                        to={MAIN_ROUTE}
                    />
                    :
                    <Navigate
                        to={LOGIN_ROUTE}
                    />}
            />}
        </Routes>
    );
});

export default AppRouter;