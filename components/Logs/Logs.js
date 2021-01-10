import React, { useState, useEffect, useRef, useCallback} from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { getAllLogs, readFile } from '../../service/LogsService.js';
import Loader from '../Loader/Loader.js';
import RNPickerSelect from 'react-native-picker-select';
import ParsedText from 'react-native-parsed-text';
import { Styles, pickerSelectStyles } from './LogsStyles.js';
import { selectLogsplaceholder } from '../../constans/LogsConstans.js';
import { ArrowIcon } from '../../icon/SvgIcon.js';
import { connect } from 'react-redux';

const Logs = ({status:{filesList, manualUpdate}}) => {

	const [logsFiles, setLogsFiles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [logsContent, setLogsContent] = useState();
	const [refreshing, setRefreshing] = useState(false);
	const [currentPath, setCurrentPath] = useState(null);
	
	let flatListRef = useRef();

	useEffect(() => {
		getLogsFromService();
	}, []);

	const refreshLogsFile  = useCallback(async (currentPath, logsFiles) => {
		const index = logsFiles.findIndex(file => file.filePath == currentPath);

		if (index == 0) {
			setRefreshing(true);
			const file = await readFile(currentPath);
			setLogsContent(prepareData(file.content));
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

	const getSelectFilesList = (logsFiles) => {
		return logsFiles.map((log) => {
			const {fileShortName, content} = log;
			return {
				label: fileShortName,
				value: content
			} 
		})
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
		refreshLogsFile(currentPath, logsFiles);
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
        return refreshing ? 
			<View style={Styles.loader}>
				<ActivityIndicator size = "large"/>
			</View> : null;
	}

	const goToEndFile = () => {
		if (!!logsContent) {
			flatListRef.scrollToEnd({animated: true});
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
					items={getSelectFilesList(manualUpdate ? filesList : logsFiles)}
				/>
			: 
				null
			}
			<FlatList
				ref={ref => flatListRef = ref}
				onContentSizeChange={() => goToEndFile()}
				data={logsContent}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				onEndReachedThreshold={-0.1}
				onEndReached={() => onEndReached(currentPath, logsFiles)}
				ListFooterComponent={() => renderFooter()}
			/>
		</View>
	)
};

const mapStateToProps = state => ({
	status: state.logsReducer
});

export default connect(mapStateToProps)(Logs);
