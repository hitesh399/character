import React from 'react'
import { Row, Col, CardColumns } from 'react-bootstrap'
import CharCard from './Card'
import Loader from '../Loader'
import ListSort from './ListSort'
import ListPagination from '../Pagination'
import helper from 'js-object-helper'
import NoRecordFound from '../NoRecordFound'

export default class CharacterList extends React.Component {

    shouldComponentUpdate(nextProps) {
        return this.props.shouldUpdate !== nextProps.shouldUpdate
    }
    componentDidMount() {
        this.props.setRequestStatus(true)
        window.$axios(this.props.name).then((response) => {
            this.props.setData(
                helper.getProp(response, 'results', []),
                1,
                helper.getProp(response, 'info.count', 0),
                helper.getProp(response, 'info', {}),

            )
        }).catch(() => {
            this.props.setData([], 1, 0, {})
        })
    }

    render() {
        const { requesting, data, name } = this.props

        return (

            <>

                <Row className="m-b-10">
                    <Col xl={12} lg={12} md={12} sm={12} xs={12} >
                        <ListSort />
                    </Col>
                </Row>
                {requesting ?
                    <Row className="m-b-10">
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Loader />
                        </Col>
                    </Row > : null
                }
                <NoRecordFound name={name} />
                <CardColumns as={Row}>
                    {
                        data && data.map(
                            item => <Col key={`_key-${item.id}`} xl={3} lg={3} md={3} sm={6} xs={6}>
                                <CharCard
                                    image={item.image}
                                    id={item.id}
                                    name={item.name}
                                    status={item.status}
                                    species={item.species}
                                    origin={item.origin}
                                    gender={item.gender}
                                    created={item.created}
                                    location={item.location}
                                />
                            </Col>
                        )
                    }
                </CardColumns>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <ListPagination name={name} />
                    </Col>
                </Row>
            </>

        )
    }
}
