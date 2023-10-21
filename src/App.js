import { useEffect, useState } from "react"
import Tmdb from "./Tmdb"
import Row from "./components/Row";
import Header from "./components/Header";
import './App.css';
import FeaturedMovie from "./components/FeaturedMovie";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=> {
    const loadAll = async () => {
      //lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      //console.log(list);

      //filme em destaque
      let originals = list.filter((i) => i.slug === 'originais');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
      console.log(chosenInfo);
    }

    loadAll();
  },[])

  useEffect(()=> {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return(
    <div className="page">

      <Header black={blackHeader}/>

      {
        featuredData && 
          <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((i, key) => (
            <Row key={key} title={i.title} items={i.items} />
        ))}
      </section>

      <footer>
         Feito por <span>Lucas Echebeste</span><br />
         Direitos de imagem para Netflix<br />
         Dados retirados do site Themoviedb.org
      </footer>

      {movieList.length <= 0 && 
      
        <div className="loading">
          <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_960,c_limit/Netflix_LoadTime.gif" alt="Carregando"/>
        </div>
      
      }
    </div>
  )
}
 