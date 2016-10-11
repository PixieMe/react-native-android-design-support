var ReactNative = require('react-native')
var React = require('react')
var {PropTypes} = React
var { requireNativeComponent, StyleSheet, View, UIManager, findNodeHandle } = ReactNative;

var CoordinatorLayoutAndroid = React.createClass({
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
