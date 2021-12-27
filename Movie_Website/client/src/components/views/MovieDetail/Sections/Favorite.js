import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Button } from 'antd'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)


    useEffect(() => {
        let variables = {
            userFrom,
            movieId
        }
        axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            setFavoriteNumber(response.data.FavoriteNumber)
            if (response.data.success) {

            } else {
                alert('정보를 가져오는데 실패했습니다.')
            }
        })

        axios.post('/api/favorite/favorited', variables)
        .then(response => {
            setFavorited(response.data.Favorited)
            if (response.data.success) {
                
            } else {
                alert('정보를 가져오는데 실패했습니다.')
            }
        })
        console.log(Favorited, FavoriteNumber)
    // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Button>
                {Favorited ? 
                    <span role = "img" aria-label = "thumbs-up">👍</span>
                    : 
                    <span role = "img" aria-label = "finger-neutral">🤜</span>
                }  
                &nbsp;{FavoriteNumber}
            </Button>
        </div>
    )
}

export default Favorite
