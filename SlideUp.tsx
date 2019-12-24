import React, { Component, Fragment } from "react";
import {
  Animated,
  PanResponder,
  PanResponderInstance,
  Dimensions,
  View
} from "react-native";

const window = Dimensions.get("window");

interface Props {
  openedHeight: number;
  closedHeight: number;
  openDistance: number;
  closeDistance: number;
}

class SlideUp extends Component<Props> {
  private _slideAnimation: Animated.Value;
  private _panResponder: PanResponderInstance;

  constructor(props: Props) {
    super(props);
    this._slideAnimation = new Animated.Value(this.closePixel);
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        if (
          gestureState.y0 > evt.nativeEvent.pageY &&
          evt.nativeEvent.pageY > this.openPixel
        ) {
          Animated.spring(this._slideAnimation, {
            delay: 0,
            toValue: evt.nativeEvent.pageY,
            useNativeDriver: false
          }).start();
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        if (gestureState.y0 > evt.nativeEvent.pageY) {
          if (gestureState.y0 - evt.nativeEvent.pageY > props.openDistance) {
            this.open();
          } else {
            this.close();
          }
        } else if (gestureState.y0 < evt.nativeEvent.pageY) {
          if (evt.nativeEvent.pageY - gestureState.y0 > props.closeDistance) {
            this.close();
          } else {
            this.open();
          }
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    });
  }

  get openPixel() {
    return window.height - this.props.openedHeight;
  }

  get closePixel() {
    return window.height - this.props.closedHeight;
  }

  open = () => {
    Animated.spring(this._slideAnimation, {
      delay: 0,
      toValue: this.openPixel,
      useNativeDriver: false
    }).start();
  };

  close = () => {
    Animated.spring(this._slideAnimation, {
      delay: 0,
      toValue: this.closePixel,
      useNativeDriver: false
    }).start();
  };

  render() {
    return (
      <Animated.View
        collapsable={false}
        style={{
          backgroundColor: "#ff11ff",
          position: "absolute",
          top: this._slideAnimation
        }}
      >
        <View
          {...this._panResponder.panHandlers}
          collapsable={false}
          style={{
            width: window.width,
            height: 32,
            backgroundColor: "#3311ff"
          }}
        />
        {this.props.children}
      </Animated.View>
    );
  }
}

export default SlideUp;
