import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/utils/fetchData";
import { BACKENDURL } from "@/constants";
import { Category } from "@/types/allTypes";

interface Props {
  selectedCategoryId: number | null;
  setSelectedCategoryId: (val: number | null) => void;
}

const CategorySelector = ({ selectedCategoryId, setSelectedCategoryId }: Props) => {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => fetchData(`${BACKENDURL}/category/all`),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <Text className="font-semibold">Select Category:</Text>
      <ScrollView horizontal className="flex-row mb-2">
        {categories.map((cat: Category) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setSelectedCategoryId((prev: number| null) => (prev === cat.id ? null : cat.id))}
            className={`px-3 py-2 rounded-md border mr-2 ${
              selectedCategoryId === cat.id ? "bg-blue-600 border-blue-600" : "border-gray-300"
            }`}
          >
            <Text className={selectedCategoryId === cat.id ? "text-white" : "text-gray-800"}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default CategorySelector;
