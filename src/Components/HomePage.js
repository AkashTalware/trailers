import React, { Component } from 'react'
import { Jumbotron, InputGroup, FormControl, Alert, Button, Card, CardDeck,Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import axios from 'axios'


class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchQuery: "",
            showAlert: false,
            moviesData:[]
        }
    }


    updateState = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    searchMovies = () => {
        console.log("inside Searchmovies", this.state.searchQuery)
        if (this.state.searchQuery) {
            // alert(`Search Query ${this.state.searchQuery}`)
            const baseURLIMDb = "https://movie-database-imdb-alternative.p.rapidapi.com/"

            const paramsIMDb = {
                s: this.state.searchQuery, 
                page: '1', 
                r: 'json'
            }

            const headersIMDb = { 
                'x-rapidapi-key': '35185625ffmshae485834fdadb9ap1948bajsn1bbdee7db0ae', 
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
              }
            axios.get(baseURLIMDb, {
                params: paramsIMDb,
                headers: headersIMDb
            })
            .then((response)=>{
                console.log(response.data)
                this.setState({moviesData:response.data.Search})
            })
            .catch((error)=>{
                console.error(error)
            });
        }

        else {
            this.setState({ showAlert: true })
        }
    }

    readAboutMovie = (item)=>{
        this.props.readMovie(item)
        this.props.history.push("/viewdetails")
    }

    render() {
        const { searchQuery } = this.state
        console.log(this.state.moviesData)
        return (
            <div>
                <Jumbotron width="90%" style={{backgroundColor:"#010c14"}}>
                    <InputGroup className="mb-3">

                        <FormControl
                            style ={{width:"70%"}}
                            name="searchQuery"
                            value={searchQuery}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(evt) => { this.updateState(evt) }}
                        />
                        <br/>
                        
                    </InputGroup>
                    <div><Button variant="outline-dark" onClick={() => { this.searchMovies() }}>Search</Button></div>
                </Jumbotron>

                {this.state.showAlert ?
                    <div>
                        <Alert variant="danger" onClose={() => this.setState({ showAlert: false })} dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                Please Enter the valid movie name!!
                            </p>
                        </Alert>
                    </div>
                    : <></>
                }

                <div>
                    <CardDeck>

                    {this.state.moviesData && this.state.moviesData.map((item, index)=>{
                        return(
                            <Col xs={12} lg={3} md={4} sm={6} key={index}>
                            <Card className="card-shadow">
                            <Card.Img variant="top" src={item.Poster} />
                            <Card.Body>
                                <Card.Title className="card-title">{item.Title}</Card.Title>
                                <Card.Text>
                                    <small className="text-muted">Released: {item.Year}</small>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={()=>{this.readAboutMovie(item)}} variant="outline-info">View Details</Button>
                            </Card.Footer>
                        </Card>
                        </Col>
                        )
                    })}
                    </CardDeck>
                    <br/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        movieDetails : state.movie,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        readMovie:(val)=>dispatch({
            type: "READ_MORE", payload:val 
        })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)