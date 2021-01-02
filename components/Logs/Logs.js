import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { getAllLogs } from '../../service/LogsService.js';
import Loader from '../Loader/Loader.js';
import RNPickerSelect from 'react-native-picker-select';


const Logs = () => {

	const [logsFiles, setLogsFiles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [logsContent, setLogsContent] = useState();


	const getLogsFromService = async () => {
		const logs = await getAllLogs();
		setLogsFiles(logs);
		getCurrentLogs(logs);
		setLoading(false);
	}

	const getCurrentLogs = (logs) => {
		if (logs.length) {
			const lastElement = [...logs].pop();
			setLogsContent(lastElement?.content);
		}
	}

	useEffect(() => {
		getLogsFromService();
	}, []);


	return (
		<View>
			<Loader active={loading} />
			{logsFiles.length ?
				<RNPickerSelect
					onValueChange={(value) => setLogsContent(value)}
					items={logsFiles.map((log) => {
						return {
							label: log.fileShortName,
							value: log.content} 
						})}
				/>
			: 
				null
			}
			<ScrollView>
				<Text>{logsContent}</Text>
			</ScrollView>
		</View>
	)
};

export default Logs;
