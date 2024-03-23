// src/app/_data/ArrangeDummyTransactions.ts

import { EntitySummary } from '../_types/entitySummary';

// If needed for sorting or filtering
const arrangeTransactions = (summary: EntitySummary[]): EntitySummary[] => {
  return summary.sort(
    (a: EntitySummary, b: EntitySummary) =>
      new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export default arrangeTransactions;
