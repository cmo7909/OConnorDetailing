import React from 'react';
import { useParams } from 'react-router-dom';
import './ProjectDetail.css';

// Static data for now — can be expanded
const projectDetails = {
  redrocket: {
    title: 'ChickenCoop',
    images: [
      '/gallery/redrocket/1.jpg',
      '/gallery/redrocket/2.jpg',
      '/gallery/redrocket/3.jpg',
    ],
    description: 'This 2016 Honda Civic Si came in after months of neglect... (Add more text here)',
  },
  blackbeauty: {
    title: 'Fishtub',
    images: [
      '/gallery/blackbeauty/1.jpg',
      '/gallery/blackbeauty/2.jpg',
    ],
    description: 'This BMW M4 had deep swirl marks and a stained interior... (Add your detail story)',
  },
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectDetails[id];

  if (!project) return <h2>Project not found</h2>;

  return (
    <div className="project-detail-page">
      <div className="image-scroll">
        {project.images.map((img, i) => (
          <img src={img} alt={`Slide ${i + 1}`} key={i} />
        ))}
      </div>
      <div className="project-description">
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectDetail;
