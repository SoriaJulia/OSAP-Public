import React from 'react';

export type InputChangeHandler = React.ChangeEventHandler<HTMLInputElement>;
export type TextAreaChangeHandler = React.ChangeEventHandler<HTMLTextAreaElement>;
export type ButtonMouseEventHandler = React.MouseEventHandler<HTMLButtonElement>;
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type CheckBoxChangeHandler = React.ChangeEventHandler<HTMLInputElement>;
