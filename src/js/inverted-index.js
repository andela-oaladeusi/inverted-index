'use strict';
/**Project Author: Aladeusi Olawale Author
 * Author's Email: olawale.aladeusi@andela.com
 * Project Title: Inverted index 
 * Date: 21/11/2016
 */

// InvertedIndexClass Main Class
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
        this.names = [];
        this.singleJsonIndex = {};
    }

    /**
     * Create Index method, the method is use to generate the index for a json file
     * It accept two parameters, Json file and the name of the Json file
    */
    createIndex(jsonArray, jsonName) {
        let titleTextArray = [];
        // let singleJsonIndex = {};
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
            this.arrangeIndex(index, titleTextArray);
        }
        this.indexName[jsonName] = this.singleJsonIndex;
        const singleIndex = this.singleJsonIndex;
        this.singleJsonIndex = {};
        return singleIndex;
    }
    // This method setup index
    arrangeIndex(index1, titleTextArray1) {
        let _this = this;
        titleTextArray1[index1].forEach((key) => {
            if (_this.singleJsonIndex[key]) {
                if (!_this.singleJsonIndex[key][index1]) {
                    _this.singleJsonIndex[key][index1] = true;
                }
            } else {
                let oneIndex = {};
                oneIndex[index1] = true;
                _this.singleJsonIndex[key] = oneIndex;
            }
        });
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
                allSearchTerm.forEach((eachWord) => {
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
            allSearchTerm.forEach((eachWord) => {
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
            return true;
        } catch (e) {
            return false;
        }
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
const invertedClass = new InvertedIndexClass();
