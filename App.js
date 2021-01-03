import Home from './components/Home/Home.js';
import * as React from 'react';
import { runLogger } from './service/LogsService.js';

const App: () => React$Node = () => {

	React.useEffect(() => {
		runLogger();
	}, []);

	return (	
		<Home />
	);
};

export default App;
