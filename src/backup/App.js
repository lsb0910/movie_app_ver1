import React from 'react';
import axios from 'axios';
import Movie from './Movie';

class App extends React.Component{
  state = {
    isLoading: true,
    movies: [],   //영화데이터를 저장할 배열
  };

  getMovies = async () => { //async : getMovies 처리가 완료될때 까지 axios를 대기시킴 
    const {
        data: {
          data:{movies},
        },    // axios : json 데이터를 가져오는 도구
    } =  await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');  //평점에 의한 내림차순 정렬 
   // console.log(movies);    //movies.data.data.movies 점연산자 적용 ==> 구조 분해 할당하여 객체 구조화 ES6
    this.setState({movies, isLoading: false});
  };

  componentDidMount(){

    //영화 앱의 데이터를 불러올 것입니다.
    //setTimeout(()=>{this.setState({isLoading:false})},6000);  //6초 후에 isLoading state를 false로 바꿔라
    this.getMovies();
    
  }

  render(){
    const {isLoading,movies} = this.state;   //구조 분해 할당 : this.state를 입력하지 않아도 된다.
    return (
      <div>
        {isLoading 
        ? 'Loading...' 
        : movies.map((movie) =>{
           console.log(movie);  //Movies배열이고, 배열의 원소 1개가 Movie로 넘어온다.
           return <Movie 
              id = {movie.id}
              year = {movie.yaer}
              title = {movie.title}
              summary = {movie.summary}
              poster = {movie.medium_cover_image}
           />;  //Movie 컴포넌트를 출력
        })}
      </div>
    
    );
  }
}
export default App;
