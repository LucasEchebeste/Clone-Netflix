import React, { useState } from "react";
import '../components/Row.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default ({ title, items }) => {
    const [scrollX, setScrollx] = useState(-400);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0) {
            x= 0;
        }
        setScrollx(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if(window.innerWidth - listW > x) {
            x = (window.innerWidth - listW) - 60;
        }
        setScrollx(x)
    }

    return(
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}}/>
            </div>
            <div className="movieRow--right">
                <NavigateNextIcon style={{fontSize: 50}} onClick={handleRightArrow}/>
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((i, key) => (
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${i.poster_path}`} alt={i.original_title} />
                         </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
