---result code---
export default (() => {
  const items = [1, 2, 3];
  return React.createElement(
    "ul", null,
    items.map(item => React.createElement("li", null, 
      "There is something todo with ", item)
    )
  );
});
