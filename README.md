 The code for above are in app.jsx file of src folder in react_app.
 
 The explanation for above file are as follows:-
 
 The import statements at the beginning import the necessary dependencies, React and Chart from the 'react' and 'chart.js/auto' libraries, respectively. The useState, useEffect, and useRef hooks are also imported from 'react'.

The App component is defined as a functional component. It represents the main component of the application.

Inside the App component, several state variables are declared using the useState hook:

histogramData represents the data for the histogram. It is initially an empty array and will be updated with the top 20 most frequent words and their counts.
isLoading is a boolean flag to track the loading state of the data. It is initially set to false.
showHistogram is a boolean flag to control the visibility of the histogram. It is initially set to false.
The chartRef variable is created using the useRef hook. It will be used to reference the canvas element where the chart will be rendered.

The fetchData function is defined as an asynchronous function. It is responsible for fetching the text data from the specified URL and processing it to calculate word frequencies. It uses the fetch API to make an HTTP request and await for the response. Once the response is obtained, the text is extracted and split into an array of words using a regular expression. The word frequencies are calculated by reducing the array of words into a map, where the key is the word and the value is the count. The word-count map is then sorted in descending order by count and sliced to include only the top 20 entries. The resulting data is set in the histogramData state variable, and showHistogram is set to true to display the histogram.

The exportToCSV function is responsible for exporting the histogram data as a CSV file. It converts the data to a CSV string format, creates a link element, sets the appropriate attributes for downloading the CSV file, and triggers a click event to download the file.

The useEffect hook is used to update the chart whenever the histogramData state variable changes. It creates a new instance of Chart using the provided chartRef and configures it with the necessary options and data. The chart is rendered as a bar chart with the word labels on the x-axis and their respective counts on the y-axis.

The return statement defines the JSX (JavaScript XML) structure to render the UI of the component.

The outermost "div" sets the background color to black.
The "h1" element displays the heading "Terribly Tiny Tales Assignment" in white and centered.
The submit button is rendered inside a <div> and is disabled when the isLoading flag is true.
If the histogramData is not empty, the following elements are rendered:
An "h2" element displaying the heading "Word Frequency Histogram" in white and centered.
An "Export" button to trigger the exportToCSV function.
A <canvas> element with the chartRef to render the chart.
