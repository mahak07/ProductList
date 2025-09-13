import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const WeatherSkeleton = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
      <SkeletonPlaceholder.Item width={120} height={120} borderRadius={60} />
      <SkeletonPlaceholder.Item marginTop={10} width={180} height={20} borderRadius={4} />
      <SkeletonPlaceholder.Item marginTop={6} width={100} height={20} borderRadius={4} />
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export default WeatherSkeleton;