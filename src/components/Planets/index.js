import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

class Planets extends Component {
  state = {
    planets: [],
    planetInfo: {},
    page: 1,
  }


  componentDidMount() {
    this.loadPlanets();
  }

  loadPlanets = async (page = 1) => {
    const response = await api.get(`/planets/?page=${page}`);

    const { results, ...planetInfo } = response.data;

    this.setState({ planets: results, planetInfo, page });

  }

  prevPage = () => {
    const { page, planetInfo } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadPlanets(pageNumber);
  }

  nextPage = () => {
    const { page, planetInfo } = this.state;

    if (page === planetInfo.next) return;

    const pageNumber = page + 1;

    this.loadPlanets(pageNumber);
  }

  render() {

    const { planets, planetInfo, page } = this.state;

    return (
      <>
      <div className="infos-planets">

        { planets.map(planet => (
          <article key={planet.id} className="containers">
            <h1>{planet.name}</h1>
            <p>Population: {planet.population}</p>
            <p>Climate: {planet.climate}</p>
            <p>Terrain: {planet.terrain}</p>

            <span>Featured in <b>{planet.films.length}</b> Films</span>
          </article>
        ))}

      </div>

      <div className="actions">
        <button onClick={this.prevPage}>PREVIOUS</button>
        <button onClick={this.nextPage}>NEXT</button>
      </div>
      </>
    );
  }
}

export default Planets;
