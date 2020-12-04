import IntroState from './stores/IntroStateConsumer';
import IntroScreen, { IIntroScreenProps } from './modules/intro/IntroScreen';
import GameState from './stores/GameStateConsumer';
import GameScreen, { IGameScreenProps } from './modules/game/GameScreen';
import EndState from './stores/EndStateConsumer';
import EndScreen, { IEndScreenProps } from './modules/end/EndScreen';
import React from 'react';

export interface IScreenConfig {
  id: string;
  factory: () => JSX.Element;
}

const ScreensConfig: Record<string, IScreenConfig> = {
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
  },
  end: {
    id: 'end',
    factory: (): JSX.Element => (
      <EndState>
        {(state: IEndScreenProps) => <EndScreen {...state} />}
      </EndState>
    )
  }
};

export default ScreensConfig;
