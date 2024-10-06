import { describe, it, expect, beforeEach } from 'vitest';

import React from '../React';
import FunctionComponent from '../FunctionComponent';

describe('FunctionComponent', () => {
  beforeEach(() => {
    React.unmountComponent();
  });

  it('should render a function component', () => {
    const comp = React.render({
      fn: FunctionComponent,
      props: { name: 'Alice' },
    });

    expect(comp).toBeDefined();
  });

  // increment count
  it('should increment the count', () => {
    const comp = React.render({
      fn: FunctionComponent,
      props: { name: 'Alice' },
    });

    comp.methods.increment();

    const children = React.getChildren();

    expect(children.data).toEqual({ count: 1 });
  });

  // update props
  it('should update the component with new props', () => {
    const comp = React.render({
      fn: FunctionComponent,
      props: { name: 'Alice' },
    });

    comp.methods.increment();

    React.render({
      fn: FunctionComponent,
      props: { name: 'Bob' },
    });

    const children = React.getChildren();

    expect(children.props).toEqual({ name: 'Bob' });
    // but the count should remain the same
    expect(children.data).toEqual({ count: 1 });
  });
});
