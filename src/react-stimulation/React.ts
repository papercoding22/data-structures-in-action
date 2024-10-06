type Cleanup = () => void | undefined;

// Assuming each component has a unique ID
function getCurrentComponentId() {
  return 'myComponent'; // Hardcoded for simplicity. Each component would have a unique ID in a real app.
}

type FunctionComponent = (props: any) => {
  props: any;
  data: any;
  methods: {
    [key: string]: Function;
  };
};

interface Element {
  props: any;
  fn: FunctionComponent;
}

class React {
  private component: Element | null = null;
  private children: any = null;
  private cleanup: Cleanup | null = null;
  private componentStateStore: Map<string, any> = new Map();
  private currentCallIndex: number = 0;

  render(element: Element) {
    this.component = element;
    this.children = element.fn(element.props);
    return this.children;
  }

  // Simulating useEffect hook
  useEffect(effect: () => Cleanup) {
    this.cleanup = effect(); // Store cleanup function
  }

  // When state is updated in a component, we need to re-render the component
  updateComponent() {
    this.resetCallCount();
    this.cleanup && this.cleanup();
    // Re-render the component
    if (this.component) {
      this.render(this.component);
    }
  }

  getChildren() {
    return this.children;
  }

  unmountComponent() {
    this.resetCallCount();
    // clear the state store
    this.componentStateStore.clear();
    this.cleanup && this.cleanup();
  }

  useState<T>(initialValue: T) {
    const componentId = getCurrentComponentId(); // Assuming some way to track component ID

    if (!this.componentStateStore.has(componentId)) {
      this.componentStateStore.set(componentId, []); // Initialize state array for the component
    }

    const stateArray = this.componentStateStore.get(componentId);

    // If it's the first call (currentCallIndex), initialize the state
    if (stateArray[this.currentCallIndex] === undefined) {
      stateArray[this.currentCallIndex] = initialValue;
    }

    const hookIndex = this.currentCallIndex; // Store the hook index for closure use

    // Increment the call index for the next useState call
    this.currentCallIndex++;

    // Return the state value and the setter function
    const setState = (newValue: T) => {
      stateArray[hookIndex] = newValue;
      this.updateComponent();
    };

    return [stateArray[hookIndex], setState];
  }

  resetCallCount() {
    this.currentCallIndex = 0;
  }
}

export default new React();
