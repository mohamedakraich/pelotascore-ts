import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

const ItemDetailPage = ({
  item,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <React.Fragment>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
    </React.Fragment>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const item: Item = {
    name: 'ItemName',
    description: 'Item Sample Description',
    id: 1,
  };
  return {
    props: { item },
  };
}

export default ItemDetailPage;
