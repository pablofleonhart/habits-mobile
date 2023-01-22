import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screen/Home';
import { New } from '../screen/New';
import { Habit } from '../screen/Habit';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes(){
  return (
    <Navigator screenOptions={{ headerShown: false }} >
      <Screen
        name="home"
        component={Home}
      />

      <Screen
        name="new"
        component={New}
      />

      <Screen
        name="habit"
        component={Habit}
      />
    </Navigator>
  );
}
