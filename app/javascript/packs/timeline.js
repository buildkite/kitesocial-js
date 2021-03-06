import * as React from 'react';
import ReactDOM from 'react-dom';
import ChirpsTimeline from '../components/ChirpsTimeline';

ReactDOM.render(
  <ChirpsTimeline
    subscription="TimelinesChannel"
    chirps={JSON.parse(document.getElementById("data").innerHTML)}
  />,
  document.getElementById("timeline")
);
