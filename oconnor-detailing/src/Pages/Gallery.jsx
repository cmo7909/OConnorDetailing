import React from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';

const projects = [
  {
    id: 'Chicken Coop',
    year: 2013,
    make: 'Chevy',
    model: 'Cruise',
    codeName: 'Chicken Coop',
    thumbnail: '/Gallery/Chickencoop/thumb.jpeg',
  },
  {
    id: 'Fishtub',
    year: 2020,
    make: 'Jeep',
    model: 'Gladiator',
    codeName: 'Fish Tub',
    thumbnail: '/Gallery/Fishtub/thumb.jpeg',
  },
  // Add more as needed
];

const Gallery = () => {
  return (
    <div className="gallery-page">
      <h1>Most Messy Past Projects</h1>
      <div className="gallery-grid">
        {projects.map(car => (
          <Link to={`/gallery/${car.id}`} key={car.id} className="thumbnail-card">
            <img src={car.thumbnail} alt={car.codeName} />
            <div className="card-info">
              <p>{car.year} {car.make} {car.model}</p>
              <h3>{car.codeName}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
