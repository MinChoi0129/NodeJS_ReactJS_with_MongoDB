import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import Favorite from './Sections/Favorite'
import MovieInfo from './Sections/MovieInfo'
import { Row } from 'antd'
import GridCards from '../commons/GridCards';
import base_no_image from '../../../image/NoImage.png'

function MovieDetail(props) {

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    let movieId = props.match.params.movieID

    useEffect(() => {
        let endpointCrew = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`
        let endpointInfo = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast)
            })
        // eslint-disable-next-line
    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <div>
            {Movie.backdrop_path &&
                <MainImage
                    image={`${IMAGE_BASE_URL}/w1280${Movie.backdrop_path}`}
                    title={`${Movie.title} (${Movie.original_title})`}
                    text={Movie.overview}
                />
            }

            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} userFrom={window.localStorage.getItem('userId')} movieId={movieId} />
                </div>

                <MovieInfo movie={Movie} />
                <br />

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}>배우 및 출연진</button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}/w500${cast.profile_path}` : base_no_image}
                                    characterName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                }
            </div>
        </div>
    )
}

export default MovieDetail