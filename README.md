# Readable API Client
_Developed by Ben Chan in Sept 2017 as part of the Udacity React Nanodegree program_

## Installation
* Install and start the API server:
    - `git clone https://github.com/udacity/reactnd-project-readable-starter.git`
    - `cd reactnd-project-readable-starter.git/api-server`
    - `npm install`
    - `npm start`
* In another terminal window, start the API client:
    - `npm install`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](https://github.com/udacity/reactnd-project-readable-starter/blob/master/api-server/README.md).

## API Client

Navigate between three **categories**:
* react
* redux
* udacity

## Category

**Categories** are hardcoded into the API server and can be modified in [categories.js](https://github.com/udacity/reactnd-project-readable-starter/blob/master/api-server/categories.js).

For each category, you can create a **post**.

## Post
A **post** contains the following visible data:
* voteScore
* title
* author
* timestamp
* category
* body

You can do the following with a **post**:
* edit title and/or body
* vote up or down
* delete
* create a **comment**.

## Comment
A **comment** contains the following visible data:
* voteScore
* author
* timestamp
* body

You can do the following with a **comment**:
* edit body
* vote up or down
* delete

**Comments** are only visible when their parent **post** is also visible.  Deleting a **post** will hide all associated **comments**.

### Special Note
To see all data points for **posts** and **comments**, refer to [ReadableAPI.js](utils/ReadableAPI.js) where API calls are sent to and received from the API server.

### Known Issues
Some of the code can be refactored into more concise logic, but for the purposes of this project I've decided to leave it the way it is for future reference.  But for all future React/Redux projects, I plan to use the more concise logic that was so generously explained to me by the Udacity reviewer.
