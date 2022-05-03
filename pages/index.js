import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Card from '../components/card'
import Header from '../components/header'
import { fetchRecipe } from '../lib/api'

export default function Home({recipe, recipe2}) {

  const helloFreshImageURL = `https://img.hellofresh.com/hellofresh_s3`;
  return (
    <div className={styles.container}>
      <Head>
        <title>Benny Fresh | Let's Get Cooking</title>
        <meta name="description" content="Recipe app built by Ben Parsell" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className={styles.main}>
        <div className="flex flex-row justify-center">
          <h1 className={styles.title}>
            Hi Ben, let's get cooking.
          </h1>
        </div>
        
        <div className={styles.quickAccess}>
          <h2 className="text-3xl">Quick Access</h2>
          <div className="flex flex-row">
            <a className="btn-submit" href="/list">Shopping List</a>
            <a className="btn-submit" href="/recipes">Recipe List</a>
            <a className="btn-submit" href="/recipes/new">New Recipe</a>
            <a className="btn-submit" href="/plan">Current Meal Plan</a>
          </div>
        </div>

        <div className="flex flex-row">
          <h2 className="text-3xl">Current Meals</h2>
        </div>

        <div className="flex flex-col">
          <h2 className="text-3xl">Recipes</h2>
          <div className='flex flex-row'>
            <Card recipe={recipe}></Card>
            <Card recipe={recipe2}></Card>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const recipe = (await fetchRecipe("59a83c0f043c3c25824fbb13")) ?? []
  const recipe2 = (await fetchRecipe("5a664231ad1d6c6f007d0d72")) ?? []
  return {
    props: { 
      recipe,
      recipe2
    },
    
  }
}

const addRecipe = async event => {
  event.preventDefault();
  const res = await fetchRecipe(event.target.freshID.value);
  if(res.name != '') {
    event.target.freshID.value = '';
    const response = await fetch('http://localhost:3000/api/recipes', {
      method: 'post',
      body: JSON.stringify(res)
    })

  }
}
