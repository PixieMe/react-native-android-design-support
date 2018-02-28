import React from "react";
import { requireNativeComponent, Text, View } from "react-native";
var resolveAssetSource = require('resolveAssetSource');
var createReactClass = require('create-react-class');
var PropTypes = require('prop-types');

var FloatingActionButtonAndroid = createReactClass({
  propTypes: {
	  ...View.propTypes,
	  style: Text.propTypes.style,
	  onPress: PropTypes.func,
	  icon: PropTypes.any,
  },

  getDefaultProps() {
    return {};
  },

  render() {
    const nativeProps = {
      ...this.props,
    };
    if (this.props.icon) {
      nativeProps.icon = resolveAssetSource(this.props.icon);
    }
    return (
		<RCTFloatingActionButtonAndroid
			{...nativeProps}
			style={this.props.style}
            onChange={this.props.onPress}
		/>
    );
  }
});

var RCTFloatingActionButtonAndroid = requireNativeComponent('RCTFloatingActionButtonAndroid', FloatingActionButtonAndroid, {
  nativeOnly: {}
});

module.exports = FloatingActionButtonAndroid;
