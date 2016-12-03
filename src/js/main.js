'use strict';
/* jshint browser: true */

/**
* displayAllSearch function
* This will display all search query
* @function
* @param {Object} dataIndex 
*/
let displayAllSearch = (dataIndex) => {
	for (let tableName in dataIndex) {
		checkIndex(dataIndex[tableName], invertedClass.jLength[tableName], tableName);
	}

};

/**
* displayAllSearch function
* This will display all search query in a table
*/
let checkIndex = (dataIndex, length, fileName) => {
	let indexDiv = '<br><br><br><div class = "indexDiv"><h2 id = "titleHeader">' + 
	fileName + '</h2>';

	indexDiv += '<table class = "responstable">';

	for (let headLoop = 0; headLoop <= length; headLoop++) {
		if (headLoop === 0) {
			indexDiv += '<thead><tr><th>Terms</th>';
		}
		else {
			indexDiv += '<th>doc_' + headLoop + '</th>';
		}
	}
	indexDiv += '</tr></thead>';

	// This iteration will mark each column in tbody
	indexDiv += '<tbody>';
	for (let term in dataIndex) {
		indexDiv += '<tr><td>' + term + '</td>';

		for (let column = 0; column < length; column++) {
			if (dataIndex[term][column]) {
				indexDiv += '<td> <i class = "fa fa-check"' +
					'style = "font-size:15px"></i> </td>';
			} else {
				indexDiv += '<td> <i class = "fa fa-times-circle-o"' +
					'aria-hidden = "true"></i></td>';
			}
		}
		indexDiv += '</tr>';
	}
	indexDiv += '</tbody></table>';
	$('.indexContainer').append(indexDiv);
};

// On keypress , it will call search function
$('#search-input').keypress(() => {
	try {
		searchFunction();
	} catch (e) {
		return;
	}
});

// On Enter button press, it will call search function
$('#search-input').keypress((e) => {
	if (e.which === 13) {
		try {
			searchFunction();
		} catch (e) {
			return;
		}
	}
});

// Json file upload
document.getElementById('fileUpload').addEventListener('change', (e) => {
	getFile(e.target.files[0]);
});

// Create index button click
let createIndexButton = () => {
	if (document.getElementById('fileUpload').value === "") {
		alert("Upload a file");
		return;
	}

	if (!checkExistingFileName()) {
		let listOfFileName = [];
		invertedClass.names.push(invertedClass.fileName);
		invertedClass.createIndex(invertedClass.json, invertedClass.fileName);

		let fileName = invertedClass.fileName;
		listOfFileName.push(fileName);

		// dynamically populate dropdown list with uploaded file names for search
		$.each(listOfFileName, function () {
			options.append($("<option />").val(this).text(this));
		});

		// dynamically populate dropdown list with uploaded file names for index
		$.each(listOfFileName, function () {
			indexListOptions.append($("<option />").val(this).text(this));
		});

		deleteTable();
		checkIndex(invertedClass.getIndex(fileName),
			invertedClass.jLength[fileName], fileName, setInputEmpty());
		invertedClass.json = null;
		invertedClass.fileName = null;
		invertedClass.singleJsonIndex = {};
	}

};

// Set input element of type file to ""
let setInputEmpty = () => {
	document.getElementById('fileUpload').value = "";
};

// filter search option
let options = $("#filter-drop");

//dropdown list for index viewing
let indexListOptions = $("#index-drop-list");

// create index table upon selecting any option from select button
$('#index-drop-list').on('click', function () {
	let jsonName = $(this).val();
	return jsonName === null ? alert('No file to select') : showIndex(jsonName);
});

// get and display index
let showIndex = (jsonName) => {
	deleteTable();
	checkIndex(invertedClass.getIndex(jsonName), invertedClass.jLength[jsonName],
		jsonName);
};

// Delete table and create a new table container
let deleteTable = () => {
	$("#table-holder").remove();
	$('figure').append('<div class= "indexContainer" id = "table-holder"></div>');
};

// search function
let searchFunction = () => {
	deleteTable();
	let searchValue = $('#search-input').val();
	let filterName = document.getElementById("filter-drop");
	let selectedFilter = filterName.options[filterName.selectedIndex].value;
	let searchResult = invertedClass.searchIndex(searchValue, selectedFilter);

	if (selectedFilter === 'all') {
		displayAllSearch(searchResult);
	} else {
		checkIndex(searchResult, invertedClass.jLength[selectedFilter], 
		selectedFilter);
	}
};


// create index table upon selecting any option from select button
$('#filter-drop').on('click', function () {
	let filterName = $(this).val();
	return filterName === null ? alert('No file to select') : searchFunction();
});


// Selected Json file's File Reader function
let getFile = (filePath) => {
	let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.json)$/;
	if (regex.test($("#fileUpload").val().toLowerCase())) {
		let reader = new FileReader();
		reader.onload = () => {
			let jUpload = JSON.parse(reader.result);
			if (invertedClass.isValidJson(reader.result)) {
				if (!invertedClass.isJsonEmpty(jUpload) &&
					invertedClass.validateJsonContent(jUpload)) {
					invertedClass.json = jUpload;
					invertedClass.fileName = filePath.name;
				}
				else {
					alert('Invalid Json Content');
					setInputEmpty();
					return;
				}
			} else {
				alert("Invalid Json File");
			}
		};
		reader.readAsText(filePath);
	} else {
		alert("Please upload a valid JSON file.");
		setInputEmpty();
		return;
	}
};

// To check if json file already exist
let checkExistingFileName = () => {
	invertedClass.names.forEach((name) => {
		if (name === invertedClass.fileName) {
			alert('file already exist');
			setInputEmpty();
			throw true;
		}
	});
	return false;
};