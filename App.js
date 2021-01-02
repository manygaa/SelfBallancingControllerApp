import Home from './components/Home/Home.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { runLogger } from './service/LogsService.js';

const Drawer = createDrawerNavigator();

const App: () => React$Node = () => {

	React.useEffect(() => {
		runLogger();
	}, []);

	return (	
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen name="Home" component={Home} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default App;
