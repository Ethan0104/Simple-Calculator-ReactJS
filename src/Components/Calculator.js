import React, { Component } from "react"
import Button from "./Button"
import Output from "./Output"

const calcContainerStyle = {
	width: "40vw",
	height: "85vh",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	background: "#ced6e0",
	borderRadius: "5vh"
}
const calcStyle = {
	width: "30vw",
	height: "60vh",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)"
}
const captionStyle = {
	whiteSpace: "nowrap",
	overflow: "hidden",
	position: "absolute",
	right: "0px",
	transform: "translate(-5px, -75%)"
}
const captionContainerStyle = {
	width: "31vw",
	height: "35px",
	backgroundColor: "white",
	margin: "12.5vh auto",
	transform: "translate(0%, -150%)",
	borderRadius: "5px"
}

class Calculator extends Component {
	constructor(props) {
		super(props)

		this.state = {
			value1: "0", // First value in the operation
			value2: "", // Second value in the operation
			operation: null, //null is not doing anything
			didFinish: false //true after equal sign is pressed
		}
	}
	componentDidMount() {
		document.addEventListener("keydown", this.keyHandler.bind(this))
	}

	inputNum = num => {
		if (this.state.didFinish) {
			this.acHandler()
			this.setState({
				didFinish: false
			})
		}
		if (this.state.operation == null) {
			if (this.state.value1.length >= 16) {
				return
			}
			if (this.state.value1 === "0") {
				this.setState({
					value1: num
				})
			} else {
				this.setState({
					value1: this.state.value1 + num
				})
			}
		} else {
			if (this.state.value2.length >= 16) {
				return
			}
			if (this.state.value2 === "0") {
				this.setState({
					value2: num
				})
			} else {
				this.setState({
					value2: this.state.value2 + num
				})
			}
		}
	}
	acHandler = () => {
		this.setState({
			value1: "0",
			operation: null
		})
	}
	signSwitchHandler = () => {
		let numeric = parseFloat(this.state.value1)
		this.setState({
			value1: String(-numeric)
		})
	}
	operationKeyHandler = (val, functional) => {
		if (functional) {
			if (this.state.didFinish) {
				this.setState({
					didFinish: false
				})
			}
			this.setState({
				operation: val
			})
		}
	}
	equalHandler = () => {
		var val1 = parseFloat(this.state.value1)
		var val2 = parseFloat(this.state.value2)
		switch (this.state.operation) {
			case "+":
				this.setState({
					value1: val1 + val2,
					value2: "",
					didFinish: true
				})

				break
			case "-":
				this.setState({
					value1: val1 - val2,
					value2: "",
					didFinish: true
				})
				break
			case "×":
				this.setState({
					value1: val1 * val2,
					value2: "",
					didFinish: true
				})
				break
			case "/":
				this.setState({
					value1: val1 / val2,
					value2: "",
					didFinish: true
				})
				break
			case "Pow":
				this.setState({
					value1: Math.pow(val1, val2),
					value2: "",
					didFinish: true
				})
				break
			case "Root":
				this.setState({
					value1: Math.pow(val1, 1 / val2),
					value2: "",
					didFinish: true
				})
				break
		}
		this.setState({
			operation: null
		})
	}
	keyHandler = event => {
		// console.log(event.key)
		event.preventDefault()
		switch (event.key) {
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
			case ".":
				this.inputNum(event.key)
				break
			case "+":
			case "-":
			case "/":
				this.operationKeyHandler(event.key, true)
				break
			case "x":
			case "*":
				this.operationKeyHandler("×", true)
				break
			case "^":
				this.operationKeyHandler("Pow", true)
				break
			case "r":
				this.operationKeyHandler("Root", true)
				break
			case "Enter":
			case "=":
				this.equalHandler()
				break
			case "c":
				this.acHandler()
				break
		}
	}

	render() {
		var currentVal = this.state.value1
		if (this.state.operation != null && this.state.value2 !== "") {
			currentVal = this.state.value2
		}
		return (
			<div style={calcContainerStyle}>
				<div style={captionContainerStyle}></div>
				<table style={calcStyle}>
					<caption style={captionStyle}>
						<Output val={currentVal}></Output>
					</caption>
					<tbody>
						<tr>
							<td>
								<Button val="C" clickHandler={this.acHandler}></Button>
							</td>
							<td>
								<Button
									val="Pow"
									clickHandler={this.operationKeyHandler}
									calcMode={this.state.operation}
								></Button>
							</td>
							<td>
								<Button
									val="Root"
									clickHandler={this.operationKeyHandler}
									calcMode={this.state.operation}
								></Button>
							</td>
							<td>
								<Button
									val="+"
									clickHandler={this.operationKeyHandler}
									calcMode={this.state.operation}
								></Button>
							</td>
						</tr>
						<tr>
							<td>
								<Button val="7" clickHandler={this.inputNum}></Button>
							</td>
							<td>
								<Button val="8" clickHandler={this.inputNum}></Button>
							</td>
							<td>
								<Button val="9" clickHandler={this.inputNum}></Button>
							</td>
							<td>
								<Button
									val="-"
									clickHandler={this.operationKeyHandler}
									calcMode={this.state.operation}
								></Button>
							</td>
						</tr>
						<tr>
							<td>
								<Button val="4" clickHandler={this.inputNum}></Button>
							</td>
							<td>
								<Button val="5" clickHandler={this.inputNum}></Button>
							</td>
							<td>
								<Button val="6" clickHandler={this.inputNum}></Button>
							</td>
							<td>
								<Button
									val="×"
									clickHandler={this.operationKeyHandler}
									calcMode={this.state.operation}
								></Button>
							</td>
						</tr>
						<tr>
							<td>
								<Button val="1" clickHandler={this.inputNum}></Button>
							</td>
							<td>
								<Button val="2" clickHandler={this.inputNum}></Button>
							</td>
							<td>
								<Button val="3" clickHandler={this.inputNum}></Button>
							</td>
							<td>
								<Button
									val="/"
									clickHandler={this.operationKeyHandler}
									calcMode={this.state.operation}
								></Button>
							</td>
						</tr>
						<tr>
							<td>
								<Button
									val="+/-"
									clickHandler={this.signSwitchHandler}
								></Button>
							</td>
							<td>
								<Button val="0" clickHandler={this.inputNum}></Button>
							</td>
							<td>
								<Button val="." clickHandler={this.inputNum}></Button>
							</td>
							<td>
								<Button val="=" clickHandler={this.equalHandler}></Button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default Calculator
