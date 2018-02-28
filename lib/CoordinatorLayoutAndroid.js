var ReactNative = require('react-native');
var React = require('react');
var createReactClass = require('create-react-class');
var { requireNativeComponent, StyleSheet, View, UIManager, findNodeHandle } = ReactNative;

var CoordinatorLayoutAndroid = createReactClass({
  propTypes: {
    ...View.propTypes
  },

  getDefaultProps: function() {
    return {};
  },

  render: function() {
    return (
      <RCTCoordinatorLayoutAndroid
        {...this.props}
        style={[{
          flex: 1
        }, this.props.style]}
      >
        {this.props.children}
      </RCTCoordinatorLayoutAndroid>
    );
  }
});

var RCTCoordinatorLayoutAndroid = requireNativeComponent('RCTCoordinatorLayoutAndroid', CoordinatorLayoutAndroid, {
  nativeOnly: {}
});

module.exports = CoordinatorLayoutAndroid;
