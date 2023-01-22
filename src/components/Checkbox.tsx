import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import colors from "tailwindcss/colors";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean
  title: string
}

export function Checkbox({ checked = false, title, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex flex-col mb-2 justify-center"
      {...rest}
    >
      {
        checked ?
        <Animated.View
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />
        </Animated.View>
        :
        <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      }

      <Text className="text-white text-base ml-3 font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  )
}
