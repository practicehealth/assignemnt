// import React, { useState } from 'react';
// import './TopLeve.css'

// // Define card data with titles and image URLs
// const cardData = [
//   {
//     title: 'Observation',
//     imageUrl: "https://img.icons8.com/?size=1x&id=CKRzHeWXCDLV&format=png", // Replace with your actual image path
//   },
//   {
//     title: 'Condition',
//     imageUrl: "https://img.icons8.com/?size=1x&id=CKRzHeWXCDLV&format=png", // Replace with your actual image path
//   },
//   {
//     title: 'Immunization',
//     imageUrl: "https://img.icons8.com/?size=1x&id=CKRzHeWXCDLV&format=png", // Replace with your actual image path
//   },
//   {
//     title: 'Procedure',
//     imageUrl: "https://img.icons8.com/?size=1x&id=CKRzHeWXCDLV&format=png", // Replace with your actual image path
//   },
//   {
//     title: 'Medication',
//     imageUrl: "https://img.icons8.com/?size=1x&id=CKRzHeWXCDLV&format=png", // Replace with your actual image path
//   },
//   {
//     title: 'Allergies',
//     imageUrl: "https://img.icons8.com/?size=1x&id=CKRzHeWXCDLV&format=png", // Replace with your actual image path
//   },
// ];

// const PatientDashboard: React.FC = () => {
//   // State to track the selected card (initially null)
//   const [selectedCard, setSelectedCard] = useState<string | null>(null);

//   // Function to handle card click
//   const handleCardClick = (title: string) => {
//     setSelectedCard(title);
//     // You can fetch data related to the selected card here from the backend
//   };

//   return (
//     <div className="patient-dashboard">
//       <h1>Welcome, Patient!</h1>
//       <div className="card-container">
//         {cardData.map((card) => (
//           <div
//             className={`card ${selectedCard === card.title ? 'selected' : ''}`}
//             key={card.title}
//             onClick={() => handleCardClick(card.title)}
//           >
//             <img src={card.imageUrl} alt={card.title} />
//             <h3>{card.title}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;



import React, { useState } from 'react';
// import Card from './Card';
import './home.css'
import Card from './Card'; // Import the Card component

const PatientDashboard = () => {
  // Dummy data for testing
  const cardData = [
    {
      title: 'Observation',
      imageUrl: 'https://img.icons8.com/?size=1x&id=CKRzHeWXCDLV&format=png',
    },
    {
      title: 'Condition',
      imageUrl: 'https://img.icons8.com/?size=1x&id=CKRzHeWXCDLV&format=png',
    },
    {
      title: 'Immunization',
      imageUrl: 'https://img.icons8.com/?size=1x&id=CKRzHeWXCDLV&format=png',
    },
    {
      title: 'Procedure',
      imageUrl: 'https://img.icons8.com/?size=1x&id=CKRzHeWXCDLV&format=png',
    },
    {
      title: 'Medication',
      imageUrl: 'https://img.icons8.com/?size=1x&id=CKRzHeWXCDLV&format=png',
    },
    {
      title: 'Allergies',
      imageUrl: 'https://img.icons8.com/?size=1x&id=CKRzHeWXCDLV&format=png',
    },
  ];

  return (
    <div className="patient-dashboard">
      <h1>Welcome, Patient!</h1>
      <div className="card-container">
        {cardData.map((card) => (
          <Card key={card.title} title={card.title} imageUrl={card.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default PatientDashboard;
