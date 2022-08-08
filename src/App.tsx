import 'normalize.css';
import './style.scss';

function App() {
  return (
    <main>
      <div className='pokedex-container'>
        <form className='pokedex-form'>
          <input type='text' />
          <button>
            <img src='/assets/icons/search.svg'></img>
          </button>
        </form>
        <img src='/assets/images/pokedex.svg' className='pokedex-image'></img>
        <img
          src='https://projectpokemon.org/images/normal-sprite/bulbasaur.gif'
          className='pokemon-image'
        ></img>
      </div>
    </main>
  );
}

export default App;
