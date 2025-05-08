import React from "react";
import PackageCard from "./PackageCard";
import ExtrasSection from "./ExtraSection";

const packages = [
    {
        name: 'Silver',
        interiorPrice: 80,
        exteriorPrice: 100,
        interiorItems: [
            "Vacuum Carpets and Seats (leather seats cleaned)",
            "Wipe down + Dress doors, center console, and dash",
            "Door Jambs Cleaned",
            "Windows + mirrors cleaned"
        ],
        exteriorItems: [
           "Hand wash",
            "Claybar Mitt",
            "Hydro O2 Hydrophobic Spray",
            "Wheels dressed",
            "Plastic trim dressed" 
        ]
    },
    {
        name: 'Gold',
        interiorPrice: 80,
        exteriorPrice: 100,
        interiorItems: [
            "Vacuum Carpets and Seats",
            "Steam cleaned cloth seats",
            "Leather seats cleaned and conditioned",
            "Air Dusting the entire vehicle",
            "Steam cleaned carpets and mats",
            "Door Jambs Cleaned",
            "Windows + mirrors cleaned"
        ],
        exteriorItems: [
           "Hand wash",
            "Claybar mitt",
            "Butter wax or Hydro O2 Hydrophobic spray",
            "Wheels dressed + ceramic spray",
            "Plastic trim dressed"
        ]  
    },
    {
        name: 'Platinum',
        interiorPrice: 150,
        exteriorPrice: 150,
        interiorItems: [
            "Vacuum carpets and Seats",
            "Cloth Seat and Carpet Extraction",
            "Leather seats cleaned and conditioned",
            "Air dusting the entire vehicle",
            "Door jambs cleaned",
            "Windows + mirrors cleaned",
            "Clean the Spare jack and accessories"
        ],
        exteriorItems: [
           "Hand Wash",
            "Clay bar",
            "Undercarriage spray clean",
            "Chemical Guys Jet Seal (1 Year Useful Life)",
            "Wheels dressed + ceramic spray",
            "Plastic trim dressed" 
        ]
    }
];

const Pricing = () => (
    <div className="pricing-page">
        <h1>Our Packages</h1>
        <div className="package-list">
            {packages.map(pkg=> (
              <PackageCard key={pkg.name} {...pkg}></PackageCard>  
            ))}
        </div>
        <ExtrasSection></ExtrasSection>
    </div>
)

export default Pricing;