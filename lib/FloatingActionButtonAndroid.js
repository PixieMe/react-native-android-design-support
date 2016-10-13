import React from "react";
import { requireNativeComponent, View } from "react-native";
var resolveAssetSource = require('resolveAssetSource');

var FloatingActionButtonAndroid = React.createClass({
  propTypes: {
    ...View.propTypes,
	  onPress: React.PropTypes.func,
	  icon: React.PropTypes.any,
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
