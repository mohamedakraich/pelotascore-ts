import Head from 'next/head';
import { InferGetServerSidePropsType } from 'next';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { getOrCreateConnection } from '../utils';
import { ItemModel } from '../models/item.model';

import { ItemListComponent } from '../components/ItemListComponent';

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <div>
      <Head>
        <title>Next With Typeorm Starter</title>
      </Head>

      <main>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="h2">{props.message}</Typography>
            <ItemListComponent items={props.items} />
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const conn = await getOrCreateConnection();
  const itemRepo = conn.getRepository<ItemModel>('ItemModel');
  const allItems = await itemRepo.find();
  console.log(`${allItems.length} items fetched from the database`);
  return {
    props: { message: 'Welcome to Next-With-Typeorm-Starter', items: allItems },
  };
}

export default Home;
