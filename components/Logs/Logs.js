import React, { useState, useEffect, useRef, useCallback} from 'react';
import { View, ScrollView, RefreshControl, FlatList } from 'react-native';
import { getAllLogs, readFile } from '../../service/LogsService.js';
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
	const [refreshing, setRefreshing] = useState(false);
	const [currentPath, setCurrentPath] = useState(null);

	let scrollView = useRef(null);

	useEffect(() => {
		getLogsFromService();
	}, []);

	const refreshLogsFile  = useCallback(async (currentPath, logsFiles) => {
		setRefreshing(true);
		if (!!currentPath) {
			const file = await readFile(currentPath);
			setLogsContent(file.content);
			const index = logsFiles.findIndex(file => file.filePath == currentPath);
			const newData = [...logsFiles];
			newData[index] = file;
			setLogsFiles(newData);
		}
		
		setRefreshing(false);
	}, [])

	const getLogsFromService = async () => {
		const logs = await getAllLogs();
		setLogsFiles(logs);
		getCurrentLogs(logs);
		setLoading(false);
	}

	const getCurrentLogs = ([firstElement]) => {
		if (!!firstElement) {
			setLogsContent(firstElement?.content);
			setCurrentPath(firstElement?.filePath);
		}
	}

	const changeData = (value, index) => {
		setLogsContent(value);
		if (!!value) {
			setCurrentPath(logsFiles[index].filePath);
		}
		
	}

	return (
		<View style={Styles.container}>
			<Loader active={loading} />
			{logsFiles.length ?
				<RNPickerSelect
					onValueChange={(value, index) => changeData(value, index - 1)}
					placeholder={{...selectLogsplaceholder}}
					style={{...pickerSelectStyles}}
					Icon={() => {return <ArrowIcon color="gray" />}}
					items={logsFiles.map((log) => {
						const {fileShortName, content} = log;
						return {
							label: fileShortName,
							value: content
							} 
						})}
				/>
			: 
				null
			}
			<ScrollView 
				style={Styles.logsContent}
				ref={ref => {scrollView = ref}}
				onContentSizeChange={() => scrollView.scrollToEnd({animated: true})}
				showsVerticalScrollIndicator={false} 
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => refreshLogsFile(currentPath, logsFiles)} />}
				>
				
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
