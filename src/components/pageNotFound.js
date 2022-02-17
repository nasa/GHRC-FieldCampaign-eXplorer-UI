import React, { Component } from "react"

class PageNotFound extends Component {

    render() {

        return (
            <div className="error-page">
                <span className="error-message">{this.props.title}</span>
                <span className="error-line1">{this.props.message}</span>
                <br></br>
                <span className="error-line2">{this.props.description}</span>

            </div>
        )
    }
}

export default PageNotFound
