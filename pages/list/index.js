import Head from 'next/head'
import Header from '../../components/header/header'
import { getListItems } from '../../lib/api'
import styles from '../../styles/Home.module.css'
import s from './index.module.css'
import { AWS_ENDPOINT } from '../../config'
import useSWR from 'swr';

async function fetcher(
  url) {
  const res = await fetch(url)
  return res.json()
}

export default function Recipes({listItems}) {
  const url = `${AWS_ENDPOINT}/list`;
  const {data, mutate: mutateList, error} = useSWR(url, fetcher)

  // Need to add state to update UI after this runs
  const clearItem = async event => {
    var id = event.target.value;
    const newData = data.filter((item) => item._id !== id)

    await mutateList(newData, false);
    const url = `${AWS_ENDPOINT}/list/${event.target.value}`
    await fetch(url, {
        method: 'delete'
    }).then(deletedItem => deletedItem.json()) ?? []
  }

  console.log(data)

  if(error) {console.log(error); return (<h1>Something went wrong!</h1>) }
  if (!data) return (
    <div className={styles.container}>
      <Head>
        <title>Shopping List | Benny Fresh</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="">
        <div className="flex flex-row">
          <h1 className="text-2xl mb-6">
            Hi Ben, here&apos;s your shopping list this week:
          </h1>
        </div>
        <div className="flex flex-col">
            {listItems && listItems?.map((i) => {
                return (
                    <div key={i.name} className="flex flex-row mb-6">
                        <label className={s.ingredientLabel + " mr-3"}><input name="item_id" value={i._id} onChange={clearItem} className={s.check} type="checkbox" id="task_1"/>{i.name} ({i.amount})</label>
                    </div>
                )
            })}
        </div>
      </main>

      <footer className="">
        
      </footer>
    </div>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping List | Benny Fresh</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="">
        <div className="flex flex-row">
          <h1 className="text-2xl mb-6">
            Hi Ben, here&apos;s your shopping list this week:
          </h1>
        </div>
        <div className="flex flex-col">
            {data && data?.map((i) => {
                return (
                    <div key={i.name} className="flex flex-row mb-6">
                        <label className={s.ingredientLabel + " mr-3"}><input name="item_id" value={i._id} onChange={clearItem} className={s.check} type="checkbox" id="task_1"/>{i.name} ({i.amount})</label>
                    </div>
                )
            })}
        </div>
      </main>

      <footer className="">
        
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  let listItems = await getListItems();
  
  return {
    props: { 
     listItems,
    },
    
  }
}


