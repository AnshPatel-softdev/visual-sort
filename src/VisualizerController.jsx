import React, { Component } from 'react';
import './VisualizerController.css';

class VisualizerController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingAlgorithm: 'Bubble Sort',
      speed: 'Fast',
      size: '15',
      barColor: 'Blue',
      pointerColor: 'Red',
      sortedColor: 'Green',
      message: 'Feeling lazy? It\'s OK, just click Sort!'
    };
    this.onSelectingSortingAlgorithm = this.onSelectingSortingAlgorithm.bind(this);
    this.onSelectingSpeed = this.onSelectingSpeed.bind(this);
    this.onSelectingSize = this.onSelectingSize.bind(this);
    this.onSelectingBarColor = this.onSelectingBarColor.bind(this);
    this.onSelectingPointerColor = this.onSelectingPointerColor.bind(this);
    this.randomize = this.randomize.bind(this);
    this.sort = this.sort.bind(this);
    this.randomizeRef = React.createRef();
    this.sortRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.visualizerData === true) {
      this.randomizeRef.current.textContent = 'Randomize Array';
    }
  }

  onSelectingSortingAlgorithm(event) {
    this.setState({
      sortingAlgorithm: event.target.value
    });
  }

  onSelectingSpeed(event) {
    this.setState({
      speed: event.target.value
    });
  }

  onSelectingSize(event) {
    const newSize = event.target.value;
    this.setState({ size: newSize }, () => {
      this.props.controllerDataHandler({
        ...this.state,
        sort: false,
        randomize: true
      });
    });
  }

  onSelectingBarColor(event) {
    this.setState({
      barColor: event.target.value
    }, () => {
      this.props.controllerDataHandler({
        ...this.state,
        sort: false,
        randomize: false
      });
    });
  }

  onSelectingPointerColor(event) {
    this.setState({
      pointerColor: event.target.value
    });
  }

  randomize() {
    this.randomizeRef.current.textContent = 'Randomize Array';
    this.sortRef.current.disabled = false;
    document.getElementById('speed').disabled = false;
    document.getElementById('size').disabled = false;
    document.getElementById('sortingAlgorithm').disabled = false;
    document.getElementById('barColor').disabled = false;
    document.getElementById('pointerColor').disabled = false;
    this.props.controllerDataHandler({
      ...this.state,
      sort: false,
      randomize: true
    });
  }

  sort() {
    this.randomizeRef.current.textContent = 'Stop & Randomize Array';
    this.sortRef.current.disabled = true;
    document.getElementById('speed').disabled = true;
    document.getElementById('size').disabled = true;
    document.getElementById('sortingAlgorithm').disabled = true;
    document.getElementById('barColor').disabled = true;
    document.getElementById('pointerColor').disabled = true;
    this.props.controllerDataHandler({
      ...this.state,
      sort: true,
      randomize: false,
      sorted: false
    });
  }

  render() {
    return (
      <div className="VisualizerController">
        <h1>Sorting<br />Visualizer</h1>

        <div className="control-group">
          <label>Sorting Algorithm:</label>
          <select id="sortingAlgorithm" value={this.state.sortingAlgorithm} onChange={this.onSelectingSortingAlgorithm}>
            <option value="Bubble Sort">Bubble Sort (Default)</option>
            <option value="Cocktail Sort">Cocktail Sort</option>
            <option value="Heap Sort">Heap Sort</option>
            <option value="Insertion Sort">Insertion Sort</option>
            <option value="Linear Sort">Linear Sort</option>
            <option value="Merge Sort">Merge Sort</option>
            <option value="Quick Sort">Quick Sort</option>
            <option value="Selection Sort">Selection Sort</option>
          </select>
        </div>

        <div className="control-group">
          <label>Speed of Visualization:</label>
          <select id="speed" value={this.state.speed} onChange={this.onSelectingSpeed}>
            <option value="Very Fast">Very Fast</option>
            <option value="Fast">Fast (Default)</option>
            <option value="Normal">Normal</option>
            <option value="Slow">Slow</option>
            <option value="Very Slow">Very Slow</option>
          </select>
        </div>

        <div className="control-group">
          <label>Size of Array:</label>
          <select id="size" value={this.state.size} onChange={this.onSelectingSize}>
            <option value="10">10</option>
            <option value="15">15 (Default)</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
          </select>
        </div>

        <div className="control-group">
          <label>Color of Bar:</label>
          <select id="barColor" value={this.state.barColor} onChange={this.onSelectingBarColor}>
            <option value="Black">Black</option>
            <option value="Blue">Blue (Default)</option>
            <option value="Cyan">Cyan</option>
            <option value="Green">Green</option>
            <option value="Pink">Pink</option>
            <option value="Red">Red</option>
            <option value="Yellow">Yellow</option>
          </select>
        </div>

        <div className="control-group">
          <label>Color of Comparisons:</label>
          <select id="pointerColor" value={this.state.pointerColor} onChange={this.onSelectingPointerColor}>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="Cyan">Cyan</option>
            <option value="Green">Green</option>
            <option value="Pink">Pink</option>
            <option value="Red">Red (Default)</option>
            <option value="Yellow">Yellow</option>
          </select>
        </div>

        <div className="button-group">
          <button ref={this.randomizeRef} className="btn btn-danger" onClick={this.randomize}>Randomize Array</button>
          <button ref={this.sortRef} className="btn btn-success" onClick={this.sort}>Sort!</button>
        </div>

        <div className="message">
          <p>{this.state.message}</p>
        </div>
      </div>
    );
  }
}

export default VisualizerController;