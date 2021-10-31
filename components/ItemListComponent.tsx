import React from 'react';
import { ItemComponent } from './ItemComponent';

type Props = {
  items: Item[];
};

const ItemListComponent: React.FC<Props> = ({ items }) => {
  return (
    <React.Fragment>
      {items.map((p) => (
        <ItemComponent key={p.id} item={p} />
      ))}
    </React.Fragment>
  );
};

export { ItemListComponent };
