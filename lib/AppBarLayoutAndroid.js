var ReactNative = require('react-native');
var React = require('react');
var createReactClass = require('create-react-class');
var PropTypes = require('prop-types');
var { requireNativeComponent, View, Text, createElement, UIManager, findNodeHandle } = ReactNative;

var AppBarLayoutAndroid = createReactClass({
  propTypes: {
    ...View.propTypes,
    childrenScrollFlags: PropTypes.array
  },

  getDefaultProps: function() {
    return {};
  },

  componentDidMount: function() {
    this._setChildrenScrollFlags();
  },

  componentDidUpdate: function() {
    this._setChildrenScrollFlags();
  },

  _setChildrenScrollFlags: function() {
    var self = this;
    var scrollFlags = [];

    React.Children.map(this.props.children, function(child, index) {
      if (child.props.scrollFlagsAndroid) scrollFlags.push({
        index: index,
        scrollFlags: child.props.scrollFlagsAndroid
      });
    });

    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.RCTAppBarLayoutAndroid.Commands.setChildrenScrollFlags,
      [scrollFlags],
    );
  },

  render: function() {
    return (
      <RCTAppBarLayoutAndroid
        {...this.props}
      >
        {this.props.children}
      </RCTAppBarLayoutAndroid>
    );
  }

});

var RCTAppBarLayoutAndroid = requireNativeComponent('RCTAppBarLayoutAndroid', AppBarLayoutAndroid, {
  nativeOnly: {}
});

module.exports = AppBarLayoutAndroid;
