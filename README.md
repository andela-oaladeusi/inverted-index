[![Build Status](https://travis-ci.org/andela-oaladeusi/inverted-index.svg?branch=master)](https://travis-ci.org/andela-oaladeusi/inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-oaladeusi/inverted-index/badge.svg?branch=development)](https://coveralls.io/github/andela-oaladeusi/inverted-index?branch=development)
# Inverted-Index

## What is Inverted Index?

An inverted index is an index data structure storing a mapping from content, 
such as words or numbers, to its locations in a database file, or in a 
document or a set of documents.
The purpose of an inverted index is to allow fast full text searches, at a 
cost of increased processing when a document is added to the database. 
An inverted index consists of a list of all the unique words that appear in 
any document, and for each word, a list of the documents in which it appears.

## Inverted Index Example
Assuming we have the below Book with two documents

        Book =  {
                {
                    "title": "Andela",
                    "text": "EPIC and four c"
                    },
                    {
                    "title": "Andela Fellow ",
                    "text": "Four years, TIA."
                    }
                }

To create an inverted index, we first split the content field of each document
into separate words (which we call terms, or tokens), create a sorted list of
all the unique terms, and then list in which document each term appears. 
The result looks something like this:

    Term      Doc_1  Doc_2
    -------------------------
    andela  |   +   |  +
    epic    |   +   |
    and     |   +   |  
    four    |   +   |  +
    c       |   +   |  
    fellow  |       |  +
    years   |       |  +
    tia     |       |  +

Now, if we want to search for andela fellow, we just need to find the documents
in which each term appears:

    Term      Doc_1  Doc_2
    -------------------------
    andela  |   +   |  +
    fellow  |   +   |


## Features
  - Create indexes from multiple uploaded JSON files.
  - Find a particular index from each files.
  - Full text search of created indexes.

## Technologies
  - Node.js
  - EchmaScript 6 (JavaScript 2015)
  - Jquery-3.1.1.js