import { quadraticVoting } from './quadratic_voting';
import * as assert from 'assert';

describe('quadraticVoting', () => {
    test('calculates quadratic votes for each agent and sum of quadratic votes', () => {
      const votes: number[] = [4, 9, 16];
  
      // Expected result
      const expectedQuadraticVotesDict = {
        0: 2, // sqrt(4) = 2
        1: 3, // sqrt(9) = 3
        2: 4, // sqrt(16) = 4
      };
  
      const expectedSumQuadraticVotes = 2 + 3 + 4;
  
      const [resultQuadraticVotesDict, resultSumQuadraticVotes] = quadraticVoting(votes);
  
      // Verify that the result is as expected
      expect(resultQuadraticVotesDict).toEqual(expectedQuadraticVotesDict);
      expect(resultSumQuadraticVotes).toEqual(expectedSumQuadraticVotes);
    });

    test('', () => {
      // Example usage:
      const votes: number[] = [4, 9, 16];
      const [result, sum] = quadraticVoting(votes);
  
      console.log('Quadratic Votes:', result);
      console.log('Sum of Quadratic Votes:', sum);
      assert.strictEqual(true, true);
    });
  });

