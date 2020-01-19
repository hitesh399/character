import React from 'react'
import { Card, ListGroup, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Animated from '../Animated'
import DateTimeHelper from '../../plugins/dateHelper'

export default class CharacterCard extends React.PureComponent {

    render() {
        const { image, name, id, created, status, species, gender, origin, location } = this.props
        const dateIns = new DateTimeHelper(created)
        return (
            <Animated bottom>
                <Card className="charater-card">
                    <div className="image-area">
                        <Card.Img variant="top" src={image} />

                        <Card.ImgOverlay>
                            <Card.Title>{name}</Card.Title>
                            <Card.Text>Id: {id} - Created {dateIns.ago()}</Card.Text>
                        </Card.ImgOverlay>

                    </div>
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Status </strong></Col>
                                    <Col className="align-right">{status}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Species </strong></Col>
                                    <Col className="align-right">{species}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Gender </strong></Col>
                                    <Col className="align-right">{gender}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Origin </strong></Col>
                                    <Col className="align-right">{origin ? origin.name : null}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Last Location </strong></Col>
                                    <Col className="align-right">{location ? location.name : null}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Animated>
        )
    }
}

CharacterCard.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number,
    image: PropTypes.string,
    species: PropTypes.string,
    created: PropTypes.string,
    status: PropTypes.string,
    gender: PropTypes.string,
    origin: PropTypes.object,
    location: PropTypes.object
}