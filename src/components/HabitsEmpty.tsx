import { Text } from "react-native";

export function HabitsEmpty() {
  return (
    <Text className="text-zinc-400 text-base">
      Voce ainda nao criou habitos para hoje {' '}
      
      <Text
        className="text-violet-400 text-base underline active:text-violet-500"
        onPress={() => {}}
      >
        comece cadastrando um.
      </Text>

    </Text>
  )
}