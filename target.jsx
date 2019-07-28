export default () => {
  const items = [1, 2, 3];

  return (
    <ul>
      {items.map(item => (
        <li>
          There is something todo with {item}
        </li>
      ))}
    </ul>
  );
}
