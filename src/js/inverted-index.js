'use strict';
/**Project Author: Aladeusi Olawale Author
 * Author's Email: olawale.aladeusi@andela.com
 * Project Title: Inverted index 
 * Date: 21/11/2016
 * 
 */

//  Main Class
class InvertedIndexClass {

    /** constructor use to initialize identifier
     * 'json' array holds our json files
     * fileName: Name of each json file`
     * it will hold all json index for different json files
     * jLength : it will keep the length of each json file map up with there names
    */
    constructor() {
        this.json = null;
        this.fileName = null; 
        this.indexName = {};  
        this.jLength = {}; 
    }

    /**
     * Create Index method, the method is use to generate the index for a json file
     * It accept two parameters, Json file and the name of the Json file
    */
    createIndex(jsonArray, jsonName) {
        let titleTextArray = [];
        let singleJsonIndex = {};
        this.jLength[jsonName] = jsonArray.length;

        /** This accept Json file, and pick all the document in it seperately
         * merging text and title key of the document for each iteration
         */
        for (let index in jsonArray) {
            let documentArray = jsonArray[index];
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
        return singleJsonIndex;
    }

    //  Method to get JSON's index' and it takes one parameter, name of selected JSON
    getIndex(jsonName) {
        return this.indexName[jsonName];
    }

    // Method to search all files
    searchIndex(term, filterName) {
        let searchResult = {};
        let allSearchTerm = term.toLowerCase().match(/\w+/g);
        if (filterName === 'all') {
            for (let key in this.indexName) {
                console.log(key);
                let searchResultKey = {};
                let searchSingleJson = this.indexName[key];
                allSearchTerm.forEach(function (eachWord) {
                    if (eachWord in searchSingleJson) {
                        searchResultKey[eachWord] = searchSingleJson[eachWord];
                    }
                });
                searchResult[key] = searchResultKey;
            }
            return searchResult;
        }
        else {
            let searchSingleJson = this.indexName[filterName];
            allSearchTerm.forEach(function (eachWord) {
                if (eachWord in searchSingleJson) {
                    searchResult[eachWord] = searchSingleJson[eachWord];
                }
            });
            return searchResult;
        }
    }

    // method to validate json content
    validateJsonContent(jUpload) {
        if (jUpload[0].title && jUpload[0].text) {
            return true;
        }
        else {
            return false;
        }

    }

    // Methdo to check if Json is valid or not
    isValidJson(jUpload) {
        if (jUpload && typeof jUpload === "object") {
            return true;
        }
        try {
            jUpload = JSON.parse(jUpload);
        } catch (e) {
            return false;
        }
        return true;
    }

    // Method to check if json is empty or not
    isJsonEmpty(jUpload) {
        if (jUpload.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }
}

// Create instance for InvertedIndexClass
let invertedClass = new InvertedIndexClass();