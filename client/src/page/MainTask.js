import React, { useContext, useEffect } from 'react';
import Main from '../components/main/Main';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { getTask } from '../http/taskAPI';
import { getUser, check } from '../http/userAPI';

const MainTask = observer(() => {
    const{task} = useContext(Context) 
    const{user} = useContext(Context)

    useEffect(() => {
        getTask().then(data => task.setTask(data))
    }, [])
    useEffect(() => {
        getUser().then(data => user.setUser(data))
    }, [])
    useEffect(() => {
        check().then(data => user.setCurrentUser(data))
    }, [])

    return (
        <div>
            <Main/>
        </div>
    );
});

export default MainTask;