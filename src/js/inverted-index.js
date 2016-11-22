'use strict';
/**Project Author: Aladeusi Olawale Author
 * Author's Email: olawale.aladeusi@andela.com
 * Project Title: Inverted index 
 * Date: 21/11/2016
 * 
 */

//  Main Class
class InvertedIndexClass {
    // constructor use to initialize identifier
    constructor() {
        this.allIndexMap = []; //This variable array will keep track of all index object
        this.json = []; // json array will hold our json files for multiple upload
        this.fileName = null; //fileName: Name of each json file`
        this.indexName = {}; // it will hold all json index for different json files
        this.len1 = {}; //len1 : it will keep the length of each json file map up with there names
    }
    // Create Index method, the method is use to generate the index for a json file
    // It accept two parameters, Json file and the name of the Json file
    createIndex(jsonArray, jsonName) {
        let file = jsonArray[0];
        let titleTextArray = [];
        let singleJsonIndex = {};
        this.len1[jsonName] = jsonArray[0].length;

        // This accept Json file, and pick all the document in it seperately,
        //  merging text and title key of the document for each iteration
        for (let index in file) {
            let documentArray = file[index];
            let rawTitleArr = documentArray.title.toLowerCase().match(/\w+/g);
            let rawTextArr = documentArray.text.toLowerCase().match(/\w+/g);
            let joinTitleText = [...new Set([...rawTitleArr, ...rawTextArr])];
            titleTextArray.push(joinTitleText);
        }

       // This loop arrange the index
        for (let index in titleTextArray) {
            titleTextArray[index].forEach(function (key) {
                if (singleJsonIndex[key]) {
                    if (!singleJsonIndex[key][index]) {
                        singleJsonIndex[key][index] = true;
                    }
                } else {
                    let oneIndex = {};
                    oneIndex[index] = true;
                    singleJsonIndex[key] = oneIndex;

                }
            });
        }
        this.indexName[jsonName] = singleJsonIndex;
    }

    //  Method to get JSON's index' and it takes one parameter, name of selected JSON
    getIndex(jsonName) {
        return this.indexName[jsonName];
    }

    //  Search method, it takes two parameter, term to search and filter's' name
    searchIndex(term, filterName) {
        let searchResult = {};
        let allSearchTerm = term.toLowerCase().match(/\w+/g);
        let searchSingleJson = this.indexName[filterName];
        allSearchTerm.forEach(function (eachWord) {
            if (eachWord in searchSingleJson) {
                searchResult[eachWord] = searchSingleJson[eachWord];
            }
        });
        return searchResult;
    }

    // method to read file uploaded and validate it 
    getFile(filePath) {
        let _this = this;
        let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.json)$/;
        if (regex.test($("#fileUpload").val().toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                let reader = new FileReader();
                this.fileName = filePath.name;
                reader.onload = function (e) {
                    let jUpload = JSON.parse(reader.result);
                    if (_this.isValidJson(jUpload) && (!_this.isJsonEmpty(jUpload))) {
                        _this.json.push(jUpload);
                    }
                    else {
                        alert("Invalid Json File");
                        return;
                    }
                };
                reader.readAsText(filePath);
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid JSON file.");
        }
    }

    // method to validate json content
    validateJsonContent(jUpload) {
        if (jUpload.hasOwnProperty('title') && jUpload.hasOwnProperty('text')) {
            return true;
        }
        else {
            return false;
        }

    }

    // Methdo to check if Json is valid or not
    isValidJson(item) {
        item = typeof item !== "string" ? JSON.stringify(item) : item;
        try {
            item = JSON.parse(item);
        } catch (e) {
            return false;
        }
        if (typeof item === "object" && item !== null) {
            return true;
        }
        return false;
    }

    // Method to check if json is empty or not
    isJsonEmpty(item) {
        if (item.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }
}

// Create instance for InvertedIndexClass
let invertedClass = new InvertedIndexClass();