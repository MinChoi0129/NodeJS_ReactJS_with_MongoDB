import React from 'react'
import { Descriptions } from 'antd'
import { ExchangeRate } from '../../../Config'

function MovieInfo(props) {

    let { movie } = props
    let is_released = (movie.status) === 'Released' ? "상영중" : "개봉전"
    let rev = String(parseInt(movie.revenue * ExchangeRate)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <Descriptions title="상세정보" bordered>
            <Descriptions.Item label="제목">{movie.title}</Descriptions.Item>
            <Descriptions.Item label="개봉일">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="수익">{rev}원</Descriptions.Item>
            <Descriptions.Item label="상영시간">{movie.runtime}분</Descriptions.Item>
            <Descriptions.Item label="평점" span={1}>{movie.vote_average} / 10점</Descriptions.Item>
            <Descriptions.Item label="오픈여부">{is_released}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo