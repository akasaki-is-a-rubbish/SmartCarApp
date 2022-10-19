/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function JumpText({
  title,
  jpText,
  onPress,
  style,
  titleStyle,
  jpStyle,
}) {
  return (
    <View style={[styles.body, style]}>
      {title && (
        <Text style={[styles.bodyText, titleStyle, jpText && {marginRight: 5}]}>
          {title}
        </Text>
      )}

      {jpText && (
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.bodyjpText, jpStyle]}>{jpText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

JumpText.defaultProps = {
  title: null,
  jpText: null,
  onPress: {},
  style: {},
  titleStyle: {},
  jpStyle: {},
};

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bodyText: {
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    color: '#636466',
  },

  bodyjpText: {
    fontSize: 16,
    color: '#733AC2',
    fontWeight: '500',
    fontFamily: 'Helvetica Neue',
  },
});
