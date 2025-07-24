export interface GymxRatingProps {
  numberOfVotes?: 3 | 5; // Number of Voted. Possible values: 3 or 5
  direction?: 'row' | 'column'; // Visual Direction horizontal: row, vertical: column
  multipleVotes?: boolean;
}
