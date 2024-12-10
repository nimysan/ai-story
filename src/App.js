import './App.css';

function App() {
  const items = [
    { id: 1, title: "Nature", image: "https://picsum.photos/id/10/300/200" },
    { id: 2, title: "Architecture", image: "https://picsum.photos/id/20/300/200" },
    { id: 3, title: "Technology", image: "https://picsum.photos/id/30/300/200" },
    { id: 4, title: "People", image: "https://picsum.photos/id/40/300/200" },
    { id: 5, title: "Animals", image: "https://picsum.photos/id/50/300/200" },
    { id: 6, title: "Travel", image: "https://picsum.photos/id/60/300/200" },
    { id: 7, title: "Food", image: "https://picsum.photos/id/70/300/200" },
    { id: 8, title: "Sports", image: "https://picsum.photos/id/80/300/200" },
    { id: 9, title: "Art", image: "https://picsum.photos/id/90/300/200" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Photo Gallery
        </h1>
        <div className="grid grid-cols-3 gap-6">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-xl font-semibold text-gray-800 p-4 text-center">
                {item.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
