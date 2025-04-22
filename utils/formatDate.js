export default  (dateString) => {
  const date = new Date(dateString);
  const formatted = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long", 
    day: "numeric",
   
  });
  return formatted;
};
