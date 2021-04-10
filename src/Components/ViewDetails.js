import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
    EmailShareButton, EmailIcon,
    FacebookShareButton, FacebookIcon,
    LinkedinShareButton, LinkedinIcon,
    TelegramShareButton, TelegramIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon
} from "react-share"
import { Container, Row, Table,Toast } from 'react-bootstrap'
import { GiSandsOfTime } from 'react-icons/gi'
import { BiCalendar } from "react-icons/bi"
import { SiImdb } from "react-icons/si"
import { FaShare } from "react-icons/fa"

class ViewDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // videoYouTubeID: "xu8SB_xte9M",
            movieTrailerUrl: "xu8SB_xte9M",
            details: {
                directors: [],
                stars: [],
                genres: [],

            }
        }
    }

    componentDidMount() {
        console.log("Component Mounted")
        const baseURLIMDb = "https://movies-tvshows-data-imdb.p.rapidapi.com/"
        const paramsIMDb = { type: 'get-movie-details', imdb: this.props.movieDetails.imdbID }
        const headersIMDb = {
            'x-rapidapi-key': '35185625ffmshae485834fdadb9ap1948bajsn1bbdee7db0ae',
            'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com'
        }

        axios.get(baseURLIMDb, {
            params: paramsIMDb,
            headers: headersIMDb
        })
            .then((response) => {
                console.log(response.data);
                this.setState({ details: response.data })
                // if(response.data.youtube_trailer_key){

                // }
            }).catch((error) => {
                console.error(error);
            });

        const paramsYoutube = {
            q: this.props.movieDetails.Title + " Oficial Trailer",
            key: "AIzaSyBuyuWFs7EkJN3HOPCpQKX09xmHAs8qCGk"
        }
        const baseUrlYoutube = "https://www.googleapis.com/youtube/v3/search/"
        axios.get(baseUrlYoutube, {
            params: paramsYoutube
        }).then((response) => {
            console.log(response.data, this.state.details)
            this.setState({ movieTrailerUrl: response.data.items[0].id.videoId })
        }).catch((err) => {
            console.log(err)
        })
    }


    render() {
        console.log(this.props.movieDetails)
        const shareURL = `https://www.youtube.com/watch?v=${this.state.movieTrailerUrl}`
        const { title, release_date, description, directors, imdb_rating, runtime, stars, youtube_trailer_key, rated, genres } = this.state.details
        return (
            <Container>
                <br />
                    <div>
                        <Table responsive borderless hover variant="dark">
                            <tbody>
                                <tr>
                                    <td style={{ verticalAlign: "middle" }}>
                                        <img src={this.props.movieDetails.Poster} alt="Poster"></img>
                                    </td>
                                    <td style={{ verticalAlign: "middle" }}>
                                        <div>
                                            <h1 className="movieTitle">{title? title : this.props.movieDetails.Title}</h1>
                                            {this.state.details.genres ? 
                                                <div>
                                                    <Table size="sm" borderless style={{ color: "#14abed" }}>
                                                        <tbody>
                                                            <tr>
                                                                <td md={4}>
                                                                    <p style={{ size: "15px" }}> <SiImdb /> {imdb_rating}</p>
                                                                </td>
                                                                <td md={8}>
                                                                    <p><span>Rated: {rated} </span></p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><p><BiCalendar /> {release_date}</p></td>
                                                                <td><p><GiSandsOfTime /> {runtime} min</p></td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>

                                                    <Row className="genre-list">
                                                        {genres.map((item, index) => {
                                                            return (
                                                                // <p>
                                                                <span className="genres mb-1" key={index}>{item}</span>
                                                                // </p>
                                                            )
                                                        })}
                                                    </Row>
                                                </div>
                                                : 
                                                <>
                                                    <Toast>
                                                        <Toast.Header>
                                                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                                                        <strong className="mr-auto">Movie Details Not Found</strong>
                                                        <small>just now</small>
                                                        </Toast.Header>
                                                        <Toast.Body>Currently The data of movie {this.props.movieDetails.Title} could not be found</Toast.Body>
                                                    </Toast>
                                                </>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                        {!this.state.details.genres ? 
                            <div>
                            </div>
                        
                        :
                    <div>
                        <fieldset>
                            <legend><h3 className="heading">Plot</h3></legend>
                            <p>{description}</p>
                        </fieldset>
                        <br />

                        <h3 className="heading">Director</h3>
                        <p>{directors[0]}</p>
                        <br />
                        <h3 className="heading">Stars</h3>
                        {stars.slice(0, 5).join(", ")}
                        <br /><br />
                    </div>
                    }

                    </div> 
                <div>

                    <h3 className="heading">Watch Trailer</h3>
                    <br />
                    <iframe width="70%" height="300px" title="Trailer" src={`https://www.youtube.com/embed/${youtube_trailer_key ? youtube_trailer_key : this.state.movieTrailerUrl}`}></iframe>
                </div>

                <br /><br />
                <div>
                    <h3 className="heading">Share Trailer  <FaShare /></h3>
                    <br />
                    <div>
                        <FacebookShareButton className="m-2" url={shareURL}>
                            <FacebookIcon size={34} round={true} />
                        </FacebookShareButton>

                        <LinkedinShareButton className="m-2" url={shareURL}>
                            <LinkedinIcon size={34} round={true} />
                        </LinkedinShareButton>

                        <EmailShareButton className="m-2" url={shareURL}>
                            <EmailIcon size={34} round={true} />
                        </EmailShareButton>

                        <TwitterShareButton className="m-2" url={shareURL}>
                            <TwitterIcon size={34} round={true} />
                        </TwitterShareButton>

                        <WhatsappShareButton className="m-2" url={shareURL}>
                            <WhatsappIcon size={34} round={true} />
                        </WhatsappShareButton>

                        <TelegramShareButton className="m-2" url={shareURL}>
                            <TelegramIcon size={34} round={true} />
                        </TelegramShareButton>
                    </div>
                </div>
                <br />
                <br />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        movieDetails: state.movie,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        readMovie: (val) => dispatch({
            type: "READ_MORE", payload: val
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDetails)