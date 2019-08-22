# ReadFile Application
 A Node JS app that reads a file from the console and formats the data returning it back to the console.

## Running The Application

To run the app, follow these steps.

1. Ensure that the latest stable version of [NodeJS](http://nodejs.org/). We recommend the latest LTS version or greater (v6.9.1+).
2. From the project folder, execute the following command:
 ```
 npm install
 ```
3. From the project folder, execute the following command to run the sample data file provided for you:
 ```
 node src/index.js driver.txt
 ```
 If you would like to supply your own file please use the path to your file along with the filename and ext:
 ```
 node src/index.js /Users/username/Documents/driver.txt
 ```
 
## Running Tests

To run the app tests, follow these steps.

1. From the project folder, execute the following command:
 ```
 npm test
 ```

## About This Application
 While developing this application I tried to keep things simple. The main index.js file uses an async function that is immediately invoked when loaded. This function looks for a filename and creates a datastore to store the parsed data from the file. I tried to keep dependencies to a minimum and used fs along with readline to read the data from the file. I registered two callback events from the readline interface. The first is on the line event that reads one line at a time from the file. This will help reduce the load on resources by not streaming the entire file at once. On each line event I look for two commands either Driver or Trip. I used a factory class for all model object creation. Based on the command I create a Driver or Trip and then store the object in the datastore. While storing the trip, the datastore and trip model work together to determine if the trip should be stored. I would likely move this logic out into a specific controller if an api was involved prior to making the call. Once all lines have been read the close event is then called. This is where I use the factory class to generate the report based on the datastore. During this process report lines are created with the formatted data that will be printed to each line. The entire report is a string with line breaks that is printed to the console and returned. Much of my coding was driven by TDD. I wrote a single unit test with multiple describes that were split between the first part that does not require a datastore and the second part that relies on the datastore. The unit test covers all of the requirements to ensure the application is working at all times and meeting all business requirements. 
