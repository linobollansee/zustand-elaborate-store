// Import specific exports from zustand
import { StateCreator } from "zustand";

// Export constant logger
export const logger = <T>(config: StateCreator<T>): StateCreator<T> => {
  // Return value from function
  return (set, get, api) =>
    config(
      // Define arrow function
      (args) => {
        console.log("  Previous State:", get());
        // Update store state
        set(args);
        console.log("  New State:", get());
      },
      get,
      api
    );
// Close object/block
};

// Export type definition for PersistOptions
export interface PersistOptions {
  name: string;
  // Ternary conditional
  storage?: Storage;
  // Define arrow function
  partialize?: <T>(state: T) => Partial<T>;
  // Ternary conditional
  version?: number;
  // Define arrow function
  migrate?: (persistedState: any, version: number) => any;
// End block
}

// Export type definition for TimeTravelState<T>
export interface TimeTravelState<T> {
  past: T[];
  present: T;
  future: T[];
// End block
}

// Export constant timeTravel
export const timeTravel = <T>(config: StateCreator<T>) => {
  // Return value from function
  return (set: any, get: any, api: any) => {
    // Declare variable timeTravelState
    const timeTravelState: TimeTravelState<T> = {
      past: [],
      present: config(set, get, api) as T,
      future: [],
    // Close object/block
    };

    // Return value from function
    return {
      ...timeTravelState.present,
      // Define arrow function
      undo: () => {
        // Define arrow function
        set((state: any) => {
          // Conditional statement
          if (state.past.length === 0) return state;
          // Declare variable previous
          const previous = state.past[state.past.length - 1];
          // Declare variable newPast
          const newPast = state.past.slice(0, state.past.length - 1);
          // Return value from function
          return {
            past: newPast,
            present: previous,
            future: [state.present, ...state.future],
          // Close object/block
          };
        // Close object/block
        });
      },
      // Define arrow function
      redo: () => {
        // Define arrow function
        set((state: any) => {
          // Conditional statement
          if (state.future.length === 0) return state;
          // Declare variable next
          const next = state.future[0];
          // Declare variable newFuture
          const newFuture = state.future.slice(1);
          // Return value from function
          return {
            past: [...state.past, state.present],
            present: next,
            future: newFuture,
          // Close object/block
          };
        // Close object/block
        });
      },
      // Define arrow function
      canUndo: () => get().past.length > 0,
      // Define arrow function
      canRedo: () => get().future.length > 0,
    // Close object/block
    };
  // Close object/block
  };
// Close object/block
};

// Export constant devtools
export const devtools = <T>(
  config: StateCreator<T>,
  // Ternary conditional
  options?: { name?: string }
) => {
  // Return value from function
  return config;
// Close object/block
};

// Export type definition for SubscriptionManager
export interface SubscriptionManager {
  subscribe: <T>(
    // Define arrow function
    selector: (state: T) => any,
    // Define arrow function
    callback: (value: any) => void
  // Define arrow function
  ) => () => void;
// End block
}

// Export constant computed
export const computed = <T extends object>(
  config: StateCreator<T>,
  // Define arrow function
  computedValues: (state: T) => Record<string, any>
) => {
  // Return value from function
  return (set: any, get: any, api: any) => {
    // Declare variable state
    const state = config(set, get, api);
    // Return value from function
    return new Proxy(state as object, {
      get(target: any, prop: string) {
        // Conditional statement
        if (prop in target) {
          // Return value from function
          return target[prop];
        // End block
        }
        // Declare variable computed
        const computed = computedValues(target);
        // Conditional statement
        if (prop in computed) {
          // Return value from function
          return computed[prop];
        // End block
        }
        // Return value from function
        return undefined;
      },
    }) as T;
  // Close object/block
  };
// Close object/block
};

// Export constant batch
export const batch = <T>(config: StateCreator<T>) => {
  // Declare variable isBatching
  let isBatching = false;
  // Declare variable pendingUpdates
  let pendingUpdates: any[] = [];

  // Return value from function
  return (set: any, get: any, api: any) => {
    // Declare variable batchedSet
    const batchedSet = (update: any) => {
      // Conditional statement
      if (isBatching) {
        pendingUpdates.push(update);
      } else {
        // Update store state
        set(update);
      // End block
      }
    // Close object/block
    };

    // Declare variable state
    const state = config(batchedSet, get, api);

    // Return value from function
    return {
      ...state,
      // Define arrow function
      startBatch: () => {
        isBatching = true;
      },
      // Define arrow function
      endBatch: () => {
        isBatching = false;
        // Conditional statement
        if (pendingUpdates.length > 0) {
          // Define arrow function
          set((state: T) => {
            // Declare variable newState
            let newState = state;
            // Define arrow function
            pendingUpdates.forEach((update) => {
              newState =
                typeof update === "function"
                  ? update(newState)
                  : { ...newState, ...update };
            // Close object/block
            });
            // Return value from function
            return newState;
          // Close object/block
          });
          pendingUpdates = [];
        // End block
        }
      },
    // Close object/block
    };
  // Close object/block
  };
// Close object/block
};