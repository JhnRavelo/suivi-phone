const useGetDataPerMonth = () => {
  return (stats, data, keyName) => {
    const newState = data.map((prev) => {
      const matchingNb = stats.find((nb) => nb.month == prev.number);

      if (matchingNb) {
        return { ...prev, [keyName]: matchingNb.count };
      } else {
        return prev;
      }
    });

    return newState;
  };
};

export default useGetDataPerMonth;
