var ReactNative = require('react-native')
var React = require('react')
var {PropTypes} = React
var { requireNativeComponent, StyleSheet, View, ScrollView } = ReactNative;
var ScrollResponder = require('react-native/Libraries/Components/ScrollResponder');
const invariant = require('fbjs/lib/invariant');

const NestedScrollViewAndroid = React.createClass({
  mixins: [ScrollResponder.Mixin],

  propTypes: {
    ...ScrollView.propTypes,
  },

  getInitialState: function() {
    return this.scrollResponderMixinGetInitialState();
  },

  setNativeProps: function(props: Object) {
    this._scrollViewRef && this._scrollViewRef.setNativeProps(props);
  },

  /**
   * Returns a reference to the underlying scroll responder, which supports
   * operations like `scrollTo`. All ScrollView-like components should
   * implement this method so that they can be composed while providing access
   * to the underlying scroll responder's methods.
   */
  getScrollResponder: function(): NestedScrollViewAndroid {
    return this;
  },

  getScrollableNode: function(): any {
    return ReactNative.findNodeHandle(this._scrollViewRef);
  },

  getInnerViewNode: function(): any {
    return ReactNative.findNodeHandle(this._innerViewRef);
  },

  /**
   * Scrolls to a given x, y offset, either immediately or with a smooth animation.
   *
   * Syntax:
   *
   * `scrollTo(options: {x: number = 0; y: number = 0; animated: boolean = true})`
   *
   * Note: The weird argument signature is due to the fact that, for historical reasons,
   * the function also accepts separate arguments as as alternative to the options object.
   * This is deprecated due to ambiguity (y before x), and SHOULD NOT BE USED.
   */
  scrollTo: function(
    y?: number | { x?: number, y?: number, animated?: boolean },
    x?: number,
    animated?: boolean
  ) {
    if (typeof y === 'number') {
      console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.');
    } else {
      ({x, y, animated} = y || {});
    }
    this.getScrollResponder().scrollResponderScrollTo({x: x || 0, y: y || 0, animated: animated !== false});
  },

  /**
   * Deprecated, do not use.
   */
  scrollWithoutAnimationTo: function(y: number = 0, x: number = 0) {
    console.warn('`scrollWithoutAnimationTo` is deprecated. Use `scrollTo` instead');
    this.scrollTo({x, y, animated: false});
  },

  _handleScroll: function(e: Object) {
    if (this.props.keyboardDismissMode === 'on-drag') {
      dismissKeyboard();
    }
    this.scrollResponderHandleScroll(e);
  },

  _handleContentOnLayout: function(e: Object) {
    var { width, height } = e.nativeEvent.layout;
    this.props.onContentSizeChange && this.props.onContentSizeChange(width, height);
  },

  _scrollViewRef: (null: ?ScrollView),
  _setScrollViewRef: function(ref: ?NestedScrollViewAndroid) {
    this._scrollViewRef = ref;
  },

  _innerViewRef: (null: ?View),
  _setInnerViewRef: function(ref: ?View) {
    this._innerViewRef = ref;
  },

  render: function() {
    const contentContainerStyle = [
      this.props.horizontal && styles.contentContainerHorizontal,
      this.props.contentContainerStyle,
    ];
    let style, childLayoutProps;
    if (__DEV__ && this.props.style) {
      style = StyleSheet.flatten(this.props.style);
      childLayoutProps = ['alignItems', 'justifyContent']
        .filter((prop) => style && style[prop] !== undefined);
      invariant(
        childLayoutProps.length === 0,
        'NestedScrollViewAndroid child layout (' + JSON.stringify(childLayoutProps) +
          ') must be applied through the contentContainerStyle prop.'
      );
    }

    let contentSizeChangeProps = {};
    if (this.props.onContentSizeChange) {
      contentSizeChangeProps = {
        onLayout: this._handleContentOnLayout,
      };
    }

    const contentContainer =
      <View
        {...contentSizeChangeProps}
        ref={this._setInnerViewRef}
        style={contentContainerStyle}
        removeClippedSubviews={this.props.removeClippedSubviews}
        collapsable={false}>
        {this.props.children}
      </View>;

    const alwaysBounceHorizontal =
      this.props.alwaysBounceHorizontal !== undefined ?
        this.props.alwaysBounceHorizontal :
        this.props.horizontal;

    const alwaysBounceVertical =
      this.props.alwaysBounceVertical !== undefined ?
        this.props.alwaysBounceVertical :
        !this.props.horizontal;

    const baseStyle = this.props.horizontal ? styles.baseHorizontal : styles.baseVertical;
    const props = {
      ...this.props,
      alwaysBounceHorizontal,
      alwaysBounceVertical,
      style: ([baseStyle, this.props.style]: ?Array<any>),
      onTouchStart: this.scrollResponderHandleTouchStart,
      onTouchMove: this.scrollResponderHandleTouchMove,
      onTouchEnd: this.scrollResponderHandleTouchEnd,
      onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
      onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
      onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
      onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
      onStartShouldSetResponder: this.scrollResponderHandleStartShouldSetResponder,
      onStartShouldSetResponderCapture: this.scrollResponderHandleStartShouldSetResponderCapture,
      onScrollShouldSetResponder: this.scrollResponderHandleScrollShouldSetResponder,
      onScroll: this._handleScroll,
      onResponderGrant: this.scrollResponderHandleResponderGrant,
      onResponderTerminationRequest: this.scrollResponderHandleTerminationRequest,
      onResponderTerminate: this.scrollResponderHandleTerminate,
      onResponderRelease: this.scrollResponderHandleResponderRelease,
      onResponderReject: this.scrollResponderHandleResponderReject,
      sendMomentumEvents: (this.props.onMomentumScrollBegin || this.props.onMomentumScrollEnd) ? true : false,
    };

    const { decelerationRate } = this.props;
    if (decelerationRate) {
      props.decelerationRate = processDecelerationRate(decelerationRate);
    }

    let ScrollViewClass;
    if (this.props.horizontal) {
      ScrollViewClass = undefined; // No horizontal NestedScrollView
    } else {
      ScrollViewClass = RCTNestedScrollViewAndroid;
    }

    invariant(
      ScrollViewClass !== undefined,
      'ScrollViewClass must not be undefined'
    );

    const refreshControl = this.props.refreshControl;
    if (refreshControl) {
      // On Android wrap the ScrollView with a AndroidSwipeRefreshLayout.
      // Since the ScrollView is wrapped add the style props to the
      // AndroidSwipeRefreshLayout and use flex: 1 for the ScrollView.
      return React.cloneElement(
        refreshControl,
        {style: props.style},
        <ScrollViewClass {...props} style={baseStyle} ref={this._setScrollViewRef}>
          {contentContainer}
        </ScrollViewClass>
      );
    }
    return (
      <ScrollViewClass {...props} ref={this._setScrollViewRef}>
        {contentContainer}
      </ScrollViewClass>
    );
  }
});

const styles = StyleSheet.create({
  baseVertical: {
    flex: 1,
    flexDirection: 'column',
  },
  baseHorizontal: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainerHorizontal: {
    flexDirection: 'row',
  },
});

var RCTNestedScrollViewAndroid = requireNativeComponent('RCTNestedScrollViewAndroid', NestedScrollViewAndroid, {
  nativeOnly: {
      sendMomentumEvents: true,
  }
});

module.exports = NestedScrollViewAndroid;
