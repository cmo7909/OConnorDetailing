import React from "react";

const PackageCard = ({name, interiorPrice, exteriorPrice, interiorItems, exteriorItems}) => (
    <div className = "package-card">
        <h2>{name} Package:</h2>

        <div className = "section">
            <h3>Interior: ${interiorPrice}</h3>

            <ul>
                {interiorItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        </div>

        <div className="section">
            <h3>Exterior: ${exteriorPrice}</h3>

            <ul>
                {exteriorItems.map((item, i) => <li key={1}>{item}</li>)}
            </ul>
        </div>
    </div>
);
  

export default PackageCard;