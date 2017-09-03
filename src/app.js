import React from "react";
import AddTask from "./task.js";
import AddComleted from "./completedtask.js"

class List extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			arr: [],
			arrCompleted: [],
			inputPerfomerName: "",
			inputDateOfIssue: "",
			textaereaWhatToDo: "",
			showForm: "formFadeOut",
			showDropOne: "dropOneFadeOut",
			showDropTwo: "dropTwoFadeOut",
			defaultTextDropOne: "Priority",
			priorityValue: "",
			completedPriorityValue: "",
			textSortLi: "",
			defaultTextDropTwo: "Sort By:",
			searchInputText:"",
			borderColor:"",
			h3Value: "Tasks For Execution",
			inputDateOfComplection: "",
			page: 1
		}
	}

	togleFormForTask(){
		let cssClass = (this.state.showForm === "formFadeOut") ? "form" : "formFadeOut";
		this.setState({
			showForm: cssClass
		});
	}

	togleDropOne(){
		let cssClass = (this.state.showDropOne === "dropOneFadeOut") ? "dropOne" : "dropOneFadeOut";
		this.setState({
			showDropOne: cssClass
		});
	}

	togleDropTwo(){
		let cssClass = (this.state.showDropTwo === "dropTwoFadeOut") ? "dropTwo" : "dropTwoFadeOut";
		this.setState({
			showDropTwo: cssClass
		})
	}

	showPriority(e){
		let cuurentLi = e.target,
			textLi = cuurentLi.textContent;
			this.setState({
				defaultTextDropOne: textLi,
				priorityValue: textLi.charAt(0),
				completedPriorityValue: textLi
			});
			this.togleDropOne();
			this.setBorderColor(textLi);
	}

	showSortBy(e){
		let currentLi = e.target,
			textSortLi = currentLi.textContent;
			this.setState({
				defaultTextDropTwo: "Sort by:" + " " +textSortLi,
				textSortLi: textSortLi
			});
			this.togleDropTwo();
	}

	getPerfomerName(e){
		let textInputPerfomerName = e.target.value;
		this.setState({inputPerfomerName: textInputPerfomerName});
	}

	getDateOfIssue(e){
		let textInputDateOfIssue = e.target.value;
		this.setState({inputDateOfIssue: textInputDateOfIssue});
	}

	getWhatToDo(e){
		let textareaWhatToDo = e.target.value;
		this.setState({textaereaWhatToDo: textareaWhatToDo});
	}

	generateId(){
		this.uId = this.uId || 0;
		return this.uId++;
	}

	createTask(e){
		e.preventDefault();
		let perfomerName = this.state.inputPerfomerName,
			dateOfIssue = this.state.inputDateOfIssue,
			whatToDo = this.state.textaereaWhatToDo,
			id = this.generateId(),
			completedPriorityValue = this.state.completedPriorityValue,
			priorityValue = this.state.priorityValue,
			borderColor = this.state.borderColor
		let obj = {
			perfomerName: perfomerName,
			dateOfIssue: dateOfIssue,
			whatToDo: whatToDo,
			priorityValue: priorityValue,
			key: id,
			completedPriorityValue: completedPriorityValue,
			borderColor: borderColor,
			dateOfComplection: ""
		};
		if(perfomerName && dateOfIssue && whatToDo && this.state.priorityValue !== ""){
			let currentArr = this.state.arr;
			currentArr.push(obj);
			this.setState({
				arr: currentArr,
				inputPerfomerName: "",
				inputDateOfIssue: "",
				textaereaWhatToDo: "",
				defaultTextDropOne: "Priority",
				completedPriorityValue: "",
				priorityValue:"",
				borderColor: ""
			});
		}
	}

	setBorderColor(textLi){
		if(textLi === "1. Low "){
			this.setState({
				borderColor: "forTaskBorderGreen",
			})
		}else if(textLi === "2. Normal "){
			this.setState({
				borderColor: "forTaskBorderYellow",
			})
		}else if(textLi === "3. High "){
			this.setState({
				borderColor: "forTaskBorderPurple",
			})
		}
	}

	deleteTask(index){
		let arr = this.state.arr;
		arr.splice(index, 1);
		this.setState({arr: arr});
	}

	sortByPerfomerName(arr){
		arr.sort((a,b)=>{
			let c = a.perfomerName.toLowerCase(),
				d = b.perfomerName.toLowerCase();
				if(c<d){
					return -1;
				}else if(c>d){
					return 1;
				}
		});
	}

	sortByDateOfIssue(arr){
		arr.sort((a,b) =>{
			let c = a.dateOfIssue,
				d = b.dateOfIssue;
				if(c<d) return -1;
				if(c>d) return 1;
		});
	}

	sortByPriority(arr){
		arr.sort((a,b) =>{
			let c = a.priorityValue,
				d = b.priorityValue;
				if(c<d) return 1;
				if(c>d) return -1;
		});
	}

	fadeNavOneAndTwo(e){
		if(this.state.showDropOne === "dropOne"){
			this.setState({
				showDropOne: "dropOneFadeOut"
			});
			this.togleDropOne();
		};
		if(this.state.showDropTwo === "dropTwo"){
			this.setState({
				showDropTwo: "dropTwoFadeOut"
			});
			this.togleDropTwo();
		}
	}

	searchText(e){
		let searchInputText = e.target.value.toLowerCase();
		this.setState({searchInputText: searchInputText})
	}

	searching(arr){
		let filterArr = arr.filter(item =>{
			let currentProps = new Array;
			for(let p in item){
				currentProps.push(item[p])
			}
		return currentProps.toString().toLowerCase().indexOf(this.state.searchInputText)> -1;
		});
		return filterArr;
	}

	getDateOfComplection(textDateOfComplection){
		let maintextDateOfComplection = textDateOfComplection;
		this.setState({
			inputDateOfComplection: maintextDateOfComplection
		})
	}

	moveToCompleted(index){
		let arr = this.state.arr,
			arrCompleted = this.state.arrCompleted,
			completedTask = arr.splice(index, 1);
			arrCompleted.push(completedTask);
			this.setState({arr: arr});
	}

	showFirst(){
		this.setState({
			page: 1
		})
	}

	showSecond(){
		this.setState({
			page: 2
		})
	}

	firstPage(items){
		return(
			<div id = "task" className = "task">
				<h3 className = "tasksForExecution">{this.state.h3Value}</h3>
				{items}
			</div>
			)
	}

	secondPage(sortItemCompleted){
		return(
			<div id = "completedTask">
				<h3>Completed Tasks</h3>
					<button id = "exit" className = "exit" onClick = {this.showFirst.bind(this)}>Exit</button>
				<div id = "appCompleted" className = "appCompleted">
					{sortItemCompleted}
				</div>
			</div>
			)
	}


