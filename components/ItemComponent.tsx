import Link from 'next/link';

type Props = {
  item: Item;
};

const ItemComponent: React.FC<Props> = ({ item }) => {
  return (
    <Link href="/item/[id]" as={`/item/${item.id}`} passHref>
      <article>
        <div>
          <span>{item.name}</span>
          <p>{item.description}</p>
        </div>
      </article>
    </Link>
  );
};

export { ItemComponent };
