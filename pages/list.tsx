import { ChangeEvent, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import CharacterList from '../components/CharacterList/CharacterList';
import Filter from '../components/Filter/Filter';
import { FilterInterface } from '../components/Filter/Filter.types';
import Pagination from '../components/Pagination/Pagination';
import Search from '../components/Search/Search';
import { Person, Planet, usePeopleQuery } from '../generated/graphql';
import styles from '../styles/List.module.css';

const PAGINATION_STEP = 10;
const ListPage: NextPage = () => {
  const [startCursor, setStartCursor] = useState<string | null>();
  const { data } = usePeopleQuery({
    variables: { first: PAGINATION_STEP, after: startCursor },
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [filters, setFilters] = useState<FilterInterface[]>([]);
  const allPeople = data?.allPeople?.people;
  const homeworlds = new Set(allPeople?.map((person) => person?.homeworld));

  useEffect(() => {
    if (data?.allPeople?.people) {
      setPeople(data.allPeople.people as Person[]);
    }
  }, [data?.allPeople?.people]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = data?.allPeople?.people?.filter((person) => {
        if (!person?.name) return false;
        return new RegExp(searchTerm, 'gi').test(person.name);
      }) as Person[];
      setSearchResults(filtered?.length ? filtered : []);
    } else setSearchResults([]);
  }, [data?.allPeople?.people, searchTerm]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const filterApplied = filters.find(
      (filter) => filter?.value === e.currentTarget.value
    ) as FilterInterface;
    let newFilters: FilterInterface[];
    if (filterApplied) {
      newFilters = filters.filter(
        (filter) => filter.value !== filterApplied.value
      );
    } else {
      newFilters = [
        ...filters,
        {
          name: e.currentTarget.name,
          value: e.currentTarget.value,
        },
      ];
    }
    if (newFilters?.length) {
      const filteredPeople = allPeople?.filter(
        (person) =>
          !!newFilters.find(
            (filter) => !!(filter.value === person?.homeworld?.name)
          )
      );
      setPeople(filteredPeople as Person[]);
    } else {
      setPeople(allPeople as Person[]);
    }
    setFilters(newFilters);
  };

  const updateStartCursor = (cursor: string | null): void => {
    setStartCursor(cursor);
  };

  return (
    <>
      <Head>
        <title>People of Star Wars | List</title>
        <meta name='description' content='Browse Star Wars characters' />
      </Head>
      <header>
        <h1>Star Wars characters</h1>
      </header>
      <div className={styles.pageContent}>
        <div className={styles.filters}>
          <Search
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            searchResults={searchResults}
          />
          <Filter
            handleFilter={handleFilter}
            homeworlds={[...homeworlds] as Planet[]}
          />
        </div>
        <CharacterList people={people} />
        <Pagination
          updateStartCursor={updateStartCursor}
          step={PAGINATION_STEP}
        />
      </div>
    </>
  );
};
export default ListPage;
