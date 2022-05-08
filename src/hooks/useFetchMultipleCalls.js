import { useState, useEffect } from "react";
import useFetchShowList from "./useFetchData";

const useFetchMultipleCalls = () => {
  const { data, isLoading, error } = useFetchShowList(key, url);

  return [data.results, isLoading, error];
};

export default useFetchMultipleCalls;
