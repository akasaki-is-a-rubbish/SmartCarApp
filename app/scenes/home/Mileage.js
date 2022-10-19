/* eslint-disable prettier/prettier */
import React from 'react';
import {View, ScrollView} from 'react-native';
import RNEChartsPro from 'react-native-echarts-pro';
import DATA from '../../src/miles.json';
import {useTailwind} from 'tailwind-rn';

function mean(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i][1];
  }
  return sum / arr.length;
}

function cumsum(arr) {
  let result = [];
  if (arr.length > 0) {
    result[0] = arr[0];
    for (let i = 1; i < arr.length; i++) {
      result[i] = [];
      result[i].push(arr[i][0]);
      result[i].push(result[i - 1][1] + arr[i][1]);
    }
  }
  return result;
}

function is_all_same_year(arr) {
  let year = arr[0][0].slice(0, 4);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][0].slice(0, 4) !== year) {
      return false;
    }
  }
  return true;
}

function remove_year_from_date(date) {
  return date.map(item => {
    return [item[0].slice(5), item[1]];
  });
}

// 获取当天0点的时间戳
function getStartTime(time) {
  const nowTimeDate = new Date(time);
  return nowTimeDate.setHours(0, 0, 0, 0);
}
// 时间戳转日期格式
function timestampToTime(timestamp) {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '-';
  var M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-';
  var D = date.getDate();
  return Y + M + D;
}
// 获取一周的日期
function getWeekList() {
  let weekName = new Array(
    '周日',
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六',
  );
  let week = [];
  for (var i = 0; i < 7; i++) {
    let weekObj = {
      name: weekName[i],
      date: '',
      timeStamp: '',
    };
    week.push(weekObj);
  }
  let today = getStartTime(Number(new Date())); // 当天时间戳
  let today_week = new Date().getDay(); // 当天周几
  if (today_week == 0) {
    // 若当天为周日
    week[6].timeStamp = today;
  } else {
    week[today_week - 1].timeStamp = today;
  }

  var leftNum = today_week - 1; // 本周内今天的前几天的数量
  var rightNum = 7 - today_week; // 本周内今天的后几天的数量

  for (var left = 0; left < leftNum; left++) {
    week[left].timeStamp =
      today - (today_week - left - 1) * 1000 * 60 * 60 * 24;
  }
  for (var right = 0; right < rightNum; right++) {
    week[right + today_week].timeStamp =
      today + (right + 1) * 1000 * 60 * 60 * 24;
  }
  // week.map(el => {
  //   el.date = timestampToTime(el.timeStamp);
  // });
  return week;
}

