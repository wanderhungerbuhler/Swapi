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
    const response = await api.get(`/planets/${page}/`);

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

        <article className="containers">
          <img src="https://gamepedia.cursecdn.com/swtor_gamepedia/thumb/5/5f/Alderaan.png/250px-Alderaan.png?version=212b94e32a197e3d4ca282c50c0b65b7" alt=""/>
          <h1>{planetInfo.name}</h1>
          <p>Population: {planetInfo.population}</p>
          <p>Climate: {planetInfo.climate}</p>
          <p>Terrain: {planetInfo.terrain}</p>

          {/* <span>Featured in <b>{planetInfo.films}</b> Films</span> */}
        </article>

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
