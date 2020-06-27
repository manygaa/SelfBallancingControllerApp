import React, { useState, useEffect } from 'react';
import {Button, Text, View, ScrollView} from 'react-native';
import {readLogsFile} from '../../service/logsService.js'
import Loader from '../Loader/Loader.js';


const Logs = ({navigation}) => {
  const [logsFile, setLogsFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLogs();
  });



  getLogs = async() => {
    try {
      setLogsFile(await readLogsFile());
    } catch (error) {
      dropDownAlertRef.alertWithType('error', 'Error', `getLogs() Error: ${error.message}`);
    } finally {
      setLoading(false);
}
  }

  return (
    <View>
      <Loader active={loading}/>
      <ScrollView>
        <Text>{logsFile}</Text>
      </ScrollView>
    </View>
  )
};

export default Logs;
