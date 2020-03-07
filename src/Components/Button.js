import React, { Component } from "react"

const buttonStyleWide = {
	width: "7.5vw",
	height: "12vh",
	fontSize: "2.5vw",
	border: "none",
	outlineWidth: "0px",
	backgroundImage: "linear-gradient(120deg, #95a5a6, #7f8c8d, #95a5a6)",
	backgroundSize: "200%",
	color: "white",
	borderRadius: "5px",
	transition: "0.5s"
}
const buttonStyleMobile = {
	width: "15vw",
	height: "12vh",
	fontSize: "3vw",
	border: "none",
	outlineWidth: "0px",
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

		if (window.innerWidth >= window.innerHeight) {
			this.state = {
				functional: functional,
				hover: false,
				buttonStyle: buttonStyleWide
			}
		} else {
			this.state = {
				functional: functional,
				hover: false,
				buttonStyle: buttonStyleMobile
			}
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
		let currentStyle = this.state.buttonStyle
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
