// import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
// import { HeavyItem } from './heavy-item-memo';

// const items = Array.from({ length: 10000 }, (_, i) => ({
//   id: i + 1,
//   title: `Item ${i + 1}`,
// }));

// function Row({ index, style }: ListChildComponentProps) {
//   const it = items[index];
//   return (
//     <div style={style}>
//       <HeavyItem id={it.id} title={it.title} />
//     </div>
//   );
// }

// export default function BigListVirtualized() {
//   return (
//     <List height={500} width={'100%'} itemCount={items.length} itemSize={72}>
//       {Row}
//     </List>
//   );
// }
