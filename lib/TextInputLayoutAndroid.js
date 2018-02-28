var ReactNative = require('react-native');
var React = require('react');
var createReactClass = require('create-react-class');
var PropTypes = require('prop-types');
var { requireNativeComponent, KeyboardAvoidingView, Text, View } = ReactNative;

var TextInputLayoutAndroid = createReactClass({
  propTypes: {
    ...View.propTypes,

    style: Text.propTypes.style,

    focusedTextColor: PropTypes.any,
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
          style={[{paddingBottom: this.props.counterEnabled ? 20 : 0}, this.props.style]}
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
