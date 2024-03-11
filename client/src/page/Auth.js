import React, { useState, useContext } from "react";
import './Autorization.css'
import { loginn } from "../http/userAPI";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const Auth = observer(() => {
    const { user } = useContext(Context)
    const [login, setLogin] = useState('')
    const [passsword, setPasssword] = useState('')

    const click = async () => {
        try {
            let data = await loginn(login, passsword)
            user.setIsAuth(true)
            console.log(data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    
    return (
        <div>
            <div id="autorization">
                <meta charSet="UTF-8" />
                <title>Страничка авторизации</title>
                <link
                    rel="stylesheet"
                    href="Autorization.css" />
                <div >
                    <form to='/main'
                        id="body_auto"
                        autoComplete="on">
                        <div id="logo">
                            <img src='wizard-svgrepo-com.svg' />
                        </div>
                        <div id="exit_game">Войдите</div>
                        <input
                            className="login"
                            type="text"
                            placeholder="Логин"
                            value={login || ''}
                            onChange={e => setLogin(e.target.value)} />
                        <input
                            className="password"
                            autoComplete="on"
                            type="password"
                            placeholder="Пароль"
                            value={passsword || ''}
                            onChange={e => setPasssword(e.target.value)} />
                        <button
                            className="exit"
                            href='/main'
                            onClick={click}>
                            Войти
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
})

export default Auth 