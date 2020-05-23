import * as React from 'react';
import {Button, Text, View, ScrollView} from 'react-native';
import {readLogsFile, logInfo, logError, logWarning} from '../../service/logsService.js'
import Loader from '../Loader/Loader.js';


export default class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: null };
  }

  componentDidMount = async() => {
    logInfo('no dupa3');
    logError('no dupa4');

    this.setState({content: await readLogsFile()})
  }


    render () {
      if (!this.state.content) {
        return (
            <Loader/>
        )
      } else {
        return (
          <View>
            <ScrollView>
              <Text>{this.state.content}</Text>
            </ScrollView>
          </View>
        );
      }
    }
};
