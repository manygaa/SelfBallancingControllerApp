import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000'
  },

  logsContent: {
    color: '#00ff2b',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5
  },

  logsContentText: {
    color: '#00ff2b',
    marginLeft: 0,
  },

  info: {
    color: '#ffcc00'
  },

  warning: {
    color: '#ff9966'
  },

  error: {
    color: '#cc3300'
  }

});

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      width: '97%'
    },

    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
    },

    iconContainer: {
        top: 10,
        right: 20,
    },
});