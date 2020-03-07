import React from "react"

const outputStyle = {
	fontSize: "40px",
	background: "linear-gradient(to right, #2980b9, #9b59b6)",
	backgroundClip: "text",
	WebkitBackgroundClip: "text",
	WWebkitTextFillColor: "transparent"
}

function Output(props) {
	return (
		<div>
			<h1 style={outputStyle}>{props.val}</h1>
		</div>
	)
}

export default Output
