import React from "react";

function AddComleted(props){
	return(
		<div id = "generatedCompleted">
			<div id = "our">
				<p id = "complPerfomerName">Perfomer Name: {props.completedPerfomerName}</p>
				<p id =	 "complPriority">Priority: {props.completedPriority.substr(3)}</p>
			</div>
			<h3>Completed task</h3>
			<p id = "complText">{props.complText}</p>
			<div id = "ourTwo">
				<p id = "complIssueDate">Date of Issue: {props.complDateOfIssue}</p>
				<p id = "complDate">Date of Complection: {props.dateOfComplection}</p>
			</div>
		</div>
		)
}
export default AddComleted;