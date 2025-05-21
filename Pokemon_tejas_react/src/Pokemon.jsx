import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards"; 
import "./index.css";
export const Pokemon=()=>{
    const API="https://pokeapi.co/api/v2/pokemon?limit=24";
    const[pokemon,setPokemon]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null)
    const fetchPokemon=async()=>{
        try{
            const res=await fetch(API);
            const data=await res.json();
            console.log(data);

            const detailePokemonData=data.results.map(async(curpokemon)=>{
                // console.log(curpokemon.name);
                //  console.log(curpokemon.url);
                const res=await fetch(curpokemon.url);
                const data=await res.json();
                // console.log(data);
                return data;
            })
            // console.log(detailePokemonData);

            const detailedResponce = await Promise.all(detailePokemonData);
            console.log(detailedResponce);
            setPokemon(detailedResponce);
            setLoading(false);

        }catch(error){
            console.log(error);
            setLoading(false);
            setError(error);
        }
    }



    useEffect(()=>{
        fetchPokemon();
    },[])

    if(loading){
        return(
            <div>
                <h1>Loading..</h1>
            </div>
        )
    }
       if(error){
        return(
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    }
    return(
        <>
        <section className="container">
            <header>
                <h1>Lets Catch Pokemon</h1>
            </header>
            <div>
                <ul className="cards">
                    {
                        pokemon.map((curpokemon)=>{
                           return(
                            <PokemonCards key={curpokemon.id} pokemondata={curpokemon}/>
                           )
                        })
                    }
                </ul>
            </div>
        </section>
        </>
    )
}