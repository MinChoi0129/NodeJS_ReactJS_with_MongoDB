import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">홈</a>
    </Menu.Item>
    <SubMenu title={<span>블로그</span>}>
      <MenuItemGroup title="아이템1">
        <Menu.Item key="setting:1">옵션1</Menu.Item>
        <Menu.Item key="setting:2">옵션2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="아이템2">
        <Menu.Item key="setting:3">옵션3</Menu.Item>
        <Menu.Item key="setting:4">옵션4</Menu.Item>
      </MenuItemGroup>
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu