var React = require('react-native');
var Image = React.Image;
var Button= require('react-native-button');
var NativeModules = React.NativeModules;
module.exports = NativeModules.PingModule;

var PingTest = React.createClass({
  render: function() {
      var layout =
          <React.View style = { styles.parent } >
              <React.TextInput
                placeholder = "Enter Host"
                onChangeText={(e) => this.setState({input: e, setImg : require('image!disabled')})}
                text = { this.state.input }
              />
              
              <Image source={ this.state.setImg } style={styles.img} />
              
              <Button
                style={styles.button}
                onPress={this._handlePress}>
                Test
              </Button>
          </React.View>
      ;
      return layout;
  },
  getInitialState: function() {
    return {
        input : '',
        setImg : require('image!disabled')
    };
  },
  _handlePress: function() {
      
      
    NativeModules.PingModule.processString(this.state.input, (text) => {
      if (text == false) {
        this.setState({
          setImg : require('image!red')
        });
      } else {
        this.setState({
          setImg : require('image!green')
        });
      }
    });
  },
});

var styles = React.StyleSheet.create({
    parent: {
        padding: 16
    },
    img : {
      alignSelf : 'flex-start'
    },
    button: {
      color : 'white',
      textAlign : 'center',
      backgroundColor : '#FF0000',
      width : 100,
      alignSelf : 'flex-end'
    },
    buttonText: {
      fontWeight: 'bold'
    },
});

React.AppRegistry.registerComponent('PingTest', function() {
    return PingTest;
});