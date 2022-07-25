import { useState , useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import {useDebounce} from 'use-debounce';

export default function QueryUsing(query){
    const [bookSearch ,setBookSearch] = useState([]);
    const [amount] = useDebounce(query,500);
    useEffect(() => {
        let active =true;
        if(amount){
          BooksAPI.search(amount).then(data => {
            if(data.error){
               setBookSearch([]);
            }else if(active){
                // console.log(data);
                setBookSearch(data);
            }
           })
          
        }
        return () => {
          active =false ;
          setBookSearch([]);
        }
        
      } , [amount]);

      return [bookSearch , setBookSearch];
}