import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { getAllLogs } from '../../service/LogsService.js';
import Loader from '../Loader/Loader.js';
import RNPickerSelect from 'react-native-picker-select';
import ParsedText from 'react-native-parsed-text';
import { Styles, pickerSelectStyles } from './LogsStyles.js';
import { selectLogsplaceholder } from '../../constans/LogsConstans.js';
import { ArrowIcon } from '../../icon/SvgIcon.js';

const Logs = () => {

	const [logsFiles, setLogsFiles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [logsContent, setLogsContent] = useState();

	useEffect(() => {
		getLogsFromService();
	}, []);

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

	return (
		<View style={Styles.container}>
			<Loader active={loading} />
			{logsFiles.length ?
				<RNPickerSelect
					onValueChange={(value) => setLogsContent(value)}
					placeholder={{...selectLogsplaceholder}}
					style={{...pickerSelectStyles}}
					Icon={() => {return <ArrowIcon color="gray" />}}
					items={logsFiles.map((log) => {
						return {
							label: log.fileShortName,
							value: log.content} 
						})}
				/>
			: 
				null
			}
			<ScrollView style={Styles.logsContent}>
				<ParsedText 
					style={Styles.logsContentText}
					parse={
						[
							{pattern: /\[INFO\]/, style: Styles.info},
							{pattern: /\[WARN\]/, style: Styles.warning},
							{pattern: /\[ERROR\]/, style: Styles.error},
						]
					}
				>
					{logsContent}
				</ParsedText>
			</ScrollView>
		</View>
	)
};

export default Logs;
