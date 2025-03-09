import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import icons from "~/constants/icons";
import { QueryKeysEnum } from "~/enum/querykeys.enum";
import { moviesService } from "~/services/movies.service";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

const Page = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const { data } = useQuery({
    queryKey: [QueryKeysEnum.moviedetails, id],
    queryFn: () => moviesService.getMovieDetails(id as string),
    select: (data) => data,
    enabled: !!id,
  });

  const baseImageUrl = "https://image.tmdb.org/t/p/w500/";
  const posterPath = data?.poster_path;
  const fullImageUrl = `${baseImageUrl}${posterPath}`;

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  });

  return (
    <View className="flex-1 bg-white relative">
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex flex-row bg-white rounded-full w-10 h-10 items-center justify-center absolute top-20 left-6 z-50"
      >
        <Image source={icons.backArrow} className="w-5 h-5" />
      </TouchableOpacity>

      <Stack.Screen
        options={{
          headerTransparent: true,
          headerLeft: () => <Text>Back</Text>,
          headerBackground: () => (
            <Animated.View style={[styles.header, headerAnimatedStyle]} />
          ),
        }}
      />
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image
          source={{
            uri: fullImageUrl,
          }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-[20px] font-rubik-semibold">{data?.title}</Text>
          <View className="flex flex-row gap-2 mt-4">
            <Image
              source={icons.star}
              resizeMode="contain"
              className="w-4 h-4"
            />
            <Text className="text-gray text-[12px]">
              {data?.vote_average} / 10 IMDb
            </Text>
          </View>
          <View>
            <FlatList
              data={data?.genres}
              renderItem={({ item }) => (
                <View className="p-2 rounded-md bg-blue-200">
                  <Text className="text-sm font-rubik-semibold">
                    {item.name}
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item?.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex gap-3 mt-4"
            />
          </View>
          <View className="mt-4 flex flex-row justify-between">
            <View className="flex flex-col gap-1">
              <Text className="text-gray font-rubik">Length</Text>
              <Text className="text-black font-rubik-semibold">
                {data?.runtime} min
              </Text>
            </View>

            <View className="flex flex-col gap-1">
              <Text className="text-gray font-rubik">Language</Text>
              <Text className="text-black font-rubik-semibold">
                {data?.original_language.toLocaleUpperCase()}
              </Text>
            </View>

            <View className="flex flex-col gap-1">
              <Text className="text-gray font-rubik">Budget</Text>
              <Text className="text-black font-rubik-semibold">
                ${data?.budget}
              </Text>
            </View>
          </View>

          <View className="mt-8">
            <Text className="text-[20px] font-rubik-bold text-[#110E47]">
              Description
            </Text>
            <Text className="text-md text-[#9C9C9C] mt-2">{data?.tagline}</Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};
export default Page;

const styles = StyleSheet.create({
  image: {
    width: width,
    height: IMG_HEIGHT + 200,
  },
  header: {
    backgroundColor: "#fff",
    height: 100,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
