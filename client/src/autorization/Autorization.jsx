import React from "react";
import './Autorization.css'

const Autorization = () => {
    return (
        <body>
            <div id="autorization">
                <meta charSet="UTF-8" />
                <title>Страничка авторизации</title>
                <link rel="stylesheet" href="Autorization.css" />
                <div id="body_auto">
                    <div id="logo">
                        <img src='wizard-svgrepo-com.svg' />
                    </div>
                    <div id="exit_game">Войдите</div>
                        <input className="login" type="text" placeholder="Логин" />
                        <input className="password" type="password" placeholder="Пароль" />
                    <a className="exit" href='/main'>Войти</a>
                </div>
            </div>
        </body>


    )
}
export default Autorization