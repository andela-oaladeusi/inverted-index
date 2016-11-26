'use strict';
//  Tick present word document with jquery
// This function populate the in index table
let checkIndex = (dataIndex, length, fileName) => {
    // id: is the name of the file, dataIndex[id]: will each object inside, dataset
    $('.indexDiv').append('<table id = table_>');
    $('thead').append('<tr><th>' + fileName + ' file</th>');
    for (let headLoop = 0; headLoop <= length; headLoop++) {
        if (headLoop === 0) {
            $('thead').append('<th>Terms</th>');
        }
        else {
            $('thead').append('<th>doc_' + headLoop + '</th>');
        }
    }
    $('thead').append('</tr>');
    for (let index in dataIndex) {
        $('tbody').append('<tr>');
        $('tbody').append('<td>' + index + '</td>');
        for (let k = 0; k < length; k++) {
            if (dataIndex[index][k]) {
                $('tbody').append('<td>' + '<i class = "fa fa-check"' +
                    'style = "font-size:15px"></i>' + '</td>');
            } else {
                $('tbody').append('<td>' + '<i class = "fa fa-times-circle-o"' +
                    'aria-hidden = "true"></i>' + '</td>');
            }
        }
        $('tbody').append('</tr>');
    }
    $('.indexDiv').append('</table');
};
// On press enter, it will call search function
$('#search-input').keypress((e) => {
    if (e.which === 13) {
        deleteTable();
        searchFunction();
    }
});
// json file upload
document.getElementById('fileUpload').addEventListener('change', (e) => {
    getFile(e.target.files[0]);
});
// create index button click
let createIndexButton = () => {
    if (document.getElementById('fileUpload').value === "") {
        alert("Upload a file");
        return;
    }
    let checkName = checkExistName();
    if (checkName) {
        let listOfFileName = [];
        invertedClass.names.push(invertedClass.fileName);
        invertedClass.createIndex(invertedClass.json, invertedClass.fileName);
        let fileName = invertedClass.fileName;
        listOfFileName.push(fileName);

        // dynamically populate dropdown list with uploaded file name
        $.each(listOfFileName, function () {
            options.append($("<option />").val(this).text(this));
        });

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

$('#index-drop-list').on('change', function () {
    let jsonName = $(this).val();
    deleteTable();
    checkIndex(invertedClass.getIndex(jsonName), invertedClass.jLength[jsonName], jsonName);
});

// Delete table
let deleteTable = () => {
    $('.responstable tr').remove();
    $('.responstable th').remove();
    $('.responstable td').remove();
};
let searchFunction = () => {
    let searchValue = $('#search-input').val();
    let filterName = document.getElementById("filter-drop");
    let selectedFilter = filterName.options[filterName.selectedIndex].value;
    let searchResult = invertedClass.searchIndex(searchValue, selectedFilter);
    checkIndex(searchResult, invertedClass.jLength[selectedFilter], selectedFilter);

};
let getFile = (filePath) => {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.json)$/;
    if (regex.test($("#fileUpload").val().toLowerCase())) {
        if (typeof (FileReader) !== "undefined") {
            let reader = new FileReader();
            reader.onload = (e) => {
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
                    alert("Invalid JSON FILE");
                }
            };
            reader.readAsText(filePath);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid JSON file.");
    }
};
let checkExistName = () => {
    invertedClass.names.forEach((name) => {
        if (name === invertedClass.fileName) {
            alert('file already exist');
            throw new Error("Something went badly wrong!");
        }
    });
    return true;
};