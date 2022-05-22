import { FC, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePaginationQuery } from '../../generated/graphql';
import styles from './Pagination.module.css';

export const Pagination: FC<{
  updateStartCursor: (cursor: string | null) => void;
  step: number;
}> = ({ updateStartCursor, step }) => {
  const { data } = usePaginationQuery();
  const { query } = useRouter();
  const currentPage = Number(query?.page) || 0;
  const pagesCount = Math.ceil(data?.allPeople?.totalCount! / step);

  useEffect(() => {
    const newCursor =
      currentPage > 0
        ? data?.allPeople?.edges?.[currentPage * step - 1]?.cursor
        : null;
    updateStartCursor(newCursor!);
  });

  return (
    <div className={styles.pagination}>
      {currentPage > 0 && (
        <Link href={`/list?page=${currentPage - 1}`}>previous page</Link>
      )}
      <span>
        Page {currentPage + 1} of {pagesCount}
      </span>
      {currentPage < pagesCount - 1 && (
        <Link href={`/list?page=${currentPage + 1}`}>next page</Link>
      )}
    </div>
  );
};

export default Pagination;
