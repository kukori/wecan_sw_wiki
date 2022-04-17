import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
}

export function Header({ title = '' }: Props) {
  return (
    <div>
      <div>{title}</div>
      <Link to="/">Home</Link>
    </div>
  );
}
