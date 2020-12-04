# Minesweeper

## Requirements

1. Node v10.+

## Run Minesweeper
2. ```yarn @latest npm i yarn -g```
3. ```yarn install```
4. ```yarn start```

For expediency, I used reactstrap, which is built on top of bootstrap, so scss is being compiled.
Should the build fail. Run ```npm rebuild node-sass```
And then try to start the app again: ```yarn start```

## About

I took some liberties with the UX, by adding the ability for the user to rejoin a game by loading the game state from local storage.  I also saved the user selections from the initial screen in storage so they could just play again without having to enter values again.

There are 3 screens in the game with a simple manager to manage them.

For state management, I decided to try something different from what I'm used to. I don't have a lot of time spent using React's "context" exclusively for an app's  state management. Whenever I do one of these projects I try to learn something new in the process. I think the pattern that I'm following in this project has promise. I chose to keep the store flat in this case, but breaking a store up into multiple composable stores, should work pretty nicely.  The consumers, in this case, are just managing destructuring the state and populating the screen's props.  Doing this way, rather than loading the context directly, will make proper testing much easier.

Testing... I didn't write a lot of tests, unfortunately.  I did write a few for some of the board logic.

Obviously, the most difficult part of building the game, is the user game interaction resolution.  I chose to use two number[][] to maintain the game state.

The game board is generated after the initial player selection. It is populated with numbers from 0-9. 9s are bombs, 0s are tiles that are not contiguous with any bombs and 1-8 indicate the number of bombs that are connected to a given tile. This board is not mutated until a new game is started.

The game state board is populated with values 0, 1, or 2.  0 indicates a tile that has not been clicked. 1 is a clicked tile. 2 indicates a flagged tile.

When a user clicks a tile that is a bomb, the game ends.

When a user clicks a tile that is not a bomb, the game state is resolved by recursing through tiles adjacent to the tiles around the tile that is currently being processed, starting, of course, with the tile that was just clicked.  If a tile has a value of 0 on the game board, it is marked a 1 in the game state and that tile is added to the queue to be processed.  If the value of the in process tile is 1-8 it is marked as played in the game state, but it is not added to the processing queue.  If the value is 9 of the tile is flagged in the game state, then the game state is not altered and the tile is not added to the queue.

When the processing queue is complete a "done" function is executed.  At this point, currently, the "victory" status is determined, by counting the number of played tiles and if they equal the possible number of plays, then the user wins. This is an additional operation that could be alleviated, but handling the counting process by persisting the current count in the state, and updating that number during the play resolution process. Alas I have to get this to you guys.

I think that's about it. Hopefully there are no bugs!  This was a fun challenge.


