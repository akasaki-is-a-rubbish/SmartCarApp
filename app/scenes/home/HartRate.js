import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import RNEChartsPro from 'react-native-echarts-pro';
import DATA from '../../src/heartRate.json';
import {useTailwind} from 'tailwind-rn';
import {Icon} from 'react-native-elements';

const DANGER_COLOR = '#FD3100';
const WARNING_COLOR = '#FBDB0F';
const NORMAL_COLOR = '#93CE07';

const HartRate = () => {
  const tailwind = useTailwind();
  const now = getDate();
  let data = DATA.map(item => {
    return item.data > now
      ? [item.data, null]
      : [item.data, item.value + Math.floor(Math.random() * 10)];
  });
  let validData = data.map(item => item[1]).filter(item => item !== null);
  const itemData = [
    {
      id: '0',
      title: '静息心率',
      value: 78,
    },
    {id: '1', title: '最高心率', value: Math.max(...validData)},
    {
      id: '2',
      title: '最低心率',
      value: Math.min(...validData),
    },
    {
      id: '3',
      title: '平均心率',
      value: Math.floor(
        validData.reduce((acc, cur) => acc + cur, 0) / validData.length,
      ),
    },
  ];
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
      max: Math.max(...validData) + 10,
      min: Math.min(...validData) - 5,
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

  const dayOption = {
    title: {
      left: 'center',
      text: '月心率',
    },
    visualMap: [
      {
        show: true,
        min: 60,
        max: 100,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
      },
    ],
    calendar: [
      {
        orient: 'vertical',
        left: 'center',
        dayLabel: {
          firstDay: 1,
          nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
        monthLabel: {
          show: true,
          nameMap: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月',
          ],
        },
        yearLabel: {
          show: false,
        },
        cellSize: [40, 40],
        range: '2022-10',
      },
    ],
    series: [
      {
        type: 'graph',
        symbolSize: 10,
      },
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'calendar',
        symbolSize: function (val) {
          return val[1] / 6;
        },
        data: getVirtualData(2022),
      },
    ],
  };

  function getVirtualData(year) {
    let start = +new Date(year, 0, 1);
    let end = +new Date(year, 11, 31);
    let dayTime = 3600 * 24 * 1000;
    let datas = [];
    for (let time = start; time < end; time += dayTime) {
      let yeara = new Date(time).getFullYear(),
        month = new Date(time).getMonth() + 1,
        day = new Date(time).getDate();
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      datas.push([
        yeara + '-' + month + '-' + day,
        Math.floor(Math.random() * 60 + 40),
      ]);
    }
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    datas = datas.map(item => {
      if (item[0] > '2022-' + month + '-' + day) {
        return [item[0], null];
      }
      return item;
    });
    return datas;
  }

  const Item = ({title, value}) => (
    <View style={tailwind('w-1/2 p-4 items-center')}>
      <View style={tailwind('flex flex-row items-center')}>
        <Text style={tailwind('text-black text-3xl')}>{value}</Text>
        <Text style={tailwind('text-gray-600 text-base')}>次/分</Text>
      </View>
      <Text style={tailwind('text-gray-600 text-lg')}>{title}</Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={tailwind('bg-white rounded-xl flex flex-col p-4 mt-4 mx-6')}>
        <RNEChartsPro height={250} option={heartOption} />
      </View>
      <View style={tailwind('bg-white rounded-xl flex flex-col p-4 mt-4 mx-6')}>
        <View style={tailwind('flex flex-row items-center')}>
          <Icon
            reverse
            name="flame-outline"
            type="ionicon"
            color={'#FD3100'}
            size={18}
          />
          <Text style={tailwind('text-xl font-black font-bold')}>今日概述</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
          {itemData.map(item => (
            <Item key={item.id} title={item.title} value={item.value} />
          ))}
        </View>
      </View>
      <View style={tailwind('bg-white rounded-xl mx-6 mt-4 mb-4 p-4 px-0')}>
        <RNEChartsPro height={350} weight="100%" option={dayOption} />
      </View>
    </ScrollView>
  );
};

function getDate() {
  const date = new Date();
  let hour = date.getHours(),
    minute = date.getMinutes();
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;
  return hour + ':' + minute;
}

export default HartRate;