render(){
	let arrCompleted = this.state.arrCompleted;

	let itemCompleted = arrCompleted.map((item, index, arr) =>{
		var sortArrCompleted = new Array;
		for(let i = 0; i<item.length; i++){
			var sort = item[i];
			sortArrCompleted.push(sort)
		}
		return sort;
	})

	let sortItemCompleted = itemCompleted.map((item,index,arr)=>{
		let complDate = this.state.inputDateOfComplection;
		return(
			<AddComleted
				completedPerfomerName = {item.perfomerName}
				completedPriority = {item.completedPriorityValue}
				key = {item.key}
				complText = {item.whatToDo}
				complDateOfIssue = {item.dateOfIssue}
				dateOfComplection = {complDate}
			/>
			)
	})

	let arr = this.state.arr;
	if(this.state.textSortLi == "Perfomer Name"){
		this.sortByPerfomerName(arr);
	}else if(this.state.textSortLi == "Date of Issue"){
		this.sortByDateOfIssue(arr);
	}else if(this.state.textSortLi == "Priority"){
		this.sortByPriority(arr);
	}
	
	let filterArr = this.searching(arr);
	
	let items = filterArr.map((item, index) =>{
		return <AddTask 
			perfomerName = {item.perfomerName}
			dateOfIssue = {item.dateOfIssue}
			whatToDo = {item.whatToDo}
			priorityText = {item.completedPriorityValue}
			key = {item.key}
			itemIndex = {index}
			deleteSingleTask = {this.deleteTask.bind(this)}
			borderColor = {item.borderColor}
			getDateOfComplection = {this.getDateOfComplection.bind(this)}
			moveToCompleted = {this.moveToCompleted.bind(this)}
			completedIndex = {index}
		/>
	})

	let page = this.state.page == 1 ? this.firstPage(items) : this.secondPage(sortItemCompleted);


	return(
		<div id = "wrapperTwo" className = "wrapperTwo" onClick = {this.fadeNavOneAndTwo.bind(this)}>
			<div id = "app" className = "app">
				<div id = "formForTask" className = "formForTask">
					<div id = "headerForm" className = "headerForm" onClick = {this.togleFormForTask.bind(this)}>
						<span id = "expand" className = "expand"></span>
						<h4>Add Task</h4>
					</div>

					<form onSubmit = {this.createTask.bind(this)}>
						<div id = "form" className = {this.state.showForm}>
							<p id = "firstinput" className = "firstinput"> 
							<label>Perfomer Name</label>
							<input type = "text" id = "perfomerName" className = "perfomerName"
							onChange = {this.getPerfomerName.bind(this)}
							placeholder = "Perfomer Name"
							value = {this.state.inputPerfomerName}
							/>
								</p>

							<p id = "secondinput" className = "secondinput"> 
							<label>Date of Issue</label>
							<input type = "date" id = "dateOfIssue" className = "dd/mm/yyyy"
							placeholder ="Date of Issue"
							onChange = {this.getDateOfIssue.bind(this)}
							value = {this.state.inputDateOfIssue}
							/>
								</p>

							<p id = "whattodo">
							<label>What to Do</label>
							<textarea  id = "whatToDo" className = "whatToDo"
							placeholder = "What to Do"
							onChange = {this.getWhatToDo.bind(this)}
							value = {this.state.textaereaWhatToDo}
							/>
								</p>
						<div id = "priority">
							<p id = "selectPriority" onClick = {this.togleDropOne.bind(this)}>{this.state.defaultTextDropOne}</p>
							<ul id = "dropOne" className = {this.state.showDropOne}>
								<li onClick = {this.showPriority.bind(this)}>1. Low </li>
								<li onClick = {this.showPriority.bind(this)}>2. Normal </li>
								<li onClick = {this.showPriority.bind(this)}>3. High </li>
							</ul>
						</div>	
							<div id = "warning">
								<p id = "green">Green - Low priority</p>
								<p id = "yellow">Yellow - Normal priority</p>
								<p id = "purple">Purple - High priority</p>
							</div>
							<button id = "addTask" className = "addTask"
							onClick = {this.createTask.bind(this)}
							>Add Task</button>	
						</div>
					 </form>

				</div>

				<div id = "search" className = "search">
					<button id = "completed" className = "completed" onClick = {this.showSecond.bind(this)}>Show completed task</button>
					<div id = "ourSearch" className = "ourSearch">
						<input type = "text" id = "searchInput" placeholder = "Search" 
						onChange = {this.searchText.bind(this)}
						/>

						<div id = "nav" className = "nav">
							<p id = "sortBy" onClick = {this.togleDropTwo.bind(this)}>{this.state.defaultTextDropTwo}</p>
							<ul id = "dropTwo" className = {this.state.showDropTwo}>
								<li onClick = {this.showSortBy.bind(this)}>Perfomer Name</li>
								<li onClick = {this.showSortBy.bind(this)}>Date of Issue</li>
								<li onClick = {this.showSortBy.bind(this)}>Priority</li>
							</ul>
						</div>
					</div>
				</div>

				{page}
				
			</div>
		</div>	
		)
	}
}
export default List;