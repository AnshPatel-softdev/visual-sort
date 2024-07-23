import React, { useState, useEffect } from 'react';
import VisualizerController from './VisualizerController.jsx';
import SortingVisualizer from './visualsort.jsx';
import './App.css';

const App = () => {
  const [controllerState, setControllerState] = useState({
    sortingAlgorithm: 'Bubble Sort',
    size: '15',
    speed: 'Fast',
    barColor: 'Blue',
    pointerColor: 'Red',
    sortedColor: 'Green',
    sort: false,
    randomize: true
  });

  const [sorted, setSorted] = useState(false);

  const controllerDataHandler = (e) => {
    setControllerState({
      sortingAlgorithm: e.sortingAlgorithm,
      size: e.size,
      speed: e.speed,
      barColor: e.barColor,
      pointerColor: e.pointerColor,
      sortedColor: e.sortedColor,
      sort: e.sort,
      randomize: e.randomize
    });

    setSorted(false);

    if (e.sort) {
      const element = document.getElementById('sortingVisualizer');
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const visualizerDataHandler = (e) => {
    setSorted(e);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <p style={{ color: 'white' }}></p>
        </div>
        <div className="main-content">
          <div className="sidebar">
            <VisualizerController
              controllerDataHandler={controllerDataHandler}
              visualizerData={sorted}
            />
          </div>
          <div className="visualizer" id="sortingVisualizer">
            <SortingVisualizer
              visualizerDataHandler={visualizerDataHandler}
              controllerData={controllerState}
            />
          </div>
        </div>
        <div className="footer">
          <h6>Author: Ansh Patel</h6>
        </div>
      </div>
    </div>
  );
};

export default App;
