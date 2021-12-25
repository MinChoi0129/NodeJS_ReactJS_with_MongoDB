import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'

function MovieDetail(props) {   

    let movieID = props.match.params.movieID
    const [Movie, setMovie] = useState([])
    useEffect(() => {   
        let endpointCrew = `${API_URL}/movie/${movieID}/credits?api_key=${API_KEY}&language=ko-KR`
        let endpointInfo = `${API_URL}/movie/${movieID}?api_key=${API_KEY}&language=ko-KR`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })
    }, [])


    return (
        <div>
            <MainImage
                image={`${IMAGE_BASE_URL}/w1280${Movie.backdrop_path}`}
                title={`${Movie.title} (${Movie.original_title})`}
                text={Movie.overview}
            />


            <div style={{ width: '85%', margin: '1rem auto' }}>
                <MovieInfo
                    movie={Movie}
                />
                <br />

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    {/* <button onClick={()=>{console.log(Movie)}}> Toggle Actore View</button> */}
                    <button> Toggle Actore View</button>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail
