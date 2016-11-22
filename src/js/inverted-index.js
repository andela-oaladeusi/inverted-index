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