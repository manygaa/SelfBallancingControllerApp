import React, { useState, useEffect } from 'react';
import { View, TouchableHighlight, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { getFilesList, getFileShortName, removeFile } from '../../service/LogsService.js';
import Loader from '../Loader/Loader.js';
import { Styles } from './SettingsLogsStyles.js';

const SettingsLogs = () => {
    const [filesList, setFilesList] = useState([]);
    const [filesListMenu, setFilesListMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getListFilesFromService();
    }, []);

    const getListFilesFromService = async () => {
        const filesList = await getFilesList();
        setFilesList(filesList);
        setFilesListMenu(await prepareDataList(filesList));
        setLoading(false);
    }

    const prepareDataList = async (filesList) => {
        const listFiles = [];
        for (const [index, file] of filesList.entries()) {
            listFiles.push({
                title: `tile ${index}`,
                data: [{
                    key: index,
                    text: getFileShortName(file)
                }]
            })
        }

        return listFiles;
    }

    const closeRow = (listData, index) => {
        if (listData[index]) {
            listData[index].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        removeFile(filesList[rowKey]);
        const newData = [...filesListMenu];
        const prevIndex = filesListMenu[rowKey].data.findIndex(
            item => item.key === rowKey
        );
        newData[rowKey].data.splice(prevIndex, 1);
        setFilesListMenu(newData);
    };

    const renderItem = (data) => (
        <TouchableHighlight
            style={Styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View>
                <Text>{data.item.text}</Text>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={Styles.rowBack}>
            <TouchableOpacity
                style={[Styles.backRightBtn, Styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Text style={Styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <Loader active={loading} />
            <SwipeListView
                useSectionList
                sections={filesListMenu}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-75}
                disableRightSwipe={true}
            />
        </>

    );

}

export default SettingsLogs;