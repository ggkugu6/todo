import React, {useContext, useEffect, useState} from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from './components/AppRouter';
import { observer } from 'mobx-react-lite';
import { Context } from ".";
import { check } from './http/userAPI';
import '@fortawesome/fontawesome-free/js/all.js';


const App = observer(() => {
  const { user } = useContext(Context);
  const[loading, setLoading] = useState(true)

useEffect(() => {
    check().then(data => {
      user.setIsAuth(true)
      setLoading(false)}
    ).finally(() => setLoading(false))
  }, [])

  return (
    <BrowserRouter>
          <AppRouter />
    </BrowserRouter>
  );
})

export default App;

