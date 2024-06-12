import { useState, useEffect } from 'react';
import { person_name } from './App.tsx';
import './Canvas.css';
// Dynamically import all images from the 'public/media/images' directory

const images: Record<string, () => any> = import.meta.glob('./assets/media/images/*.{webp,png,jpg,jpeg,svg}', { eager: true });
// @ts-ignore
const imageArray = Object.values(images).map((module : { default: any }) => module.default);

const getYearFromImage = (image: string) => {
  const filename = image.split('/').pop();
  if (filename) {
    return filename.split('_')[0];
  } else {
    return '';
  }
};

// Select K items per year
const K = 3; // num of element per year
const M = 3; // TOP M years to display
let imagesPerYear: { [year: string]: string[] } = {};
imageArray.forEach((image) => {
  const year = getYearFromImage(image);
  if (!imagesPerYear[year]) {
    imagesPerYear[year] = [];
  }
  if (imagesPerYear[year].length < K) {
    imagesPerYear[year].push(image);
  }
});

// Flatten the images per year into a single array
const allImages = Object.values(imagesPerYear).flat();

const yearInfoLookup = {
  '2012': { 
    name: 'The Mayan Meltdown', 
    description: 'Teenagers were busy debunking Mayan apocalypse theories while simultaneously perfecting their Gangnam Style dance moves. Instagram filters and Harlem Shake videos dominated their social media feeds.'
  },
  '2013': { 
    name: 'The Vine Era', 
    description: 'Short attention spans were on full display as teenagers embraced the six-second video platform Vine. Selfies were taken to new heights with the introduction of selfie sticks, and emojis became an integral part of digital communication.'
  },
  '2014': { 
    name: 'The Ice Bucket Challenge Craze', 
    description: 'Teenagers poured buckets of ice water over their heads in the name of ALS awareness and then nominated their friends to do the same. Flappy Bird addiction reached its peak, and everyone was obsessed with "Let It Go" from Frozen.'
  },
  '2015': { 
    name: 'The Snapchat Spectacle', 
    description: 'Teenagers spent countless hours sending disappearing photos and videos to their friends on Snapchat. They debated the color of a dress, lost themselves in the world of Netflix binge-watching, and dabbed their way through social gatherings.'
  },
  '2016': { 
    name: 'The Pokémon Go Pandemonium', 
    description: 'Teenagers took to the streets in search of virtual creatures with the launch of Pokémon Go. They debated whether Laurel or Yanny was being said, and "Damn Daniel" became a viral sensation.'
  },
  '2017': { 
    name: 'The Fidget Spinner Frenzy', 
    description: 'Fidget spinners spun their way into the hands of every teenager, providing a brief distraction from the chaos of the world. Memes ruled the internet, and everyone tried their hand at the Bottle Flip Challenge.'
  },
  '2018': { 
    name: 'The Fortnite Phenomenon', 
    description: 'Teenagers battled it out in the virtual world of Fortnite, building forts and doing dances known as emotes. They debated whether "Yanny" or "Laurel" was being said, and the phrase "OK Boomer" became a cultural phenomenon.'
  },
  '2019': { 
    name: 'The VSCO Girl Trend', 
    description: 'Teenagers embraced the VSCO girl aesthetic with oversized T-shirts, scrunchies, and Hydro Flask water bottles. They debated the color of a shoe, and Baby Yoda captured the hearts of millions.'
  },
  '2020': { 
    name: 'The Quarantine Quirk', 
    description: 'Locked indoors due to a global pandemic, teenagers adapted to virtual classrooms and socially distanced hangouts. TikTok dances and homemade sourdough bread became the highlights of their quarantine diaries.'
  },
  '2021': { 
    name: 'The Zoom Zest', 
    description: 'Teenagers continued to navigate virtual classrooms and socially distanced hangouts. They mastered the art of baking banana bread and tie-dyeing everything in sight, while eagerly awaiting the return of normalcy.'
  },
  '2022': { 
    name: 'The Crypto Craze', 
    description: 'Teenagers jumped on the cryptocurrency bandwagon, investing in Dogecoin and debating the merits of NFTs. They perfected their Zoom backgrounds and yearned for the days of crowded concerts and packed movie theaters.'
  },
  '2023': { 
    name: 'The Metaverse Madness', 
    description: 'With the rise of virtual reality technology, teenagers immersed themselves in the metaverse, attending virtual concerts and exploring digital worlds. They debated the best meme formats and eagerly awaited the latest iPhone release.'
  },
  '2024': { 
    name: 'The Robot Revolution', 
    description: 'As AI technology advanced, teenagers embraced robot companions and automated assistants. They debated the ethics of artificial intelligence and eagerly awaited the day when self-driving cars would become the norm.'
  }
};
function Canvas() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [yearCounts, setYearCounts] = useState<Record<string, number>>({});
  const [shuffledImages, setShuffledImages] = useState<string[]>([]); // Specify the type as string[]

  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
    const initialCounts: Record<string, number> = {};
    Object.keys(imagesPerYear).forEach((year) => {
      initialCounts[year] = 0;
    });
    setYearCounts(initialCounts);
  }, []);

  const handleSmash = () => {
    const currentImage = shuffledImages[currentPhotoIndex];
    const year = getYearFromImage(currentImage);
    setYearCounts((prevCounts) => ({ ...prevCounts, [year]: prevCounts[year] + 1 }));
    setCurrentPhotoIndex(currentPhotoIndex + 1);
    if (currentPhotoIndex + 1 === shuffledImages.length) {
      setShowResults(true);
    }
  };

  const handlePass = () => {
    const currentImage = shuffledImages[currentPhotoIndex];
    const year = getYearFromImage(currentImage);
    setYearCounts((prevCounts) => ({ ...prevCounts, [year]: prevCounts[year] - 1 }));
    setCurrentPhotoIndex(currentPhotoIndex + 1);
    if (currentPhotoIndex + 1 === shuffledImages.length) {
      setShowResults(true);
    }
  };

  return (
    <div className="canvas-container">
      {currentPhotoIndex < shuffledImages.length && shuffledImages.length > 0 && (
        <div className="photo-container">
          <h1>Photos</h1>
          <img
            src={shuffledImages[currentPhotoIndex]}
            alt={`Photo ${currentPhotoIndex + 1}`}
            style={{ width: '80vw' }}
          />
          <p>{currentPhotoIndex + 1} / {shuffledImages.length}</p>
        </div>
      )}
      {showResults ? (
        <div className="results">
          <h1>Your most favourite {person_name}'s eras were:</h1>
          {Object.entries(yearCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, M)
            .map(([year, count], index) => (
              <div key={year}>
                {/* Generate stars based on position */}
                {Array.from({ length: M - index }, (_, i) => (
                  <span key={i}>⭐️</span>
                ))}
                {/* Use type assertion here */}
                <h2>🗓️ {yearInfoLookup[year as keyof typeof yearInfoLookup].name} ({year})</h2>
                <h3>🔥 Score: {count}</h3>
                {/* Display additional information from the lookup table */}
                {yearInfoLookup[year as keyof typeof yearInfoLookup] && (
                  <p>{yearInfoLookup[year as keyof typeof yearInfoLookup].description}</p>
                )}
                {/* Add a line separator except for the last item */}
                {index !== M - 1 && <hr />}
              </div>
            ))}
        </div>
      ) :(
        <div className="decision-buttons">
          <button className="smash-button" onClick={handleSmash}>Smash</button>
          <button className="pass-button" onClick={handlePass}>Pass</button>
        </div>
      )}
    </div>
  );
}

export default Canvas;
