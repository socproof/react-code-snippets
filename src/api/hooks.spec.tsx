import {act, renderHook, render, fireEvent} from "@testing-library/react";
import {useKeydown, useMyName, useMyNameWithContext, useMyNameWithState, useOutsideClick} from "./hooks";
import {NameContextProvider} from "../context/NameContextProvider";

describe('hooks', () => {
  describe('useMyName hook', () => {
    it('should render text with passed name', () => {
      const {result, rerender} = renderHook((initialName: string | undefined) => useMyName(initialName), {
        initialProps: undefined
      });
      expect(result.current).toEqual('My name is undefined.');
      rerender('Vasya');
      expect(result.current).toEqual('My name is Vasya.');
    });
  });

  describe('useMyNameWithState hook', () => {
    it('should use setName and the message', () => {
      const {result, rerender} = renderHook((initialName: string) => useMyNameWithState(initialName), {
        //@ts-ignore
        initialName: undefined,
      });

      const {setName, message} = result.current;

      expect(setName).toBeDefined();
      expect(message).toEqual('My name is undefined.');
      rerender('Vasya');
      expect(result.current.message).toEqual('My name is Vasya.');
    });

    it('should set name with setName method', () => {
      const {result} = renderHook(() => useMyNameWithState('Vasya'));
      const {setName, message} =  result.current;

      expect(message).toEqual('My name is Vasya.');
      act(() => setName('Petya'));
      expect(result.current.message).toEqual('My name is Petya.');
    });

    it('should display and perform actions', () => {
      const {result} = renderHook(() => useMyNameWithState(''));
      const {setName} = result.current;
      const MockView = () => (
        <>
          {['Jack', 'Larry', 'Tom'].map((item) => [
            <label key={item}>
              <input type="radio" name="names" data-testid={item} value={item} onChange={() => setName(item)}/>
              {item}
            </label>
          ])}
        </>
      );

      const {container, getByTestId} = render(<MockView />);
      const larryButton = getByTestId('Larry');
      act(() => {
        fireEvent.click(larryButton);
      });
      expect(container).toMatchSnapshot();
      expect(larryButton).toBeChecked();
      const tomButton = getByTestId('Tom');
      expect(tomButton).not.toBeChecked();
      act(() => {
        fireEvent.click(tomButton);
      });
      expect(larryButton).not.toBeChecked();
      expect(tomButton).toBeChecked();
    });
  });

  describe('useMyNameWithContext hook', () => {
    it('should render the global context value', () => {
      const {result} = renderHook(() => useMyNameWithContext(), {
        wrapper: ({children}) => (
          <NameContextProvider initialName="Larry">{children}</NameContextProvider>
        ),
      });

      expect(result.current).toEqual('My name is Larry.');
    });
  });

  describe('useOutsideClick hook', () => {
    it('should handle outside click', () => {
      jest.spyOn(document, 'removeEventListener');
      const callback = jest.fn();

      const target = document.createElement('div');
      document.body.appendChild(target);

      const outside = document.createElement('div');
      document.body.appendChild(outside);

      const ref = {
        current: target
      };

      const view = renderHook(() => useOutsideClick(ref, callback));

      expect(callback).toBeCalledTimes(0);
      act(() => {
        fireEvent.click(outside);
      });
      expect(callback).toBeCalledTimes(1);

      view.unmount();
      expect(document.removeEventListener).toBeCalledTimes(1);
      act(() => {
        fireEvent.click(outside);
      });
      expect(callback).toBeCalledTimes(1);
    });
  });

  describe('useKeydown hook', () => {
    it('should handle keydown event', () => {
      const callback = jest.fn();
      jest.spyOn(document, 'removeEventListener');
      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
      });

      const view = renderHook(() => useKeydown('Escape', callback));

      expect(callback).toBeCalledTimes(0);
      act(() => {
        fireEvent(document, event);
      });
      expect(callback).toBeCalledTimes(1);

      view.unmount();
      expect(document.removeEventListener).toBeCalledTimes(1);
      act(() => {
        fireEvent(document, event);
      });

    });

    it('should not handle inappropriate keydown', () => {
      const callback = jest.fn();
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
      });

      renderHook(() => useKeydown('Escape', callback));

      expect(callback).toHaveBeenCalledTimes(0);
      act(() => {
        fireEvent(document, event);
      });
      expect(callback).toHaveBeenCalledTimes(0);
    });
  });
});
