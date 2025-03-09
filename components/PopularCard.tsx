import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { FC } from "react";
import icons from "~/constants/icons";

interface IPopularCardsProps {
  onPress: () => void;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const PopularCard: FC<IPopularCardsProps> = ({
  onPress,
  title,
  poster_path,
  vote_average,
}) => {
  const baseImageUrl = "https://image.tmdb.org/t/p/w500/";
  const posterPath = poster_path;
  const fullImageUrl = `${baseImageUrl}${posterPath}`;
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-1/2 h-[300px] mt-4 shadow"
    >
      <Image
        className="flex-1 rounded-2xl"
        resizeMode="cover"
        source={{ uri: fullImageUrl }}
      />
      <Text className="text-md mt-2 font-bold font-rubik-bold">{title}</Text>
      <View className="flex flex-row gap-2 mt-2">
        <Image source={icons.star} resizeMode="contain" className="w-4 h-4" />
        <Text className="text-gray text-[12px]">{vote_average} / 10 IMDb</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularCard;
