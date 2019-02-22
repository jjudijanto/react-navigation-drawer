/**
 * TouchableItem renders a touchable that looks native on both iOS and Android.
 *
 * It provides an abstraction on top of TouchableNativeFeedback and
 * TouchableOpacity.
 *
 * On iOS you can pass the props of TouchableOpacity, on Android pass the props
 * of TouchableNativeFeedback.
 */
import React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import testable from '../../../../specs/testable';

const ANDROID_VERSION_LOLLIPOP = 21;

export default class TouchableItem extends React.Component {
  static defaultProps = {
    borderless: false,
    pressColor: 'rgba(0, 0, 0, .32)'
  };

  render() {
    const {routeName} = this.props
    const TestableTouchAndroid = testable(routeName+'.Button')(TouchableNativeFeedback)
    const TestableTouchIOS = testable(routeName+'.Button')(TouchableOpacity)
    /*
     * TouchableNativeFeedback.Ripple causes a crash on old Android versions,
     * therefore only enable it on Android Lollipop and above.
     *
     * All touchables on Android should have the ripple effect according to
     * platform design guidelines.
     * We need to pass the background prop to specify a borderless ripple effect.
     */
    if (Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP) {
      const { style, ...rest } = this.props;
      return <TestableTouchAndroid {...rest} style={null} background={TouchableNativeFeedback.Ripple(this.props.pressColor, this.props.borderless)}>
          <View style={style}>{React.Children.only(this.props.children)}</View>
        </TestableTouchAndroid>;
    }

    return <TestableTouchIOS {...this.props}>{this.props.children}</TestableTouchIOS>;
  }
}
