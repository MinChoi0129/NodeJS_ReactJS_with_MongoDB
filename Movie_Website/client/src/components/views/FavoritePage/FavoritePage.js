import React, { useEffect, useState } from 'react'
import './favorite.css';
import axios from 'axios';
import { Popover } from 'antd'
import { IMAGE_BASE_URL } from '../../Config'
import base_no_image from '../../../image/NoImage.png'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoriteMovies()
    }, [])

    const fetchFavoriteMovies = () => {
        axios.post('/api/favorite/getFavoriteMovie', { userFrom: window.localStorage.getItem('userId') })
        .then(response => {
            if (response.data.success) {
                setFavorites(response.data.favorites)
            } else {
                alert("영화 정보를 가져오는데 실패했습니다.")
            }
        })
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }
        axios.post('api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoriteMovies()
                } else {
                    alert("리스트에서 삭제하는데 실패했습니다.")
                }
            })
    }


    const renderCards = Favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}/w500/${favorite.moviePost}`} alt = {base_no_image} /> : base_no_image
                }
            </div>
        )
        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>

            <td>{favorite.movieRunTime}분</td>
            <td><button onClick = {() => onClickDelete(favorite.movieId, favorite.userFrom)}>삭제</button></td>
        </tr>
    })



    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> 좋아하는 영화들 </h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>상영시간</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
