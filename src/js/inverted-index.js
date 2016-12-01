'use strict';
/**
 * InvertedIndexClass class constructor
 * @class
 */
class InvertedIndexClass {

	/**
	 * class constructor
	 * @constructor
	 */
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
	 * @function
	 * @param {Array} jsonArray
	 * @param {string} jsonName
	 * @return {Object} singleIndex
	 */
	createIndex(jsonArray, jsonName) {

		if (!this.validateJsonContent(jsonArray)) {
			alert("Invalid Json Content");
			return;
		}

		let titleTextArray = [];

		this.jLength[jsonName] = jsonArray.length;

		// This iteration will merge both title and text property of each files
		for (let countFile in jsonArray) {
			let documentArray = jsonArray[countFile];
			let rawTitleArr = documentArray.title.toLowerCase().match(/\w+/g);
			let rawTextArr = documentArray.text.toLowerCase().match(/\w+/g);
			let joinTitleText = [...new Set([...rawTitleArr, ...rawTextArr])];
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
			.forEach( (key) => {
				sortedIndex[key] = this.singleJsonIndex[key];
			});


		this.allFileIndex[jsonName] = sortedIndex;
		this.singleJsonIndex = {};

		return sortedIndex;
	}

	/**
	 * arrange index
	 * @function
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
 * @function
 * @param {String} jsonName
 * @return {Object}
 */
	getIndex(jsonName) {
		return this.allFileIndex[jsonName];
	}

	/**
 * Search Index.
 * @function
 * @param {String} query query string
 * @param {String} filterName name of index to be searched.
 * @return {Object} searchResult 
 */
	searchIndex(query, filterName) {
		let searchResult = {};
		const allSearchQuery = query.toLowerCase().match(/\w+/g);

		if (filterName === 'all') {
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
* validateJsonContent.
* @function
* @param {Object} jUpload
* @return {Boolean} true or false 
*/
	validateJsonContent(jUpload) {
		try {
			return jUpload[0].title && jUpload[0].text ? true : false;
		} catch (e) {
			return false;
		}
	}

	/**
* isValidJson
* @function
* @param {Object} jUpload
* @return {Boolean} true or false 
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
* isJsonEmpty
* @function
* @param {Object} jUpload
* @return {Boolean} true or false 
*/
	isJsonEmpty(jUpload) {
		return jUpload.length === 0 ? true : false;
	}
}

// Create instance for InvertedIndexClass
const invertedClass = new InvertedIndexClass();