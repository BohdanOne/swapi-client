import { ChangeEventHandler, FC } from 'react';
import { Planet } from '../../generated/graphql';
import styles from './Filter.module.css';

const HomeworldsFilter: FC<{
  handleFilter: ChangeEventHandler<HTMLInputElement>;
  homeworlds: Planet[];
}> = ({ handleFilter, homeworlds }) => {
  return (
    <section className={styles.homeworlds}>
      <h2>Filter by Homeworld</h2>
      <div>
        {homeworlds?.length &&
          homeworlds?.map((homeworld) => (
            <label
              htmlFor={homeworld?.name as string | undefined}
              key={homeworld?.id}
            >
              <>
                <input
                  type='checkbox'
                  name='homeworld'
                  id={homeworld?.name as string | undefined}
                  value={homeworld?.name as string | undefined}
                  onChange={handleFilter}
                />
                {homeworld?.name}
              </>
            </label>
          ))}
      </div>
    </section>
  );
};

export default HomeworldsFilter;
