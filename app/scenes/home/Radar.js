import React, {useState, useRef, useEffect} from 'react';
import {useTailwind} from 'tailwind-rn';
import {View, ScrollView} from 'react-native';
import RNEChartsPro from 'react-native-echarts-pro';
import {radarAngleInfo, warningSound} from '../../constants';
import Sound from 'react-native-sound';

const DANGER_COLOR = '#FD3100';
const WARNING_COLOR = '#FBDB0F';

function random_generate(length) {
  // random generate array
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(1.15 + Math.random() * 0.3);
  }
  return arr;
}

function smoothen(arr) {
  let new_arr = [];
  for (let i = 0; i < arr.length; i++) {
    if (i == 0) {
      new_arr.push(arr[i]);
    } else {
      new_arr.push((arr[i] + arr[i - 1]) / 2);
    }
  }
  return new_arr;
}

const Radar = () => {
  const tailwind = useTailwind();
  // const [radarData, setRadarData] = useState([
  //   1.52, 1.35, 1.32, 1.22, 1.24, 1.14, 1.1,
  // ]);
  const [radarData, setRadarData] = useState(random_generate(7));
  const [timers, setTimers] = useState([]);
  const savedCallback = useRef();

  const callback = () => {
    const newRadarData = radarData.map(item => {
      // change the value of radar data
      data = item + Math.random() * 0.1 - 0.05;

      return data > 1.15 ? data : 1.13 + Math.random() * 0.1;
    });
    setRadarData(smoothen(newRadarData));
    // play warning sound
    if (newRadarData.some(item => item <= 1.25)) {
      const s = new Sound(warningSound, e => {
        if (e) {
          console.log('播放失败');
          return;
        }
        s.play(() => s.release());
      });
    }
  };

  useEffect(() => {
    savedCallback.current = callback;
    return () => {};
  });

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    const timer = setInterval(tick, 1000);
    timers.push(timer);
    setTimers(timers);
    console.log(timers);
    return () => {
      clearInterval(timer);
    };
  }, [timers]);

  const car_data = [
    [0.8, 181],
    [0.9, 160],
    [1, 140],
    [1, 120],
    [1, 90],
    [1, 60],
    [1, 40],
    [0.9, 20],
    [0.8, 359],
  ];

  let data = [];

  for (let i = 0; i < radarAngleInfo.length; i++) {
    data.push([radarData[i], radarAngleInfo[i]]);
  }

  const radarOption = {
    animation: false,
    legend: {
      type: 'scroll',
      data: ['car'],
      left: 3,
      borderCap: 'round',
    },
    polar: {},
    tooltip: {
      show: false,
    },
    angleAxis: {
      type: 'value',
      startAngle: 0,
      min: 0,
      max: 360,
    },
    radiusAxis: {
      show: false,
      max: 2,
      type: 'value',
    },
    visualMap: {
      show: false,
      type: 'piecewise',
      realtime: true,
      dimension: 0,
      seriesIndex: 1,
      pieces: [
        {
          gt: 0,
          lt: 1.15,
          color: DANGER_COLOR,
        },
        {
          gt: 1.15,
          lt: 1.25,
          color: WARNING_COLOR,
        },
      ],
      range: [0, 30],
      inRange: {
        color: '#999',
      },
    },
    series: [
      {
        coordinateSystem: 'polar',
        name: 'car',
        type: 'line',
        data: car_data,
        label: {
          show: false,
        },
        showSymbol: false,
        labelline: {
          show: false,
        },
        lineStyle: {
          color: '#999',
          width: 3,
        },
        smooth: true,
      },
      {
        coordinateSystem: 'polar',
        name: 'object',
        type: 'line',
        data: data,
        label: {
          show: false,
        },
        smooth: true,
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'red',
              },
              {
                offset: 0.8,
                color: 'orange',
              },
              {
                offset: 1,
                color: 'green',
              },
            ],
            global: false, // default is false
          },
        },
      },
    ],
  };

  return (
    <ScrollView>
      <View style={tailwind('bg-white rounded-xl flex flex-col p-4 mt-4 mx-6')}>
        <RNEChartsPro height={300} option={radarOption} />
      </View>
    </ScrollView>
  );
};

export default Radar;
