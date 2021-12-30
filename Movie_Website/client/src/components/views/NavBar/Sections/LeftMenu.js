import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <a href="/">홈</a>
            </Menu.Item>

            <Menu.Item key="favorite">
                <a href="/favorite">좋아요</a>
            </Menu.Item>
        </Menu>
    )
}

export default LeftMenu