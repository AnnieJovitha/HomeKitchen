import Head from 'next/head'
import Image from 'next/image'
import Card from '../../components/card'
import Header from '../../components/header'
import { fetchRecipe } from '../../lib/api'
import styles from '../../styles/Home.module.css'

export default function NewRecipe() {

  const helloFreshImageURL = `https://img.hellofresh.com/hellofresh_s3`;
  return (
    <div className={styles.container}>
      <Head>
        <title>New Recipe | Benny Fresh</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="">
        <div className="flex flex-row justify-center">
          <h1 className="">
            Hi Ben, let's get cooking.
          </h1>
        </div>
        <div>
            <form onSubmit={addRecipe}>
              <input type="text" name="freshID" className="form-input rounded" />
              <button type="submit" className="btn-submit">Add Recipe</button>
            </form>
          </div>
      </main>

      <footer className="">
        
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  //const recipe = (await fetchRecipe("59a83c0f043c3c25824fbb13")) ?? []
  return {
    props: { 
     // recipe,
      
    },
    
  }
}

const addRecipe = async event => {
  event.preventDefault();
  const res = await fetchRecipe(event.target.freshID.value);
  if(res.name != '') {
    console.log(res)
    event.target.freshID.value = '';
    const response = await fetch('http://localhost:3000/api/recipes', {
      method: 'post',
      body: JSON.stringify(res)
    })

    console.log(response)
  }
}