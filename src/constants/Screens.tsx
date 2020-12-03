import IntroState from '../stores/IntroStateConsumer';
import IntroScreen, { IIntroScreenProps } from '../modules/intro/IntroScreen';
import GameState from '../stores/GameStateConsumer';
import GameScreen, { IGameScreenProps } from '../modules/game/GameScreen';
import React from 'react';

export interface IScreenConfig {
  id: string;
  factory: () => JSX.Element;
}

const Screens: Record<string, IScreenConfig> = {
  intro: {
    id: 'intro',
    factory: (): JSX.Element => (
      <IntroState>
        {(state: IIntroScreenProps) => <IntroScreen {...state} />}
      </IntroState>
    )
  },
  game: {
    id: 'game',
    factory: (): JSX.Element => (
      <GameState>
        {(state: IGameScreenProps) => <GameScreen {...state} />}
      </GameState>
    )
  }
};

export default Screens;
