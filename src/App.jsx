import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const App = () => {
  const [histogramData, setHistogramData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistogram, setShowHistogram] = useState(false);
  const chartRef = useRef(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://www.terriblytinytales.com/test.txt');
      const text = await response.text();
      const words = text.split(/[^\w']+/);
      const wordCountMap = words.reduce((map, word) => {
        map[word] = (map[word] || 0) + 1;
        return map;
      }, {});
      const sortedData = Object.entries(wordCountMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20);
      setHistogramData(sortedData);
      setShowHistogram(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  const exportToCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      histogramData.map(row => row.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'histogram_data.csv');
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    if (histogramData.length > 0) {
      const labels = histogramData.map(([word]) => word);
      const counts = histogramData.map(([_, count]) => count);

      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Word Count',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              precision: 0,
            },
          },
        },
      });
    }
  }, [histogramData]);

  return (
    <div style={{ backgroundColor: 'Black' }}>
      <h1 style={{ textAlign: 'center',color:"White" }}>Terribly Tiny Tales Assignment</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={fetchData}
          disabled={isLoading}
          style={{ textAlign: 'center' }}
          className="centered-button"
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      {histogramData.length > 0 && (
        <div>
          <h2 style={{ textAlign: 'center',color:"White" }}>Word Frequency Histogram</h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={exportToCSV}>Export</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <canvas ref={chartRef} width="400" height="300"></canvas>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default App;
           




