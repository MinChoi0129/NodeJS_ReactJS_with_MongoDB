import React, { useEffect, useState} from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from './Sections/MainImage'
import { Row } from 'antd'
import GridCards from '../commons/GridCards';
import { FaCode } from "react-icons/fa";

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    useEffect(() => {
        const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setMovies([...response.results])
            setMainMovieImage(response.results[0])
        })
    }, [])

    return (
        <div style = {{width: '100%', margin: '0'}}>
            {MainMovieImage && 
                <MainImage
                    
                    image={`${IMAGE_BASE_URL}/w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }

            <div style = {{width: '85%', margin: '1rem auto'}}>
                <h2>최신 영화들</h2>
                <hr />
            
            <Row gutter = {[16, 16]}>

                {Movies && Movies.map((movie, index) => (
                    <React.Fragment key = {index}>
                        <GridCards 
                            image = {movie.poster_path ?
                                `${IMAGE_BASE_URL}/w500${movie.poster_path}` : null
                            }
                            movieId = {movie.id}
                            movieName = {movie.original_title}
                        />     
                    </React.Fragment>
            ))}
            </Row>

            

            </div>

            <div style = {{display: 'flex', justifyContent: 'center'}}>
                <button>더보기</button>
            </div>
        </div>
    )
}

export default LandingPage
