/* eslint-disable prettier/prettier */
import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

const Loading = () => {
  return (
    <ContentLoader backgroundColor="#f5f5f5" foregroundColor="#dbdbdb">
      <Rect x="102" y="69" rx="3" ry="3" width="102" height="7" />
      <Rect x="92" y="47" rx="3" ry="3" width="178" height="6" />
      <Circle cx="48" cy="63" r="18" />
      <Rect x="95" y="95" rx="3" ry="3" width="178" height="6" />
      <Rect x="105" y="169" rx="3" ry="3" width="102" height="7" />
      <Rect x="95" y="147" rx="3" ry="3" width="178" height="6" />
      <Circle cx="51" cy="163" r="18" />
      <Rect x="98" y="195" rx="3" ry="3" width="178" height="6" />
      <Rect x="107" y="265" rx="3" ry="3" width="102" height="7" />
      <Rect x="97" y="243" rx="3" ry="3" width="178" height="6" />
      <Circle cx="53" cy="259" r="18" />
      <Rect x="100" y="291" rx="3" ry="3" width="178" height="6" />
      <Rect x="108" y="365" rx="3" ry="3" width="102" height="7" />
      <Rect x="98" y="343" rx="3" ry="3" width="178" height="6" />
      <Circle cx="54" cy="359" r="18" />
      <Rect x="101" y="391" rx="3" ry="3" width="178" height="6" />
      <Rect x="110" y="458" rx="3" ry="3" width="102" height="7" />
      <Rect x="100" y="436" rx="3" ry="3" width="178" height="6" />
      <Circle cx="56" cy="452" r="18" />
      <Rect x="103" y="484" rx="3" ry="3" width="178" height="6" />
      <Rect x="114" y="507" rx="3" ry="3" width="102" height="7" />
      <Rect x="103" y="534" rx="3" ry="3" width="178" height="6" />
    </ContentLoader>
  );
};

export default Loading;
