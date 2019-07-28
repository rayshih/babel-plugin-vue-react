export default () => {
  const items = [1, 2, 3];

  return (
    <ul>
      <li v-for="item in items">
        There is something todo with {item}
      </li>
    </ul>
  );
}
