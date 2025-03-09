import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "~/enum/querykeys.enum";
import { moviesService } from "~/services/movies.service";
import { useRouter } from "expo-router";

import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import icons from "~/constants/icons";
import PopularCard from "~/components/PopularCard";
import Search from "~/components/Search";
import FeaturedCard from "~/components/FeaturedCard";
import Filters from "~/components/Filters";

const Home = () => {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeysEnum.getPopularMovies],
    queryFn: moviesService.getPopularMovies,
    select: (data) => data,
  });

  const { data: featured, isLoading: featuredLoading } = useQuery({
    queryKey: [QueryKeysEnum.topRated],
    queryFn: moviesService.topRated,
    select: (data) => data,
  });

  const handleCardPress = (id: string) => router.push(`/movie/${id}`);
  return (
    <SafeAreaView>
      <FlatList
        data={data?.results}
        numColumns={2}
        renderItem={({ item }) => (
          <PopularCard onPress={() => handleCardPress(item?.id)} {...item} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <View>
              <Text>No Results</Text>
            </View>
          )
        }
        ListHeaderComponent={() => (
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row">
                <Image
                  source={icons.avatar}
                  className="w-10 h-10 rounded-full"
                />

                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    Sevak Sargsyan
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="w-6 h-6" />
            </View>

            <Search />

            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              {featuredLoading ? (
                <ActivityIndicator size="large" className="text-primary-300" />
              ) : !featured || featured?.length === 0 ? (
                <Text>No Results</Text>
              ) : (
                <FlatList
                  data={featured?.results}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      onPress={() => handleCardPress(item?.id)}
                      {...item}
                    />
                  )}
                  keyExtractor={(item) => item?.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5"
                />
              )}
            </View>

            <View className="mt-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              <Filters />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
