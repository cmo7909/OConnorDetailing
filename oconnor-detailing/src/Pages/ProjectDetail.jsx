import React from 'react';
import { useParams } from 'react-router-dom';
import './ProjectDetail.css';

// Static data for now — can be expanded
const projectDetails = {
  Chickencoop: {
    title: '"ChickenCoop"',
    images: [
      '/gallery/Chickencoop/1.jpg',
      '/gallery/Chickencoop/2.jpg',
      '/gallery/Chickencoop/3.jpg',
      '/gallery/Chickencoop/4.jpg',
      '/gallery/Chickencoop/5.jpg',
      '/gallery/Chickencoop/6.jpg',
    ],
    description: 'This 2012 Chevy Cruise came in after being purchased from the original owner. The vehicle was used to transport chickens and was evident with the before condition of the seats. The customer wanted the interior cleaned to both get a fresh start and improve the smell in the vehicle.\n\n\n\n Most of the the initial hay and debris were cleaned up with the vaccum and the primary tool for this car was the upholstry extractor. With some time the interior both looked and smelled drastically better making this vehicle the second dirtiest car I have detailed.\n\nThe customer was very happy with the final product and I think the images speak for themselves!',
    
  },
  Fishtub: {
    title: '"Fishtub"',
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
    description: 'This Jeep Gladiator was the primary catering verhicle for the resturant AVVINO. After numerous catering events with dirty dishes and leftover food tossed in the car time had taken its toll. \n\n The exterior was relatively simple, there were numerous iron pits on the sides of the vehicle which was removed with an iron spray which changes purple when dissolving the iron particles. The remaining steps were hand wash + claybar and a wax coating for protection. \n\n  The largest challenge with this detail was the interior, every square inch needed to be wiped down. Additionally a fish sauce was spilled on the back seat seeping into the foam through the seams of the seats. Most of the smell and stain were removed by taking apart the seat and using a steam cleaner + upholstry extractor. \n\n Working solo this vehicle took a few days to complete, becoming by far my most challenging project, but the results at the end made it very rewarding! ',
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
        {project.description.split('\n\n').map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
