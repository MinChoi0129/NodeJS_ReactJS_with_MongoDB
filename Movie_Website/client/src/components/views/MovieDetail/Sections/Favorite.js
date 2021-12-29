import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Button } from 'antd'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    useEffect(() => {
        
        axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            console.log("FavNum 가져오기", response)
            setFavoriteNumber(response.data.favoriteNumber)
            if (response.data.success) {
            } else {
                alert('정보를 가져오는데 실패했습니다.')
            }
        })

        axios.post('/api/favorite/favorited', variables)
        .then(response => {
            console.log("Fav유무 가져오기", response)
            setFavorited(response.data.favorited)
            if (response.data.success) {
            } else {
                alert('정보를 가져오는데 실패했습니다.')
            }
        })
    // eslint-disable-next-line
    }, [])


    const onClickFavorite = () => {
        if (Favorited) {
            axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                console.log("좋아요 제거", response)
                if (response.data.success) {                    
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)
                } else {
                    alert('좋아요 취소를 실패했습니다.')
                }
            })
        } else {
            axios.post('/api/favorite/addToFavorite', variables)
            .then(response => {
                console.log("좋아요 추가", response)
                if (response.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)
                } else {
                    alert('좋아요를 실패했습니다.')
                }
            })
        }
    }
    return (
        <div>
            <Button onClick = {onClickFavorite}>
            {Favorited ? 
                    <span role = "img" aria-label = "thumbs-up">👍</span>
                    : 
                    <span role = "img" aria-label = "finger-neutral">🤜</span>
                }
                &nbsp;{FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
