import React from 'react';
import {View, Text} from 'react-native';
import RNEChartsPro from 'react-native-echarts-pro';
import DATA from '../../src/heartRate.json';
import {useTailwind} from 'tailwind-rn';

const DANGER_COLOR = '#FD3100';
const WARNING_COLOR = '#FBDB0F';
const NORMAL_COLOR = '#93CE07';

const HartRate = () => {
  const tailwind = useTailwind();
  const now = getDate();
  let data = DATA.map(item => {
    return item.data > now
      ? [item.data, null]
      : item.data < '08:00'
      ? [item.data, null]
      : [item.data, item.value + Math.floor(Math.random() * 10)];
  });
  const heartOption = {
    title: {
      left: 'center',
      text: '心率',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '10%',
      top: '14%',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value',
      max: null,
      min: function (value) {
        return value.min - 10;
      },
    },
    toolbox: {
      right: 10,
    },
    visualMap: {
      show: false,
      pieces: [
        {
          gt: 0,
          lte: 60,
          color: WARNING_COLOR,
        },
        {
          gt: 60,
          lte: 80,
          color: NORMAL_COLOR,
        },
        {
          gt: 80,
          lte: 100,
          color: WARNING_COLOR,
        },
        {
          gt: 100,
          lte: 150,
          color: DANGER_COLOR,
        },
      ],
      outOfRange: {
        color: '#999',
      },
    },
    series: {
      name: '心率',
      type: 'line',
      data: data,
      markLine: {
        silent: true,
        lineStyle: {
          color: '#333',
        },
        data: [
          {
            yAxis: 80,
          },
          {
            yAxis: 100,
          },
        ],
      },
    },
  };
  return (
    <View style={tailwind('bg-white rounded-xl flex flex-col p-4 mt-4 mx-6')}>
      <RNEChartsPro height={250} option={heartOption} />
    </View>
  );
};

function getDate() {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${hour}:${min}`;
}

export default HartRate;
