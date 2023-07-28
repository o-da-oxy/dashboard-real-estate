import { useEffect, useState } from "react";
import { VictoryPie } from "victory";
import { H1, H2 } from "../SharedStyledComp.jsx";

const Diagrams = () => {
  const [realtorsCount, setRealtorsCount] = useState(0);
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/realtors")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching realtors data");
        }
        return response.json();
      })
      .then((data) => {
        setRealtorsCount(data.length);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });

    fetch("http://localhost:3000/properties")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching properties data");
        }
        return response.json();
      })
      .then((data) => {
        setPropertiesCount(data.length);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const chartData = [
    { x: "Realtors", y: realtorsCount },
    { x: "Properties", y: propertiesCount },
  ];

  return (
    <div>
      <H1>Diagrams</H1>
      {!loading && !error ? (
        <VictoryPie data={chartData} colorScale={["#FF6384", "#36A2EB"]} />
      ) : (
        <H2>{error && <p>Error: {error}</p>}</H2>
      )}
    </div>
  );
};

export default Diagrams;
