import React from 'react';

export class ErrorBoundary extends React.Component<any , { error: string }> {
  state = { error: '' };

  componentDidCatch(error: Error) {
    this.setState({ error: `${error.name}: ${error.message}` });
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div>{error}</div>
      );
    } else {
      return this.props.children;
    }
  }
}
