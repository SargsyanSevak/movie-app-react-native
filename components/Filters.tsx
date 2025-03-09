import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "~/enum/querykeys.enum";
import { moviesService } from "~/services/movies.service";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "Action"
  );

  const { data } = useQuery({
    queryKey: [QueryKeysEnum.genres],
    queryFn: moviesService.getGenres,
    select: (data) => data?.genres,
  });

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      router.setParams({ filter: "" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-5 mb-2"
    >
      {data?.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item?.name)}
          key={index}
          className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
            selectedCategory === item?.name
              ? "bg-primary-300"
              : "bg-primary-100 border border-primary-200"
          }`}
        >
          <Text
            className={`text-sm ${
              selectedCategory === item?.name
                ? "text-white font-rubik-bold mt-0.5"
                : "text-black-300 font-rubik"
            }`}
          >
            {item?.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
