import React from "react";

function AddTask(props){

	function getDate(e){
		let textDateOfComplection = e.target.value;
		complectDate(textDateOfComplection);
		return textDateOfComplection;
	}

	var complectDate = props.getDateOfComplection;

	return(
		<div id = "forTask" className = {props.borderColor}>
			<span id = "close" onClick = {() =>props.deleteSingleTask(props.itemIndex)}></span>
			<p id = "currentPerfomerName" className = "currentPerfomerName">Perfomer Name: {props.perfomerName}</p>
			<p id = "currentPriority" className = "currentPriority">Priority: {props.priorityText.substr(3)}</p>
			<div id = "currentTask" className = "currentTask">
				<h3>Task</h3>
				<p id = "forTaskText" className = "forTaskText">{props.whatToDo}</p>
			</div>
			<p id = "dateOfCompletion">
				<label>Date of Completion</label>
				<input type = "date" placeholder = "dd/mm/yyyy" onChange = {getDate}></input>
				<button id = "moveToCompleted" className ="moveToCompleted" onClick = {()=>props.moveToCompleted(props.completedIndex)}>Move to completed</button>
			</p>
			<p id = "curentDateOfIssue" className = "curentDateOfIssue">Date of Issue: {props.dateOfIssue}</p>
		</div>
	)
}

export default AddTask;