const Mileage = () => {
  const tailwind = useTailwind();
  let max_speed = 129,
    average_speed = 64;

  let max_size = 100;

  // let cur_day = new Date().getDay();
  // let week_names = getWeekList().map(item => {
  //   return item.name;
  // });

  let total_data = DATA.map(item => {
    return [item.date, item.mile];
  });

  let week_data = total_data.slice(-7, -1);
  if (is_all_same_year(week_data)) {
    week_data = remove_year_from_date(week_data);
  }

  const weekMilesOption = {
    title: {
      left: 'center',
      text: '一周里程',
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
      max: Math.max(...week_data) + 10,
      min: Math.min(...week_data) - 5,
    },

    toolbox: {
      right: 10,
    },
    series: {
      name: '里程',
      type: 'line',
      data: week_data,
      markline: {
        silent: true,
        lineStyle: {
          color: '#333',
        },
        data: [
          {
            yAxis: mean(week_data),
          },
        ],
      },
    },
  };

  let pie_data = week_data
    .map(item => {
      return item[1] > 0 ? item : null;
    })
    .filter(item => item !== null).map(item => {
      return {
        value: item[1],
        name: item[0],
      };
    });

  const weekPieOption = {
    title: {
      text: '一周里程',
      left: 'center',
      top: 5,
      textStyle: {
        color: 'rgba(0, 0, 0, 0.8)',
      },
    },
    tooltip: {
      trigger: 'item',
    },
    toolbox: {
      right: 10,
    },
    visualMap: {
      show: false,
      max: Math.max(...pie_data),
      min: Math.min(...pie_data),
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: {
      name: '里程',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: pie_data,
      roseType: 'radius',
      label: {
        color: 'rgba(0, 0, 0, 0.5)',
      },
      labelLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.5)',
        },
        smooth: 0.2,
        length: 10,
        length2: 20,
      },
      itemStyle: {
        color: '#c23531',
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return 50;
      },
    },
  };

  const averageSpeed = {
    title: {
      text: '一周时速',
      left: 'center',
      top: 0,
      textStyle: {
        color: 'rgba(0, 0, 0, 0.8)',
      },
    },
    tooltip: {
      show: true,
    },
    series: [
      {
        name: '时速',
        type: 'gauge',
        max: 180,
        anchor: {
          show: true,
          showAbove: true,
          size: 18,
          itemStyle: {
            color: '#FAC858',
          },
        },
        pointer: {
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          width: 6,
          length: '80%',
          offsetCenter: [0, '8%'],
        },
        progress: {
          show: true,
          overlap: true,
          roundCap: true,
          width: 8,
        },
        axisLine: {
          roundCap: true,
          overlap: true,
          lineStyle: {
            width: 0,
          },
        },
        axisTick: {
          splitNumber: 2,
          lineStyle: {
            width: 2,
            color: '#999',
          },
        },
        splitLine: {
          length: 12,
          lineStyle: {
            width: 3,
            color: '#999',
          },
        },
        axisLabel: {
          distance: 5,
          color: '#999',
          fontSize: 10,
        },
        title: {
          fontSize: 10,
        },
        detail: {
          width: 25,
          height: 10,
          fontSize: 10,
          color: '#fff',
          backgroundColor: 'auto',
          borderRadius: 3,
          formatter: '{value}',
        },
        data: [
          {
            name: '平均速度',
            value: average_speed,
            title: {
              offsetCenter: ['-30%', '80%'],
            },
            detail: {
              offsetCenter: ['-30%', '95%'],
            },
          },
          {
            name: '最大速度',
            value: max_speed,
            title: {
              offsetCenter: ['30%', '80%'],
            },
            detail: {
              offsetCenter: ['30%', '95%'],
            },
          },
        ],
      },
    ],
  };

  if (max_size > total_data.length) {
    max_size = 0;
  }

  let cumsumdata = cumsum(total_data).slice(-max_size, -1);
  if (is_all_same_year(cumsumdata)) {
    cumsumdata = remove_year_from_date(cumsumdata);
  }

  const sumMileageOption = {
    animationDuration: 10000,

    title: {
      left: 'center',
      text: '累积里程',
    },
    grid: {
      top: '14%',
      left: '1%',
      right: '15%',
      bottom: '3%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle',
    },
    yAxis: {
      min: Math.min(...cumsumdata) - 500,
      max: Math.max(...cumsumdata) + 500,
    },
    axisLabel: {
      fontSize: 10,
    },
    series: {
      type: 'line',
      name: '累积里程',
      data: cumsumdata,

      endLabel: {
        show: true,
      },
    },
  };

  return (
    <ScrollView>
      <View style={tailwind('bg-white rounded-xl flex flex-col p-4 mt-4 mx-6')}>
        <RNEChartsPro height={250} option={sumMileageOption} />
      </View>

      {/* <View style={tailwind('bg-white rounded-xl flex flex-col p-4 mt-4 mx-6')}>
        <RNEChartsPro height={250} option={weekMilesOption} />
      </View> */}

      <View style={tailwind('bg-white rounded-xl flex flex-col p-4 mt-4 mx-6')}>
        <RNEChartsPro height={250} option={weekPieOption} />
      </View>

      <View
        style={tailwind(
          'bg-white rounded-xl flex flex-col p-4 mt-4 mx-6 mb-4',
        )}>
        <RNEChartsPro height={250} option={averageSpeed} />
      </View>
    </ScrollView>
  );
};

export default Mileage;
