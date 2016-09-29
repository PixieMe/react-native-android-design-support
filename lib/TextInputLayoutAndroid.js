var ReactNative = require('react-native')
var React = require('react')
var {PropTypes} = React
var { requireNativeComponent, View } = ReactNative;

var TextInputLayoutAndroid = React.createClass({
  propTypes: {
    ...View.propTypes,
    hint: PropTypes.string,
    hintAnimationEnabled: PropTypes.bool,
    errorEnabled: PropTypes.bool,
    error: PropTypes.string,
    counterEnabled: PropTypes.bool,
    counterMaxLength: PropTypes.number,
    passwordVisibilityToggleEnabled: PropTypes.bool,
  },

  getDefaultProps: function() {
    return {};
  },

  render: function() {
    return (
      <RCTTextInputLayoutAndroid
        {...this.props}
        style={this.props.style}
      >
        {this.props.children}
      </RCTTextInputLayoutAndroid>
    );
  }
});

var RCTTextInputLayoutAndroid = requireNativeComponent('RCTTextInputLayoutAndroid', TextInputLayoutAndroid, {
  nativeOnly: {}
});

module.exports = TextInputLayoutAndroid;
