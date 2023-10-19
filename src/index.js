import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// import ReactDOM from 'react-dom';
// // import './components/AnimatedComponent.css'

// import React, { useState, useEffect } from 'react';


// const FadeOutUnmountComponent = ({ isVisible }) => {
//   const [visible, setVisible] = useState(isVisible);
//   const [shouldUnmount, setShouldUnmount] = useState(!isVisible);

//   useEffect(() => {
//     if (!isVisible) {
//       setVisible(false);
//       setTimeout(() => {
//         setShouldUnmount(true);
//       }, 500); // Time to match the fade-out animation duration
//     }
//   }, [isVisible]);

//   if (shouldUnmount) {
//     return null; // Render nothing to unmount the component gracefully
//   }

//   return (
//     <div className={`fade-out ${visible ? 'visible' : ''}`}>
//       <div>Hello</div>
//     </div>
//   );
// };

// const App = () => {
//   const [showComponent, setShowComponent] = useState(true);

//   const toggleComponent = () => {
//     setShowComponent(prevShow => !prevShow);
//   };

//   return (
//     <div>
//       <button onClick={toggleComponent}>Toggle Component</button>
//       <FadeOutUnmountComponent isVisible={showComponent} />
//     </div>
//   );
// };

// ReactDOM.render(<App />, document.getElementById('root'));
