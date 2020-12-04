import React, { useState } from 'react';
import { css } from '@emotion/core';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';

import theme from 'styles/theme';

export interface IIntroScreenProps {
  rows: number;
  columns: number;
  bombs: number;
  startGame: (rows: number, columns: number, bombs: number) => boolean;
}

const styles = {
  container: css`
    font-weight: ${theme.fontWeight.base};
    padding: 6px 20px;
    width: 400px;
    height: 300px;
    text-align: center;
    ${theme.mixins.centeredDiv}
  `,
  label: css`
    width: 100px;
  `
};

export default ({
  rows,
  columns,
  bombs,
  startGame
}: IIntroScreenProps): JSX.Element => {
  const [formState, setFormState] = useState({
    rows,
    columns,
    bombs
  });

  const onSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    event.stopPropagation();
    /*    const form: HTMLFormElement = event.target as HTMLFormElement;
    const rowValue = parseInt(form.rows.value, 10);
    const columnsValue = parseInt(form.columns.value, 10);
    const bombsValue = parseInt(form.bombs.value, 10);*/

    startGame(formState.rows, formState.columns, formState.bombs);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element: HTMLInputElement = event.target;
    const val: number = parseInt(element.value, 10);
    const state = Object.assign({}, formState, { [element.name]: val });
    setFormState(state);
  };

  return (
    <div css={styles.container}>
      <h1>Minesweeper</h1>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label css={styles.label}>
            Rows
            <Input
              type="number"
              min={3}
              name="rows"
              defaultValue={formState.rows}
              onChange={onChange}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label css={styles.label}>
            Columns
            <Input
              type="number"
              min={3}
              name="columns"
              defaultValue={formState.columns}
              onChange={onChange}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label css={styles.label}>
            Bombs
            <Input
              type="number"
              min={1}
              name="bombs"
              defaultValue={formState.bombs}
              onChange={onChange}
            />
          </Label>
        </FormGroup>
        <Button type="submit">Start</Button>
      </Form>
    </div>
  );
};
