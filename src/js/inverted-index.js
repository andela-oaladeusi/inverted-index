'use strict';
/**
 * InvertedIndexClass class constructor
 * @class
 */
class InvertedIndexClass {
  /**
   * class constructor
   * @constructor
  **/
  constructor() {
    this.json = null;
    this.fileName = null;
    this.allFileIndex = {};
    this.jLength = {};
    this.names = [];
    this.singleJsonIndex = {};
  }

  /**
   * Create index
   * @param {Array} jsonArray
   * @param {string} jsonName
   * @return {Object} singleIndex
   */
  createIndex(jsonArray, jsonName) {

    let titleTextArray = [];

    this.jLength[jsonName] = jsonArray.length;

		// This iteration will merge both title and text property of each files
    for (let countFile in jsonArray) {
      let documentArray = jsonArray[countFile];
      let joinTitleText = new Set((documentArray.title
                            .concat(documentArray.text))
                            .toLowerCase().match(/\w+/g));
      titleTextArray.push(joinTitleText);
    }

		// This iteration will arrange the index 
    for (let countFile in titleTextArray) {
      this.arrangeIndex(countFile, titleTextArray);
    }

		// sorted index
    let sortedIndex = {};
    Object.keys(this.singleJsonIndex)
      .sort()
      .forEach((key) => {
	      sortedIndex[key] = this.singleJsonIndex[key];
	    });

    this.allFileIndex[jsonName] = sortedIndex;
    this.singleJsonIndex = {};

    return sortedIndex;
  }

  /**
   * arrange index
   * @param {Integer} countFile
   * @param {Array} titleTextArray
  */
  arrangeIndex(countFile, titleTextArray) {
    let _this = this;

    titleTextArray[countFile].forEach((key) => {
    if (_this.singleJsonIndex[key]) {
      if (!_this.singleJsonIndex[key][countFile]) {
        _this.singleJsonIndex[key][countFile] = true;
       }
      } else {
        let oneIndex = {};
        oneIndex[countFile] = true;
        _this.singleJsonIndex[key] = oneIndex;
      }
    });
  }

	/**
 * Get a particular index
 * @param {String} jsonName
 * @return {Object}
 */
  getIndex(jsonName) {
    return this.allFileIndex[jsonName];
  }

  /**
   * Search Index.
   * @param {String}  query string
   * @param {String} filterName name of index to be searched.
   * @return {Object} searchResult 
  */
  searchIndex(query, filterName) {
   
   // check if search query is an array
    if(query.constructor === Array){
      query = query.toString();
    }

    let searchResult = {};
    const allSearchQuery = query.toLowerCase().match(/\w+/g);

    if (filterName === 'all' || arguments.length < 2) {
      for (let key in this.allFileIndex) {
        let searchResultKey = {};
        let searchSingleJson = this.allFileIndex[key];

        allSearchQuery.forEach((eachQuery) => {
          if (eachQuery in searchSingleJson) {
            searchResultKey[eachQuery] = searchSingleJson[eachQuery];
          } else {
            searchResultKey[eachQuery] = { 0: false };
          }
        });
        searchResult[key] = searchResultKey;
      }

      return searchResult;
    }
    else {
      let searchSingleJson = this.allFileIndex[filterName];
      allSearchQuery.forEach((eachQuery) => {
        if (eachQuery in searchSingleJson) {
          searchResult[eachQuery] = searchSingleJson[eachQuery];
        } else {
          searchResult[eachQuery] = { 0: false };
        }

      });
      return searchResult;
    }
  }

  /**
   *validateJsonContent.
   *@param {Object} jUpload
   *@return {Boolean} true or false 
  */
  validateJsonContent(jUpload) {
    try {
      return jUpload[0].title && jUpload[0].text;
    } catch (e) {
      return false;
    }
  }

  /**
   *isValidJson
   *@param {Object} jUpload
   *@return {Boolean} true or false 
  */
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

  /**
   *isJsonEmpty
   *@param {Object} jUpload
   *@return {Boolean} true or false 
  */
  isJsonEmpty(jUpload) {
    return jUpload.length === 0 ? true : false;
  }
}

// Create instance for InvertedIndexClass
const invertedClass = new InvertedIndexClass();