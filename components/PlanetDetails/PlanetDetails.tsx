import { FC } from 'react';
import { usePlanetQuery } from '../../generated/graphql';
import styles from './PlanetDetails.module.css';

const PlanetDetails: FC<{ planetId: string }> = ({ planetId }) => {
  const { data, loading } = usePlanetQuery({
    variables: { id: planetId as string },
  });

  return (
    <div>
      {loading ? (
        <div>
          <p>loading planet data..</p>
        </div>
      ) : (
        <div className={styles.planetDetails}>
          {data?.planet?.diameter && <p>diameter: {data.planet.diameter}</p>}
          {data?.planet?.gravity && <p>gravity: {data.planet.gravity}</p>}
          {data?.planet?.population && (
            <p>population: {data.planet.population}</p>
          )}
          {data?.planet?.surfaceWater && (
            <p>surface water: {data.planet.surfaceWater}</p>
          )}
          {data?.planet?.rotationPeriod && (
            <p>rotation period: {data.planet.rotationPeriod}</p>
          )}
          {data?.planet?.orbitalPeriod && (
            <p>orbital period: {data.planet.orbitalPeriod}</p>
          )}
          {data?.planet?.climates?.length && (
            <p>climates: {data.planet.climates.join(',')}</p>
          )}
          {data?.planet?.terrains?.length && (
            <p>terrains: {data.planet.terrains.join(',')}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PlanetDetails;
