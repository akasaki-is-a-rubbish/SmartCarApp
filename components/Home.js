import React from 'react';
import Grade from './Grade';
import {useTailwind} from 'tailwind-rn';


const Home = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('max-w-sm mx-auto flex flex-row items-center ')}>
      <Grade {...this.state.illegal} />
    </View>
  );
};

export default Home;
