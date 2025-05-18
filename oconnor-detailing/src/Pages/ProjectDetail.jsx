import React from 'react';
import { useParams } from 'react-router-dom';
import './ProjectDetail.css';

// Static data for now — can be expanded
const projectDetails = {
  redrocket: {
    title: 'ChickenCoop',
    images: [
      '/gallery/Chickencoop/1.jpg',
      '/gallery/Chickencoop/2.jpg',
      '/gallery/Chickencoop/3.jpg',
    ],
    description: 'This 2016 Honda Civic Si came in after months of neglect... (Add more text here)',
  },
  blackbeauty: {
    title: 'Fishtub',
    images: [
      '/gallery/Fishtub/1.jpg',
      '/gallery/Fishtub/2.jpg',
      '/gallery/Fishtub/3.jpg',
      '/gallery/Fishtub/4.jpg',
      '/gallery/Fishtub/5.jpg',
      '/gallery/Fishtub/6.jpg',
      '/gallery/Fishtub/7.jpg',
      '/gallery/Fishtub/8.jpg',
      '/gallery/Fishtub/9.jpg',
      '/gallery/Fishtub/10.jpg',
      '/gallery/Fishtub/11.jpg',
      '/gallery/Fishtub/12.jpg',
      '/gallery/Fishtub/13.jpg',
      '/gallery/Fishtub/14.jpg',
      '/gallery/Fishtub/15.jpg',
      '/gallery/Fishtub/16.jpg',
      '/gallery/Fishtub/17.jpg',
      '/gallery/Fishtub/18.jpg',
      '/gallery/Fishtub/19.jpg',
      '/gallery/Fishtub/20.jpg',
      '/gallery/Fishtub/21.jpg',
      '/gallery/Fishtub/22.jpg',
      '/gallery/Fishtub/23.jpg',
      '/gallery/Fishtub/24.jpg',
      '/gallery/Fishtub/25.jpg',
      '/gallery/Fishtub/26.jpg',
      '/gallery/Fishtub/27.jpg',
      '/gallery/Fishtub/28.jpg',
      '/gallery/Fishtub/29.jpg',
      '/gallery/Fishtub/30.jpg',
      '/gallery/Fishtub/31.jpg',
      '/gallery/Fishtub/32.jpg',
      '/gallery/Fishtub/33.jpg',
      '/gallery/Fishtub/34.jpg',
      '/gallery/Fishtub/35.jpg',
      '/gallery/Fishtub/36.jpg',
      '/gallery/Fishtub/37.jpg',
      '/gallery/Fishtub/38.jpg',
      '/gallery/Fishtub/39.jpg',
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
