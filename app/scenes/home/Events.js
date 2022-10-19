/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {FlatList, View, Text} from 'react-native';
import EventCard from '../../components/EventCard';
import Loading from '../../components/Loading';
import {useTailwind} from 'tailwind-rn';
import * as api from '../../services/auth';

const Events = () => {
  const [events, setEvents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const tailwind = useTailwind();

  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? 1 : x > y ? -1 : 0;
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let response = await api.getEvents();
        response = sortByKey(response, 'dateTime');
        setEvents(response);
        setIsLoading(false);
      } catch (e) {
        throw e;
      }
    };
    fetchData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: '5%',
      }}>
      {isLoading == true ? (
        <Loading />
      ) : events.length == 0 ? (
        <View style={tailwind('bg-white rounded-xl')}>
          <Text
            style={tailwind('text-3xl text-gray-600 mt-20 mx-5 ')}
            innerHeight={500}>
            空 空 如 也 ...
          </Text>
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={({item}) => <EventCard {...item} />}
          keyExtractor={item => item.id}
          initialNumToRender={3}
          windowSize={5}
        />
      )}
    </View>
  );
};

export default Events;
