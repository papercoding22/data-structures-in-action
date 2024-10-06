import React from './React';

// Simulating function component with props
export default function MyComponent(props: { name: string }) {
  console.log('Component rendering with props:', props);

  // Simulating useState
  const [count, setCount] = React.useState(0);

  // Simulating useEffect hook that depends on props
  React.useEffect(() => {
    console.log(
      `Effect: Component mounted or updated with name: ${props.name}, count: ${count}`,
    );

    return () => {
      console.log(`Cleanup: Props were ${props.name}, count was ${count}`);
    };
  });

  return {
    props,
    data: {
      count,
    },
    methods: {
      increment: () => setCount(count + 1),
      decrement: () => setCount(count - 1),
    },
  };
}
