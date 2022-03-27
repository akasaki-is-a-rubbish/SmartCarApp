import React, {useEffect} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import EventCard from '../../components/EventCard';
import Loading from '../../components/Loading';
import * as api from '../../services/auth';

const Events = () => {
  const [events, setEvents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await api.getEvents();

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
      ) : (
        <FlatList
          data={events}
          renderItem={({item}) => <EventCard {...item} />}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default Events;
