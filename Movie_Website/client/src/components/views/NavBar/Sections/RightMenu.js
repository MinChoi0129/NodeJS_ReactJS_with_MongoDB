/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import { Menu } from 'antd';
import { USER_SERVER } from '../../../Config';

function RightMenu(props) {

    const user = useSelector(state => state.user)
    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                window.localStorage.removeItem('userId')
                props.history.push("/login");
            } else {
                alert('로그아웃을 실패했습니다.')
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/login">로그인</a>
                </Menu.Item>
                
                <Menu.Item key="app">
                    <a href="/register">회원가입</a>
                </Menu.Item>
            </Menu>
        )
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>로그아웃</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu);