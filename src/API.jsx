// import React from 'react';



      {/* <div className="home__sliders">{discover ? <MovieThumbnail movies={discover} movieDetails={getMovieDetails} />: <div>Loading</div>}</div>

      <div className="home__sliders">{topRated ? <MovieThumbnail movies={topRated} movieDetails={getMovieDetails} />: <div>Loading</div>}</div>

      <div className="home__sliders">{popular ? <MovieThumbnail movies={popular} movieDetails={getMovieDetails} />: <div>Loading</div>}</div>

      <div className="home__sliders">{trending ? <MovieThumbnail movies={trending} movieDetails={getMovieDetails} />: <div>Loading</div>}</div> */}

      // <button onClick={()=>{setScreen(0)}}>Home</button>

      // <div>{data ? <MovieThumbnail movies={data} getMovieDetails={getMovieDetails} />: <div>Loading</div>}</div>


              {/* {movie ? <MoreDetails details={movie} exit={clearMovies} /> : <div>Loading</div>} */}
    
      {/* {data && <p onClick={console.log(data)}>{searchInput} is now in data</p>} */}


// const Image = (props) => {

//     const imageURL = `https://image.tmdb.org/t/p/original/${props.poster}`;

//     return ( 
//         <>
//             <img src={imageURL} alt={props.title} className="movie__poster" onClick={() => {props.movieDetails(props.id)}} />
//         </>
//      );
// }
 
// export default Image;

// import React from 'react';



// const Image = (props) => {

//     const imageURL = `https://image.tmdb.org/t/p/original/${props.poster}`;

//     const handleClick = () => {
//         props.movieDetails(props.id);
//         props.getScreen(1);
//     }

//     return ( 
//         <>
//             <img src={imageURL} alt={props.title} className="movie__poster" 
//             onClick={() => {{handleClick}}} />
//         </>
//      );
// }
 
// export default Image;
  
  // const url = `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${key}`;

  // PARTS OF THE API LINK
  // const url = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=Jack+Reacher&append_to_response=videos`;
  // const MOVIE_URL = END_URL + `movie/${movie_id}?` + API_KEY + DEFAULT_PARAM;
  // const CREDIT_URL = END_URL + `movie/{movie_id}` + "/credits?" + API_KEY;

  
  // const [ loading, setLoading ] = useState(true);

    // const GENRE_API = END_URL + "genre/movie/list?" + API_KEY;

// const DISCOVER_URL = `${END_URL}discover/movie?${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

    // useEffect( async () => {
  //   try {

  //     const response = await axios.get(DISCOVER_URL);
  //     setData(response.data);
  //     console.log(data);

  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // }, []);


// image path: https://image.tmdb.org/t/p/original/{posterpath}

//   import { useState } from 'react';
// import axios from 'axios';
// import Search from './components/Search';
// import Movies from './components/Movies';


// function App() {

//   const API_KEY = "api_key=887d05f637b9e4864f8cec83c7da0a1f";
//   const END_URL = "https://api.themoviedb.org/3/";
//   const DEFAULT_PARAM = "&page=1&include_adult=false";


//   //   ---- [ STATES ] ----   //
//   const [ data, setData ] = useState();
//   const [ searchInput, setSearchInput ]  = useState();



//   const search = async () => {

//     const searchURL = END_URL + "search/multi?" + API_KEY + `&query=${searchInput}` + DEFAULT_PARAM;

//     try {
//       const response = await axios.get(searchURL);
//       setData(response.data.results);

//     } catch (error) {
//       console.log("Error", error);
//     }

//   }


//   const getMovieDetails = async (moviesArray) => {

//     moviesArray.map((movie, index) => {
      
//       const movieURL = END_URL + `movie/${movie.id}?` + API_KEY + "&append_to_response=videos";

//     })

    

//     try {
//       const response = await axios.get(movieURL);
//       setData(response.data);

//     } catch (error) {
//       console.log("Error", error);
//     }

//   }

//   const handleInput = (e) => {
//     setSearchInput(e.target.value);
// }




//   return (
      
      
//     <>
    
//       <Search search={search} handleInput={handleInput} />
//       <div>{data ? <Movies movies={data}  />: <div>Loading</div>}</div>
//       {data && <p onClick={console.log(data)}>{searchInput} is now in data</p>}

//     </>
//   );
// }

// export default App;


  // const genreList = async () => {

  //   try {
  //     const response = await axios.get(GENRE_API);
  //     setGenre(response.data);
  //     console.log(response.data);

  //   } catch (error) {
  //     console.log("Error", error);
  //   }

  // }

  // const getMovieDetails = async (movieId) => {
      
  //   const movieURL = END_URL + `movie/${movieId}?` + API_KEY + "&append_to_response=videos";

  //   try {
  //     const response = await axios.get(movieURL);
  //     setData(response.data);

  //   } catch (error) {
  //     console.log("Error", error);
  //   }

  // }


//   const getMovieDetails = async (movieId) => {
      
//     const movieURL = END_URL + `movie/${movieId}?` + API_KEY + "&append_to_response=videos";

//     try {
//       const response = await axios.get(movieURL);
//       setMovie(response.data);
//       console.log(response.data);

//     } catch (error) {
//       console.log("Error", error);
//     }

//   }


//   ///// --- [ DISCOVER ] --- /////
//   const discover = async () => {

//     try {

//       const response = await axios.get(DISCOVER_URL);
//       setData(response.data);
//       console.log(data);

//     } catch (error) {
//       console.log("Error", error);
//     }
//   }, []);
//   }