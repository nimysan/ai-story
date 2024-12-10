import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const titles = [
    "Nature", "Architecture", "Technology", "People", 
    "Animals", "Travel", "Food", "Sports", "Art"
  ];

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const stories = await Promise.all(
          titles.map(async (title, index) => {
            const response = await fetch('http://localhost:3001/api/generate-story', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title }),
            });

            if (!response.ok) {
              throw new Error(`Failed to fetch story for ${title}`);
            }

            const data = await response.json();
            return {
              id: index + 1,
              title,
              image: `https://picsum.photos/id/${(index + 1) * 10}/300/200`,
              story: data.story,
            };
          })
        );

        setItems(stories);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError('Failed to load stories. Please try again later.');
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const toggleCard = (id) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading stories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
          Story Gallery
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item) => (
            <div 
              key={item.id}
              className="card-container h-72 cursor-pointer"
              onClick={() => toggleCard(item.id)}
            >
              <div 
                className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
                  flippedCards.has(item.id) ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front of card */}
                <div className="absolute w-full h-full backface-hidden">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 p-4 text-center">
                      {item.title}
                    </h2>
                  </div>
                </div>
                
                {/* Back of card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full p-6">
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-700 text-center leading-relaxed">
                        {item.story}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
