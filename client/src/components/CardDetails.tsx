import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCardData } from './CardDataContext';

interface CardDetailsData {
  id: string;
  year: string;
  eventType: string;
  serviceDate: string;
  resourceType: string;
}

function CardDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const resourceType = queryParams.get('resourceType');
  const { cardData } = useCardData();
  const [activeTab, setActiveTab] = useState<'summary' | 'data'>('summary');
  const cardDetailsData: CardDetailsData[] = cardData[resourceType || '']?.cards || []; // Update the property names

  // Function to close the details view and go back
  const handleClose = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="card-details bg-white">
      {/* ... Header section ... */}
      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            <button
              className={`bg-white-200 px-4 py-2 border-b-4 ${
                activeTab === 'summary' ? 'border-teal-500 text-black ' : ''
              }`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button
              className={`bg-white-200 px-4 py-2 border-b-4 ${
                activeTab === 'data' ? 'border-teal-500 text-black' : ''
              }`}
              onClick={() => setActiveTab('data')}
            >
              Data
            </button>
            <div className='px-16 border-b-4'></div>
          </div>
          {/* Close Button */}
          <button
            className="bg-teal-500 px-3 py-1 text-white font-bold rounded-full"
            onClick={handleClose} // Call the handleClose function on button click
          >
            X
          </button>
        </div>
        {activeTab === 'summary' && (
          <div className="bg-white p-4 rounded-lg">
            {/* Summary content */}
            <p className='mt-6 font-bold'>You have {cardDetailsData.length} records of resource type: {resourceType} </p>
          </div>
        )}
        {activeTab === 'data' && (
          <div className="bg-white-200 p-4 rounded-lg mt-4">
            {/* Data content */}
            {cardDetailsData.map((item, index) => (
              <div className='border-b-4 border-gray-200 mt-2 mb-2' key={index}>
                {/* Render data content here based on item */}
                <div className='flex'>
                  <p className='w-1/2 text-gray-500 text-base'>Id: </p>
                  <p className='text-lg'>{item?.id}</p>
                </div>
                <div className='flex'>
                  <p className='w-1/2 text-gray-500 text-base'>Year: </p>
                  <p className='text-lg'>{item?.year}</p>
                </div>
                <div className='flex'>
                  <p className='w-1/2 text-gray-500 text-base'>Event Type: </p>
                  <p className='text-lg'>{item?.eventType}</p>
                </div>
                <div className='flex'>
                  <p className='w-1/2 text-gray-500 text-base'>Service Date: </p>
                  <p className='text-lg'>{item?.serviceDate.split("T")[0]} {item?.serviceDate.split("T")[1].split(":")[0]}:{item?.serviceDate.split("T")[1].split(":")[1]}</p>
                </div>
                <div className='flex'>
                  <p className='w-1/2 text-gray-500 text-base'>Resource Type: </p>
                  <p className='text-lg'>{item?.resourceType}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default CardDetails;
