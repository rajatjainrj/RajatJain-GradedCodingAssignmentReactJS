import React from "react";
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import IMovie from "../../models/IMovie";


type Props = {
    movie: IMovie
};

const MovieItem = ({movie}: Props) => {
    const {
        id,
        title,
        posterurl
    } = movie;
    return (
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={`${posterurl}`} height='300px'/>
            <Card.Body>
                <Card.Title>
                    <div style={{fontSize:'1rem'}}>
                        {title}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div className="btn btn-outline-info btn-sm mt-3">
                            <FontAwesomeIcon className="me-2" icon={faHeart} style={{color:"red"}}/>
                            <span style={{color:"grey"}}>Add to favourites</span>
                        </div>
                    </div>
                </Card.Title>
            </Card.Body>
        </Card>
    );
}

export default MovieItem;
