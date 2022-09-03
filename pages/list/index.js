import Head from 'next/head'
import Image from 'next/image'
import Card from '../../components/card/card'
import Header from '../../components/header/header'
import { fetchRecipe } from '../../lib/api'
import styles from '../../styles/Home.module.css'
import s from './index.module.css'
import Link from 'next/link'

export default function Recipes({listItems}) {
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
            Hi Ben, here's your shopping list this week:
          </h1>
        </div>
        <div className="flex flex-col">
            {listItems.data.map((i) => {
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
    const listItems = await fetch('http://localhost:3000/api/list', {
        method: 'get',
      }).then(listItems => listItems.json()) ?? []
  
    
  return {
    props: { 
     listItems,
      
    },
    
  }
}

// Need to add state to update UI after this runs
const clearItem = async event => {
    const deletedItem = await fetch('http://localhost:3000/api/list/' + event.target.value, {
        method: 'delete'
    }).then(deletedItem => deletedItem.json()) ?? []
}
