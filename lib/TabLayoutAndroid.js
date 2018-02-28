var ReactNative = require('react-native');
var React = require('react');
var createReactClass = require('create-react-class');
var PropTypes = require('prop-types');
var { requireNativeComponent, View, Text, UIManager, findNodeHandle } = ReactNative;
var ColorPropType = require('ColorPropType');

var TabLayoutAndroid = createReactClass({
  propTypes: {
    ...View.propTypes,
    tabs: PropTypes.array,
    tabMode: PropTypes.string,
    normalColor: PropTypes.string,
    selectedColor: PropTypes.string,
    selectedTabIndicatorColor: PropTypes.string
  },

  getDefaultProps: function() {
    return {
      tabMode: 'fixed',
      normalColor: '#17171786',
      selectedColor: '#171717',
      selectedTabIndicatorColor: '#008574'
    };
  },

  setViewPager: function(viewPager) {
    var viewPagerID = findNodeHandle(viewPager);

    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.RCTTabLayoutAndroid.Commands.setViewPager,
      [viewPagerID, this.props.tabs],
    );
  },

  _childrenWithOverridenStyle: function() {
    if (!this.props.children) return null;

    var self = this;
    return React.Children.map(this.props.children, function(child, i) {
      var newProps = {
        key: i,
        ...child.props,
        style: [{
          justifyContent: 'center',
          alignItems: 'center'
        }, child.props.style, self.props.activeTabStyle],
      };
      if (child.type &&
          child.type.displayName &&
          (child.type.displayName !== 'RCTView') &&
          (child.type.displayName !== 'View')) {
        console.warn('Each TabLayout child must be a <View>. Was ' + child.type.displayName);
      }
      return React.createElement(child.type, newProps);
    });
  },

  render: function() {
    return (
      <RCTTabLayoutAndroid
        {...this.props}
        style={[{
          height: 48
        }, this.props.style]}
      >
        {this._childrenWithOverridenStyle()}
      </RCTTabLayoutAndroid>
    );
  }

});

var RCTTabLayoutAndroid = requireNativeComponent('RCTTabLayoutAndroid', TabLayoutAndroid, {
  nativeOnly: {}
});

module.exports = TabLayoutAndroid;
