import React, { useState, useEffect } from 'react';
import './visualsort.css';

const VisualSort = (props) => {
  const [arr, setArr] = useState([]);
  const [barColor, setBarColor] = useState('Blue');
  const [pointerColor, setPointerColor] = useState('Red');
  const [sortedColor, setSortedColor] = useState('Green');
  const [sorted, setSorted] = useState(false);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [size, setSize] = useState(45);
  const [speed, setSpeed] = useState('Fast');

  useEffect(() => {
    randomizeArray();
  }, [size]);

  useEffect(() => {
    setSorted(false);
    props.visualizerDataHandler(false);
  }, [arr]);

  const randomizeArray = () => {
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    setArr(newArr);
    setBarColor('Orange'); // Change color to Orange on randomize
  };

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(parseInt(e.target.value));
  };

  const handleSpeedChange = (e) => {
    setSpeed(e.target.value);
  };

  const sort = async () => {
    setSorted(true);
    props.visualizerDataHandler(true);
    switch (algorithm) {
      case 'Bubble Sort':
        await bubbleSort();
        break;
      case 'Insertion Sort':
        await insertionSort();
        break;
      case 'Selection Sort':
        await selectionSort();
        break;
      case 'Merge Sort':
        await mergeSort(arr, 0, arr.length - 1);
        break;
      case 'Quick Sort':
        await quickSort(arr, 0, arr.length - 1);
        break;
      case 'Heap Sort':
        await heapSort();
        break;
      default:
        await bubbleSort();
        break;
    }
  };

  const bubbleSort = async () => {
    let bars = document.getElementsByClassName('array-bar');
    let len = bars.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        bars[j].style.backgroundColor = pointerColor;
        bars[j + 1].style.backgroundColor = pointerColor;
        await sleep(getSpeed(speed));
        if (parseInt(bars[j].innerHTML) > parseInt(bars[j + 1].innerHTML)) {
          let temp = bars[j].innerHTML;
          bars[j].innerHTML = bars[j + 1].innerHTML;
          bars[j + 1].innerHTML = temp;
          bars[j].style.height = `${parseInt(bars[j].innerHTML) + 15}px`;
          bars[j + 1].style.height = `${parseInt(bars[j + 1].innerHTML) + 15}px`;
        }
        bars[j].style.backgroundColor = barColor;
        bars[j + 1].style.backgroundColor = barColor;
      }
      bars[len - i - 1].style.backgroundColor = sortedColor;
    }
    setSorted(true);
    props.visualizerDataHandler(true);
  };

  const insertionSort = async () => {
    let bars = document.getElementsByClassName('array-bar');
    let len = bars.length;
    for (let i = 1; i < len; i++) {
      let key = parseInt(bars[i].innerHTML);
      let j = i - 1;
      bars[i].style.backgroundColor = pointerColor;
      await sleep(getSpeed(speed));
      while (j >= 0 && parseInt(bars[j].innerHTML) > key) {
        bars[j + 1].innerHTML = bars[j].innerHTML;
        bars[j + 1].style.height = `${parseInt(bars[j].innerHTML) + 15}px`;
        bars[j].style.backgroundColor = pointerColor;
        await sleep(getSpeed(speed));
        bars[j].style.backgroundColor = barColor;
        j = j - 1;
      }
      bars[j + 1].innerHTML = key;
      bars[j + 1].style.height = `${key + 15}px`;
      bars[i].style.backgroundColor = barColor;
    }
    for (let i = 0; i < len; i++) {
      bars[i].style.backgroundColor = sortedColor;
    }
    setSorted(true);
    props.visualizerDataHandler(true);
  };

  const selectionSort = async () => {
    let bars = document.getElementsByClassName('array-bar');
    let len = bars.length;
    for (let i = 0; i < len - 1; i++) {
      let min_idx = i;
      bars[i].style.backgroundColor = pointerColor;
      for (let j = i + 1; j < len; j++) {
        bars[j].style.backgroundColor = pointerColor;
        await sleep(getSpeed(speed));
        if (parseInt(bars[j].innerHTML) < parseInt(bars[min_idx].innerHTML)) {
          if (min_idx !== i) {
            bars[min_idx].style.backgroundColor = barColor;
          }
          min_idx = j;
        } else {
          bars[j].style.backgroundColor = barColor;
        }
      }
      let temp = bars[min_idx].innerHTML;
      bars[min_idx].innerHTML = bars[i].innerHTML;
      bars[i].innerHTML = temp;
      bars[min_idx].style.height = `${parseInt(bars[min_idx].innerHTML) + 15}px`;
      bars[i].style.height = `${parseInt(bars[i].innerHTML) + 15}px`;
      bars[min_idx].style.backgroundColor = barColor;
      bars[i].style.backgroundColor = sortedColor;
    }
    bars[len - 1].style.backgroundColor = sortedColor;
    setSorted(true);
    props.visualizerDataHandler(true);
  };

  const mergeSort = async (arr, l, r) => {
    if (l >= r) return;
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
  };

  const merge = async (arr, l, m, r) => {
    const bars = document.getElementsByClassName('array-bar');
    const n1 = m - l + 1;
    const n2 = r - m;
    const left = new Array(n1);
    const right = new Array(n2);
    for (let i = 0; i < n1; i++) {
      left[i] = parseInt(bars[l + i].innerHTML);
    }
    for (let i = 0; i < n2; i++) {
      right[i] = parseInt(bars[m + 1 + i].innerHTML);
    }
    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      bars[k].style.backgroundColor = pointerColor;
      await sleep(getSpeed(speed));
      if (left[i] <= right[j]) {
        bars[k].innerHTML = left[i];
        bars[k].style.height = `${left[i] + 15}px`;
        i++;
      } else {
        bars[k].innerHTML = right[j];
        bars[k].style.height = `${right[j] + 15}px`;
        j++;
      }
      bars[k].style.backgroundColor = barColor;
      k++;
    }
    while (i < n1) {
      bars[k].style.backgroundColor = pointerColor;
      await sleep(getSpeed(speed));
      bars[k].innerHTML = left[i];
      bars[k].style.height = `${left[i] + 15}px`;
      bars[k].style.backgroundColor = barColor;
      i++;
      k++;
    }
    while (j < n2) {
      bars[k].style.backgroundColor = pointerColor;
      await sleep(getSpeed(speed));
      bars[k].innerHTML = right[j];
      bars[k].style.height = `${right[j] + 15}px`;
      bars[k].style.backgroundColor = barColor;
      j++;
      k++;
    }
    for (let i = l; i <= r; i++) {
      bars[i].style.backgroundColor = sortedColor;
    }
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    const bars = document.getElementsByClassName('array-bar');
    const pivot = parseInt(bars[high].innerHTML);
    bars[high].style.backgroundColor = pointerColor;
    let i = low - 1;
    for (let j = low; j < high; j++) {
      bars[j].style.backgroundColor = pointerColor;
      await sleep(getSpeed(speed));
      if (parseInt(bars[j].innerHTML) < pivot) {
        i++;
        const temp = bars[i].innerHTML;
        bars[i].innerHTML = bars[j].innerHTML;
        bars[j].innerHTML = temp;
        bars[i].style.height = `${parseInt(bars[i].innerHTML) + 15}px`;
        bars[j].style.height = `${parseInt(bars[j].innerHTML) + 15}px`;
      }
      bars[j].style.backgroundColor = barColor;
    }
    const temp = bars[i + 1].innerHTML;
    bars[i + 1].innerHTML = bars[high].innerHTML;
    bars[high].innerHTML = temp;
    bars[i + 1].style.height = `${parseInt(bars[i + 1].innerHTML) + 15}px`;
    bars[high].style.height = `${parseInt(bars[high].innerHTML) + 15}px`;
    bars[high].style.backgroundColor = sortedColor;
    bars[i + 1].style.backgroundColor = sortedColor;
    return i + 1;
  };

  const heapSort = async () => {
    let bars = document.getElementsByClassName('array-bar');
    const len = bars.length;
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
      await heapify(len, i);
    }
    for (let i = len - 1; i > 0; i--) {
      const temp = bars[0].innerHTML;
      bars[0].innerHTML = bars[i].innerHTML;
      bars[i].innerHTML = temp;
      bars[0].style.height = `${parseInt(bars[0].innerHTML) + 15}px`;
      bars[i].style.height = `${parseInt(bars[i].innerHTML) + 15}px`;
      bars[i].style.backgroundColor = sortedColor;
      await heapify(i, 0);
    }
    bars[0].style.backgroundColor = sortedColor;
  };

  const heapify = async (n, i) => {
    let bars = document.getElementsByClassName('array-bar');
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < n && parseInt(bars[left].innerHTML) > parseInt(bars[largest].innerHTML)) {
      largest = left;
    }
    if (right < n && parseInt(bars[right].innerHTML) > parseInt(bars[largest].innerHTML)) {
      largest = right;
    }
    if (largest !== i) {
      bars[i].style.backgroundColor = pointerColor;
      bars[largest].style.backgroundColor = pointerColor;
      await sleep(getSpeed(speed));
      const swap = bars[i].innerHTML;
      bars[i].innerHTML = bars[largest].innerHTML;
      bars[largest].innerHTML = swap;
      bars[i].style.height = `${parseInt(bars[i].innerHTML) + 15}px`;
      bars[largest].style.height = `${parseInt(bars[largest].innerHTML) + 15}px`;
      bars[i].style.backgroundColor = barColor;
      bars[largest].style.backgroundColor = barColor;
      await heapify(n, largest);
    }
  };

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const getSpeed = (speed) => {
    switch (speed) {
      case 'Very Fast':
        return 25;
      case 'Fast':
        return 100;
      case 'Normal':
        return 250;
      case 'Slow':
        return 500;
      case 'Very Slow':
        return 1000;
      default:
        return 100;
    }
  };

  return (
    <div>
      <div id='barView' style={{ display: 'flex', alignItems: 'flex-end', height: '300px', marginBottom: '20px' }}>
        {arr.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value + 15}px`,
              width: '20px',
              backgroundColor: barColor,
              margin: '0 1px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              color: 'white',
              fontSize: '10px',
            }}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="controls">
        <div>
          <label htmlFor="algorithm">Algorithm: </label>
          <select id="algorithm" value={algorithm} onChange={handleAlgorithmChange}>
            <option value="Bubble Sort">Bubble Sort</option>
            <option value="Insertion Sort">Insertion Sort</option>
            <option value="Selection Sort">Selection Sort</option>
            <option value="Merge Sort">Merge Sort</option>
            <option value="Quick Sort">Quick Sort</option>
            <option value="Heap Sort">Heap Sort</option>
          </select>
        </div>
        <div>
          <label htmlFor="size">Size: </label>
          <select id="size" value={size} onChange={handleSizeChange}>
            {[...Array(10).keys()].map(i => (
              <option key={i} value={(i + 1) * 5}>{(i + 1) * 5}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="speed">Speed: </label>
          <select id="speed" value={speed} onChange={handleSpeedChange}>
            <option value="Very Fast">Very Fast</option>
            <option value="Fast">Fast</option>
            <option value="Normal">Normal</option>
            <option value="Slow">Slow</option>
            <option value="Very Slow">Very Slow</option>
          </select>
        </div>
        <button onClick={randomizeArray}>Randomize</button>
        <button onClick={sort}>Sort</button>
      </div>
    </div>
  );
};

export default VisualSort;
