import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { FC } from "react";
import icons from "~/constants/icons";

interface IFeaturedCardsProps {
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

const FeaturedCard: FC<IFeaturedCardsProps> = ({
  onPress,
  poster_path,
  vote_average,
}) => {
  const baseImageUrl = "https://image.tmdb.org/t/p/w500/";
  const posterPath = poster_path;
  const fullImageUrl = `${baseImageUrl}${posterPath}`;
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-[200px] h-[300px] mt-4 shadow"
    >
      <Image
        className="flex-1 rounded-2xl relative"
        resizeMode="cover"
        source={{ uri: fullImageUrl }}
      />
      <View className="flex flex-row gap-2 mt-2 absolute top-4 left-4 bg-white/50 p-2 rounded-md">
        <Image source={icons.star} resizeMode="contain" className="w-4 h-4" />
        <Text className="text-black font-rubik-bold text-[12px]">{vote_average} / 10 IMDb</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedCard;
