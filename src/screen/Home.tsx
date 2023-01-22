import { Alert, ScrollView, Text, View } from "react-native";
import { Header } from "../components/Header";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { generateDates } from "../utils/generate-dates";
import { useNavigation } from "@react-navigation/native";
import { api } from "../lib/axios";
import { useCallback, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import dayjs from "dayjs";

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[]

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearStart = generateDates();
const minSummaryDates = 18 * 5;
const amountOfDaysToFill = minSummaryDates - datesFromYearStart.length;

export function Home() {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get('/summary');
      setSummary(response.data);
    } catch (error) {
      Alert.alert('Ops', 'Nao foi possivel carregar o resumo dos habitos')
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(useCallback(() => {
    fetchData();
  }, []))

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {
          weekDays.map((weekDay, index) => (
            <Text 
              key={`${weekDay}-${index}`}
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{ width: DAY_SIZE }}
            >
              {weekDay}
            </Text>
          ))
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {
          summary &&
          <View className="flex-row flex-wrap">
          {
            datesFromYearStart.map(date => {
              const dayWithHabits = summary.find(day => {
                return dayjs(date).isSame(day.date, 'day');
              })
            
              return (
                <HabitDay
                  key={date.toISOString()}
                  date={date}
                  amount={dayWithHabits?.amount}
                  completed={dayWithHabits?.completed}
                  onPress={() => navigate('habit', { date: date.toISOString() })}
                />
              )
            })
          }

          {
            amountOfDaysToFill > 0 && Array
            .from({ length: amountOfDaysToFill })
            .map((_, index) => (
              <View
                key={`#${index}`}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))
          }
        </View>}
      </ScrollView>
    </View>
  )
}