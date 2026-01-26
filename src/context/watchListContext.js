import { createContext, useState, useContext } from "react";

const watchListContext=createContext();
 export const watchListProvider=({children})=>{
    const [watchList,setWatchList]=useState([]);

    const addToWatchList=(movie)=>{
        setWatchList((prev)=>
            prev.some((m)=>m.id==movie.id)?prev: [...prev,movie]
        )
    }
    const removeFromWatchList=(movie)=>{
        setWatchList((prev)=>
            prev.filter((m)=>m.id!==movie.id)
        )
    }
    return(
        <watchListContext.Provider
         value={{watchList,addToWatchList,removeFromWatchList}}>
            {children}
        </watchListContext.Provider>
    )
 }
 export const  useWatchList=()=>useContext(watchListContext);