import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from 'react-bootstrap';
import * as config from '../config/login-social-config';
import ReactFacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

const Login = () => {

    //REACT HOOKS!
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [foto, setFoto] = useState('');
    const [token, setToken] = useState('');
    const [mensagem, setMensagem] = useState('');

    gapi.load("client:auth2", () => {
        gapi.client.init({
            clientId: config.getGoogleID(),
            plugin_name: "chat",
        });
    });

    //função para capturar o retorno do google
    const responseGoogle = (data) => {

        console.log(data);

        if (data.accessToken) {

            setIsLoggedIn(true);
            setMensagem('Usuário autenticado com sucesso!');

            setNome(data.profileObj.name);
            setEmail(data.profileObj.email);
            setFoto(data.profileObj.imageUrl);
            setToken(data.accessToken);
        }
    }

    //função para capturar o retorno do facebook
    const responseFacebook = (data) => {

        console.log(data);

        if (data.accessToken) {

            setIsLoggedIn(true);
            setMensagem('Usuário autenticado com sucesso!');

            setNome(data.name);
            setEmail(data.email);
            setFoto(data.picture.data.url);
            setToken(data.accessToken);
        }
    }

    //função para fazer o logout do usuário
    const logout = () => {
        if (window.confirm('Deseja encerrar sua sessão?')) {
            setIsLoggedIn(false);
            setMensagem('');
            setNome('');
            setEmail('');
            setFoto('');
            setToken('');
        }
    }

    return !isLoggedIn ? (
        <Row>
            <Col className="col-md-4 offset-4">
                <Card>
                    <Card.Img
                        variant="top"
                        height="200"
                        src="https://www.iberdrola.com/documents/20125/40213/Business_Intelligence_746x419.jpg/e9d6fcdc-71f0-225a-7d44-2727fe42fc75?t=1627021131726"
                    />
                    <Card.Body>
                        <Card.Title className="text-center">
                            Autenticação de Usuário
                        </Card.Title>
                        <Card.Text className="text-center">
                            Informe suas credenciais de acesso.
                        </Card.Text>

                        <form>

                            <Row className="mt-3">
                                <Col>
                                    <label>Email de acesso:</label>
                                    <input type='email' className="form-control" />
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col>
                                    <label>Senha de acesso:</label>
                                    <input type='password' className="form-control" />
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col>
                                    <div className="d-grid">
                                        <Button variant="primary">
                                            Acessar Sistema
                                        </Button>
                                    </div>
                                </Col>
                            </Row>

                        </form>

                        <Row className="mt-2">
                            <Col className="col-md-6">
                                <div className="d-grid">
                                    <ReactFacebookLogin
                                        appId={config.getFacebookID()}
                                        callback={responseFacebook}
                                        fields="name, email, picture"
                                        scope="public_profile"
                                        textButton="Acessar com Facebook"
                                        icon="fa fa-facebook"
                                        buttonStyle={{
                                            height: 44,
                                            padding: 2,
                                            fontSize: 12,
                                            width: '100%'
                                        }}
                                    />
                                </div>
                            </Col>

                            <Col className="col-md-6">
                                <div className="d-grid">
                                    <GoogleLogin
                                        clientId={config.getGoogleID()}
                                        buttonText="Acessar com Google"
                                        theme="dark"
                                        scope="email"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        responseType='code, token'
                                        style={{
                                            height: 40
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col className="text-center text-secondary">
                                <small>
                                    Aula de REACT WEB COTI Informática
                                </small>
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    ) : (
        <Row>
            <Col className="col-md-4 offset-4 text-center mt-5">
                <Card>
                    <Card.Body className="text-center">
                        <h4>
                            {mensagem}
                        </h4>
                        <hr />
                        <Row>
                            <Col>
                                {
                                    foto && <img src={foto} className="rounded-circle" />
                                }
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <strong>{nome}</strong>
                                <br />
                                {email}
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                {token}
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <div className="d-grid">
                                    <Button variant="primary" onClick={logout}>
                                        Encerrar Sessão
                                    </Button>
                                </div>
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Login;