import { useMemo } from "react";

export default function useSubordinate () {
  const subordinate  = useMemo(
    () => [
      {
        Header: 28,
        accessor: [7,8,9,4,5,6,29]
      },
      {
        Header: 10,
        accessor: [3,12,11]
      }
    ],
    []
  );

  return subordinate ;
}