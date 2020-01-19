import React from 'react'
import { Pagination } from 'react-bootstrap'
import { connect } from 'react-redux'
import helper from 'js-object-helper'
import {
    setData,
    changeRequestStatus
} from '../actions/TableActions'

export class ListPagination extends React.PureComponent {
    constructor(props) {
        super(props)
        this.changePage = this.changePage.bind(this)
        this.isAMobile = this.isAMobile.bind(this)
        this.state = { isMobile: false }
    }
    componentDidMount() {
        this.isAMobile()
        window.addEventListener('resize', this.isAMobile)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.isAMobile)
    }
    isAMobile() {
        const isMobile = window.innerWidth <= 576
        this.setState({ isMobile })
    }
    changePage(e, page) {
        e.preventDefault()
        this.props.dispatch(changeRequestStatus('character', true))
        window.$axios('character', { params: { page, ...this.props.values } }).then((response) => {
            this.props.dispatch(setData(
                'character',
                helper.getProp(response, 'results', []),
                page,
                helper.getProp(response, 'info.count', 0),
                helper.getProp(response, 'info', {}),

            ))

        }).catch(() => {
            this.props.dispatch(setData('character', [], 1, 0, {}))
        })
    }

    render() {
        const { pages, currentPage, requesting } = this.props
        const { isMobile } = this.state
        const paginationArr = pagination(currentPage, pages)
        return (
            <Pagination>
                <Pagination.First  onClick={(e) => this.changePage(e, 1)} active={currentPage === 1} disabled={requesting || currentPage === 1} />
                <Pagination.Prev disabled={requesting || currentPage === 1} onClick={(e) => this.changePage(e, (currentPage - 1))} />
                {
                    !isMobile && paginationArr.map((page, index) => page === '...' ?
                        <Pagination.Ellipsis key={`${index}_page_${page}`} /> : <Pagination.Item key={`page_${page}`} disabled={requesting} onClick={(e) => this.changePage(e, page)} active={currentPage === page}>{page}</Pagination.Item>
                    )
                }
                {isMobile ? <Pagination.Item active>{currentPage}</Pagination.Item> : null}
                <Pagination.Next disabled={requesting || pages === currentPage} onClick={(e) => this.changePage(e, (currentPage + 1))} />

                <Pagination.Last disabled={requesting || currentPage === pages}
                    onClick={(e) => this.changePage(e, pages)}
                />
            </Pagination>
        )
    }
}

export default connect(function (state, props) {
    return {
        ...props,
        total: helper.getProp(state, ['table', props.name, 'meta', 'total']),
        currentPage: helper.getProp(state, ['table', props.name, 'meta', 'currentPage'], 1),
        pages: helper.getProp(state, ['table', props.name, 'info', 'pages'], 1),
        requesting: helper.getProp(state, ['table', props.name, 'requesting'], false),
        values: helper.getProp(state, ['form', 'character_list_filter', 'values'], {}),
    }
})(ListPagination)


function pagination(c, m, delta = 5) {
    var current = c,
        last = m,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
}