import Head from 'next/head'
import Image from 'next/image'
import Card from '../../components/card/card'
import Header from '../../components/header/header'
import { getRecipes, getRecipeIds } from '../../lib/api'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react'

export default function Recipes({recipes}) {

  const helloFreshImageURL = `https://img.hellofresh.com/hellofresh_s3`;
  const [selectedCards, setSelectedCards] = useState([]);
  console.log(selectedCards)

  return (
    <div className={styles.container}>
      <Head>
        <title>Meal Plan | Benny Fresh</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="">
        <div className="flex flex-row justify-center">
          {
            recipes.map.size > 0 
            ? <h1 className="text-3xl mb-12">Hi Ben, here&apos;s your meals this week:</h1> 
            : <h1 className="text-3xl mb-12">Hi Ben, let&apos;s add some recipes to your plan:</h1> 
          }
        </div>
        <div className={styles.list}>
            {recipes && recipes.map((r) => {
              return (
                <a href={"/recipes/" + r.id} key={r.id}><Card onSelected={() => setSelectedCards(prevState => ([...prevState, r.id]))} recipe={r} action="Remove"></Card></a>
              )
            })}
        </div>
      </div>

      <footer className="">
        
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  let recipesBulk = await getRecipes();
  recipesBulk = JSON.parse(recipesBulk.body);
  let recipeIds = await getRecipeIds();
  recipeIds = JSON.parse(recipeIds.body)
  let recipes = [];

  recipesBulk.map((r) => {
    recipeIds.map((id) => {
      if(r.id == id.recipeId) {
        recipes.push(r)
      }
    })
  })
    
  return {
    props: { 
     recipes,
      
    },
    
  }
}
