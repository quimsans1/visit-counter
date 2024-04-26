import React, { useEffect, useState } from 'react';
import * as Redpanda from './utils/redpanda';

const VisitsAnalytics = () => {
  //Function to send data to Redpanda (name of the website)
  function sendToRedpanda(websiteName) {
    console.log('selected option', websiteName);
    const message = {
      website: websiteName,
    };
    console.group(message);
    Redpanda.sendMessage(message);
  }

  const [selectedWebsite, setSelectedWebsite] = useState('Option 1');

  useEffect(() => {
    // Connect the producer when this component mounts, then clean and disconnect when it unmounts.
    Redpanda.connect();
    console.log('connect');
    return () => {
      Redpanda.disconnect();
      console.log('disconnect');
    };
  }, []);

  const handleClick = (websiteName) => {
    console.log('Button Clicked', websiteName);
    sendToRedpanda(websiteName);
  };

  return (
    <>
      <h1>Visits Analytics</h1>
      <select value={selectedWebsite} onChange={(e) => setSelectedWebsite(e.target.value)}>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
      </select>
      <button onClick={() => handleClick(selectedWebsite)}>Visit Website (Simulation)</button>
    </>
  );
};

export default VisitsAnalytics; // Exporta el componente por defecto
