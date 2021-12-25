import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p> 민재무비에 오신 것을 환영합니다!  <Icon type="smile" /></p>
        </div>
    )
}

export default Footer