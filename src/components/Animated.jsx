import IntersectionVisible from 'react-intersection-visible';
import Fade from 'react-reveal/Fade';
import React from 'react'
export default class AnimatedContent extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = { appear: false }
    }
    onHide(entries) {
        this.setState({ appear: false })
    }

    onShow(entries) {
        this.setState({ appear: true })
    }

    onIntersect(entries) {
    }
    render() {
        const { appear } = this.state

        return (<IntersectionVisible onIntersect={e => this.onIntersect(e)}
            onHide={e => this.onHide(e)}
            onShow={e => this.onShow(e)}>
            <Fade when={appear} {...this.props}>
                {this.props.children}
            </Fade>
        </IntersectionVisible>)
    }
}