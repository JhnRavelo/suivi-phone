function useDateToTimestamp() {
  return (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day); 
    const timestamp = date.getTime();

    return timestamp;
  };
}

export default useDateToTimestamp;
