import * as React from "react"
import * as PropTypes from "prop-types"

export class SimpleReactComponent extends React.Component {
    render() {
        return <p>{this.props.text}</p>
    }
}

SimpleReactComponent.defaultProps = {
    text: "Placeholder",
    num: 42,
    bool: true,
    fancyColor: "#0099ff",
}

SimpleReactComponent.propTypes = {
    text: PropTypes.string,
    num: PropTypes.number,
    bool: PropTypes.bool,
    fancyColor: PropTypes.string,
}
