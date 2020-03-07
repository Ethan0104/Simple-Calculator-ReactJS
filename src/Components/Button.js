import React, { Component } from "react"

const buttonStyle = {
	width: "7.5vw",
	height: "12vh",
	fontSize: "300%",
	border: "none",
	outlineWidth: "0px",
	//backgroundImage: "linear-gradient(120deg, #95a5a6, #7f8c8d, #95a5a6)",
	// backgroundImage: "linear-gradient(120deg, #70a1ff, #1e90ff, #70a1ff)",
	// backgroundImage: "linear-gradient(120deg, #747d8c, #57606f, #747d8c)",
	backgroundImage: "linear-gradient(120deg, #95a5a6, #7f8c8d, #95a5a6)",
	backgroundSize: "200%",
	color: "white",
	borderRadius: "5px",
	transition: "0.5s"
}
const hoveredButtonStyle = {
	backgroundPosition: "right"
}
const activeButtonStyle = {
	backgroundImage: "linear-gradient(120deg, #ff7f50, #ff6348, #ff7f50)"
}

class Button extends Component {
	constructor(props) {
		super(props)

		let numeric = new RegExp("[0-9]")
		let functional = false
		if (
			!numeric.test(this.props.val) &&
			this.props.val !== "A/C" &&
			this.props.val !== "+/-" &&
			this.props.val !== "." &&
			this.props.val !== "="
		) {
			functional = true
		}
		this.state = {
			functional: functional,
			hover: false
		}
		this.hoverHandler = this.hoverHandler.bind(this)
		this.blurHandler = this.blurHandler.bind(this)
	}

	hoverHandler() {
		this.setState({
			hover: true
		})
	}
	blurHandler() {
		this.setState({
			hover: false
		})
	}

	render() {
		let currentStyle = buttonStyle
		if (this.state.hover) {
			currentStyle = { ...currentStyle, ...hoveredButtonStyle }
		}
		if (this.props.calcMode === this.props.val) {
			currentStyle = { ...currentStyle, ...activeButtonStyle }
		}

		return (
			<div>
				<button
					style={currentStyle}
					onClick={() => {
						this.props.clickHandler(this.props.val, this.state.functional)
					}}
					onMouseEnter={this.hoverHandler}
					onMouseLeave={this.blurHandler}
				>
					{this.props.val}
				</button>
			</div>
		)
	}
}

export default Button
