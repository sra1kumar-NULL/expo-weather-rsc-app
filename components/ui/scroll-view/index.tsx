"use client";
import { cssInterop } from "nativewind";
import { ScrollView } from "react-native";

cssInterop(ScrollView, {
  className: {
    target: "style",
  },
  contentContainerClassName: {
    target: "contentContainerStyle",
  },
});
export { ScrollView };
