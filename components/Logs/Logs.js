import React, { useState, useEffect, useRef, useCallback} from 'react';
import { View, RefreshControl, FlatList, ActivityIndicator } from 'react-native';
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
	const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
	
	let flatListRef = useRef();

	useEffect(() => {
		getLogsFromService();
	}, []);

	const refreshLogsFile  = useCallback(async (currentPath, logsFiles) => {
		setRefreshing(true);
		if (!!currentPath) {
			const file = await readFile(currentPath);
			setLogsContent(prepareData(file.content));
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
			setLogsContent(prepareData(firstElement?.content));
			setCurrentPath(firstElement?.filePath);
		}
	}

	const changeData = (value, index) => {
		if (!!value) {
			setLogsContent(prepareData(value));
			setCurrentPath(logsFiles[index].filePath);
		}
	}

	const onEndReached = (currentPath, logsFiles) => {
		setRefreshing(true);
		if(!onEndReachedCalledDuringMomentum) {
			refreshLogsFile(currentPath, logsFiles);
			setOnEndReachedCalledDuringMomentum(true);

		}
	}

	const prepareData = (content) => {
		const contentToArray = content.split(/\r?\n/);
		contentToArray.pop();
		const items = [];

		for (const [index, row] of contentToArray.entries()) {
			items.push({
				id: `${index}`,
				title: row
			})
		}
		return items;
	}

	const Item = ({ title }) => (
		<View>
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
				{title}
			</ParsedText>
		</View>
	);

	const renderItem = ({ item }) => (
		<Item title={item.title} />
	);

	const renderFooter = () => {
        return refreshing ? <ActivityIndicator
			size = "large"
      	/> : null;
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
			<FlatList
				ref={ref => flatListRef = ref}
				onContentSizeChange={() => flatListRef.scrollToEnd({animated: true})}
				data={logsContent}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				onEndReachedThreshold={-0.1}
				onEndReached={() => onEndReached(currentPath, logsFiles)}
				onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false)}}
				ListFooterComponent={() => renderFooter()}
				refreshControl={
					<RefreshControl
					  refreshing={refreshing}
					  onRefresh={() =>refreshLogsFile(currentPath, logsFiles)}
					/>
				  }
				
			/>
		</View>
	)
};

export default Logs;
