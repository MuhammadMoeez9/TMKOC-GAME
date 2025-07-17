import React, { useEffect, useState } from "react";

const CollectionPage = () => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("collection")) || [];
    setCollection(stored);
  }, []);

  return (
    <div>
      <h2>Your Mobile Collection</h2>
      {collection.length === 0 ? (
        <p>No mobiles purchased.</p>
      ) : (
        <ul>
          {collection.map((item, index) => (
            <li key={index}>📱 {item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CollectionPage;
