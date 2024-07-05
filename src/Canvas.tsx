import {
  useState,
  useEffect,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
} from "react";
import { person_name } from "./App.tsx";
import "./Canvas.css";
// Dynamically import all images from the 'public/media/images' directory

const images: Record<string, () => any> = import.meta.glob(
  "./assets/media/images/*.{webp,png,jpg,jpeg,svg}",
  { eager: true }
);
// @ts-ignore
let imageArray = Object.values(images).map(
  (module: { default: any }) => module.default
);

const getYearFromImage = (image: string) => {
  const filename = image.split("/").pop();
  if (filename) {
    return filename.split("_")[0];
  } else {
    return "";
  }
};

function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

// Shuffle the image array
imageArray = shuffleArray(imageArray);

// Select K items per year
const K = 5; // num of element per year
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

// Shuffle the images per year
Object.keys(imagesPerYear).forEach((year) => {
  imagesPerYear[year] = shuffleArray(imagesPerYear[year]);
});

// Flatten the images per year into a single array
const allImages = Object.values(imagesPerYear).flat();

const yearInfoLookup = {
  "2014": {
    name: "Matilde Innocente",
    description:
      "La tua partner ideale è Matilde 2014, ti piace qualcuno timido e ingenuo. Una horsegirl che il primo giorno di scuola chiede quando ci sarà la verifica.\n#spiritcavalloselvaggio #teacherspet",
  },
  "2015": {
    name: "Matilde Effervescente",
    description:
      "La tua partner ideale è Matilde 2015, ti piace qualcuno di effervescente e high energy.Una redhead che ama gli anime ma soprattutto i loro protagonisti. \n#free #otomegames #christmassongalldaylong",
  },
  "2016": {
    name: "Matilde Energetica",
    description:
      "La tua partner ideale è Matilde 2016, ti piace qualcuno di molto energetico ma che incanala queste sue forze in hobby e ambizioni. Una rossa che sta tornando al naturale e che gioca segretamente a LOL. Una viaggiatrice alla conquista dell’Australia.\n#gamergirl #energyover9000",
  },
  "2017": {
    name: "Matilde Edgy",
    description:
      " La tua partner ideale è Matilde 2017, ti piace qualcuno che “looks innocent but could kill you”, una Mati che ha abbracciato il lato più edgy di se stessa, anche se in fondo è sempre una patatona.\n#piss&love #gunisfun #nerd",
  },
  "2018": {
    name: "Matilde Festaiola",
    description:
      "La tua partner ideale è Matilde 2018, ti piace una persona che ha trovato la sua strada ma sa comunque godersi le follie della vita. Una Mati che parties hard but cuddles harder.\n#YOLO #sillygoosy.",
  },
  "2019": {
    name: "Matilde Girlboss",
    description:
      "La tua partner ideale è Matilde 2019, ti piace una girlboss al naturale, una donna in carriera ma che sa rockare un look da cougar (ma plantbased queen). Un attivista in erba.\n#svampygirl #rawr #veganlife",
  },
  "2020": {
    name: "Matilde Resiliente",
    description:
      "La tua partner ideale è Matilde 2020, ti piace una persona che sa combattere le difficoltà, covid hits hard ma Mati hits harder, specialmente con il nuovo look da schianto.\n#fatavioletta #fuckcovid #chloetingabsworkout",
  },
  "2021": {
    name: "Matilde Punk",
    description:
      "La tua partner ideale è Matilde 2021, una Matilde che ci ha dato un taglio (letteralmente), sfoggia una frangetta e capelli multicolor accompagnati da una grande passione per i my chemical romance e musica e style punk/emo. Confident e con una vita troppo interessante per non condividerla.\n#influencer #punkyfunky #outfitqueen",
  },
  "2022": {
    name: "Matilde Sociale",
    description:
      "La tua partner ideale è Matilde 2022, ti piace una farfalla sociale che spiega le ali e diffonde la sua sprizzante energia. Mati è nella sua foodblogger era e concert junkie.\n#cibobruttomabuono #musicfan #winxclub",
  },
  "2023": {
    name: "Matilde Matura",
    description:
      "La tua partner ideale è Matilde 2023, ti piace una persona matura, un'appassionata di lettura che pur di non sprecare un secondo si sfonda di audiolibri. Una Mati che sa quello che vuole, e quello che vuole è fare la nanna presto. \n#nofomo #grannylife #miao #honkmimimi",
  },
  "2024": {
    name: "Matilde Chill",
    description:
      " La tua partner ideale è Matilde 2024, una persona che sa entrare nel flusso dove tutto diventa C H I L L e una gymbro. Qualcuno che pensa positivo e lascia che il resto scivoli via, che grazie alla fusione di tutte le Mati passate ha raggiunto grandi obiettivi. Una ballerina “in provetta” e che presto potrà farti da sugary mommy (to be continued).\n#staytuned #saicosahovisto? #nopresura #sialflussonoalreflusso",
  },
};
function Canvas() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [yearCounts, setYearCounts] = useState<Record<string, number>>({});
  const [shuffledImages, setShuffledImages] = useState<string[]>([]); // Specify the type as string[]
  const [showResults, setShowResults] = useState(false);
  const [year, setYear] = useState("");

  useEffect(() => {
    const initialCounts: Record<string, number> = {};
    Object.keys(imagesPerYear).forEach((year) => {
      initialCounts[year] = 0;
    });
    setYearCounts(initialCounts);
    setShuffledImages(shuffleArray([...allImages])); // Shuffle here
  }, []);

  const handleSmash = () => {
    const currentImage = shuffledImages[currentPhotoIndex];
    if (currentImage == null) return;
    const year = getYearFromImage(currentImage);
    setYear(year);
    setYearCounts((prevCounts) => ({
      ...prevCounts,
      [year]: prevCounts[year] + 1,
    }));
    setCurrentPhotoIndex(currentPhotoIndex + 1);
    if (currentPhotoIndex + 1 === shuffledImages.length) {
      setShowResults(true);
    }
  };

  const handlePass = () => {
    const currentImage = shuffledImages[currentPhotoIndex];
    if (currentImage == null) return;
    const year = getYearFromImage(currentImage);
    setYear(year);
    setYearCounts((prevCounts) => ({
      ...prevCounts,
      [year]: prevCounts[year] - 1,
    }));
    setCurrentPhotoIndex(currentPhotoIndex + 1);
    if (currentPhotoIndex + 1 === shuffledImages.length) {
      setShowResults(true);
    }
  };

  const handlePlayAgain = () => {
    // Refresh the page
    window.location.reload();
  };

  return (
    <div className="canvas-container">
      {currentPhotoIndex < shuffledImages.length &&
        shuffledImages.length > 0 && (
          <div className="photo-container">
            <h1>Photos</h1>
            <img
              src={shuffledImages[currentPhotoIndex]}
              alt={`Photo ${currentPhotoIndex + 1}`}
              className="canvas-image"
              style={{ width: "80vw" }}
            />
            <p>{year}</p>
            <p>
              {currentPhotoIndex + 1} / {shuffledImages.length}
            </p>
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
                <h2>
                  🗓️ {yearInfoLookup[year as keyof typeof yearInfoLookup].name}{" "}
                  ({year})
                </h2>
                <h3>🔥 Score: {count}</h3>
                {/* Display additional information from the lookup table */}
                {yearInfoLookup[year as keyof typeof yearInfoLookup] && (
                  <p>
                    {
                      yearInfoLookup[year as keyof typeof yearInfoLookup]
                        .description
                    }
                  </p>
                )}
                {/* Add a line separator except for the last item */}
                {index !== M - 1 && <hr />}
              </div>
            ))}
          <button className="play-again-button" onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      ) : (
        <div className="decision-buttons">
          <button className="smash-button" onClick={handleSmash}>
            Smash
          </button>
          <button className="pass-button" onClick={handlePass}>
            Pass
          </button>
        </div>
      )}
    </div>
  );
}

export default Canvas;
