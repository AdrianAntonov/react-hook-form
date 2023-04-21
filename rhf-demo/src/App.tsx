import { useState } from 'react';
import { YouTubeForm } from './components/YouTubeForm';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <YouTubeForm />{' '}
    </div>
  );
}

export default App;
