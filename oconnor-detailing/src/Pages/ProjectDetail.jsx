import React from 'react';
import { useParams } from 'react-router-dom';
import './ProjectDetail.css';

// Static data for now — can be expanded
const projectDetails = {
  Chickencoop: {
    title: '"ChickenCoop"',
    images: [
      '/imageGallery/Chickencoop/1.jpg',
      '/imageGallery/Chickencoop/2.jpg',
      '/imageGallery/Chickencoop/3.jpg',
      '/imageGallery/Chickencoop/4.jpg',
      '/imageGallery/Chickencoop/5.jpg',
      '/imageGallery/Chickencoop/6.jpg',
    ],
    description: 'This 2012 Chevy Cruise came in after being purchased from the original owner. The vehicle was used to transport chickens and was evident with the before condition of the seats. The customer wanted the interior cleaned to both get a fresh start and improve the smell in the vehicle.\n\n\n\n Most of the the initial hay and debris were cleaned up with the vaccum and the primary tool for this car was the upholstry extractor. With some time the interior both looked and smelled drastically better making this vehicle the second dirtiest car I have detailed.\n\nThe customer was very happy with the final product and I think the images speak for themselves!',
    
  },
  Fishtub: {
    title: '"Fishtub"',
    images: [
      '/imageGallery/Fishtub/1.jpg',
      '/imageGallery/Fishtub/2.jpg',
      '/imageGallery/Fishtub/3.jpg',
      '/imageGallery/Fishtub/4.jpg',
      '/imageGallery/Fishtub/5.jpg',
      '/imageGallery/Fishtub/6.jpg',
      '/imageGallery/Fishtub/7.jpg',
      '/imageGallery/Fishtub/8.jpg',
      '/imageGallery/Fishtub/9.jpg',
      '/imageGallery/Fishtub/10.jpg',
      '/imageGallery/Fishtub/11.jpg',
      '/imageGallery/Fishtub/12.jpg',
      '/imageGallery/Fishtub/13.jpg',
      '/imageGallery/Fishtub/14.jpg',
      '/imageGallery/Fishtub/15.jpg',
      '/imageGallery/Fishtub/16.jpg',
      '/imageGallery/Fishtub/17.jpg',
      '/imageGallery/Fishtub/18.jpg',
      '/imageGallery/Fishtub/19.jpg',
      '/imageGallery/Fishtub/20.jpg',
      '/imageGallery/Fishtub/21.jpg',
      '/imageGallery/Fishtub/22.jpg',
      '/imageGallery/Fishtub/23.jpg',
      '/imageGallery/Fishtub/24.jpg',
      '/imageGallery/Fishtub/25.jpg',
      '/imageGallery/Fishtub/26.jpg',
      '/imageGallery/Fishtub/27.jpg',
      '/imageGallery/Fishtub/28.jpg',
      '/imageGallery/Fishtub/29.jpg',
      '/imageGallery/Fishtub/30.jpg',
      '/imageGallery/Fishtub/31.jpg',
      '/imageGallery/Fishtub/32.jpg',
      '/imageGallery/Fishtub/33.jpg',
      '/imageGallery/Fishtub/34.jpg',
      '/imageGallery/Fishtub/35.jpg',
      '/imageGallery/Fishtub/36.jpg',
      '/imageGallery/Fishtub/37.jpg',
      '/imageGallery/Fishtub/38.jpg',
      '/imageGallery/Fishtub/39.jpg',
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
