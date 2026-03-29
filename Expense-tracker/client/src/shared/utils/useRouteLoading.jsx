import { useNavigation } from 'react-router-dom';

export const useRouteLoading = () => {
  const navigation = useNavigation();

  return navigation.state === 'loading';
};
