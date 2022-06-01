import {useState, useLayoutEffect, useRef, KeyboardEvent} from "react";
import type { MouseEvent, ChangeEvent } from "react";

export default function EditOutcomes() {
  const [outcomes, setOutcomes] = useState([
    'Yes',
    'No'
  ]);

  const addOutcome = () => {
    setOutcomes(current => [...current, '']);
  };

  const removeOutcomeAtIndex = (index: number) => {
    if (index === 0 && outcomes.length === 1) {
      return;
    }

    setOutcomes(current => {
      const newOutcomes = current.slice();
      newOutcomes.splice(index, 1);
      return newOutcomes;
    });
  }

  const removeOutcome = (event: MouseEvent) => {
    const index = parseInt(event.currentTarget.id.replace('remove_', ''), 10);
    removeOutcomeAtIndex(index);
  };

  const outcomeInputChanged = (event: ChangeEvent) => {
    const index = parseInt(event.currentTarget.id.replace('outcome_', ''), 10);
    const value = (event.currentTarget as HTMLInputElement).value;
    setOutcomes(current => {
      const newOutcomes = current.slice();
      newOutcomes[index] = value;
      return newOutcomes;
    });
  };

  const outcomeInputKeyDown = (event: KeyboardEvent) => {
    const target = event.currentTarget as HTMLInputElement;
    if (event.key === 'Enter') {
      addOutcome();
    }
    else if (event.key === 'Backspace' && target.value === '') {
      // Prevent deleting the last character of the previous outcome
      event.stopPropagation();
      event.preventDefault();

      const index = parseInt(target.id.replace('outcome_', ''), 10);
      removeOutcomeAtIndex(index);
    }
  };

  const focusLastOutcome = () => {
    const outcomeElems = document.getElementsByName('outcomes[]');
    const lastElem = outcomeElems[outcomeElems.length - 1];
    if (lastElem) {
      lastElem.focus();
    }
  }

  const outcomeCount = useRef(outcomes.length);

  useLayoutEffect(() => {
    if (outcomeCount.current !== outcomes.length) {
      // When the number of outcomes changes, focus on the last one
      focusLastOutcome();
    }
    outcomeCount.current = outcomes.length;
  }, [outcomes.length]);
  
  return (
    <div className="mt-6">
      <div className="flex mb-2 justify-between">
        <label htmlFor="outcomes" className="font-semibold">outcomes</label>
        <button
          id="add_outcome"
          type="button"
          className="hover:text-indigo-500"
          onClick={addOutcome}>+ add an outcome</button>
      </div>
      {
        outcomes.map((outcome, index) => (
          <fieldset
            key={`outcome_${index}`}
            className="group flex rounded-lg outline outline-1 outline-gray-100 p-2 mb-3 hover:outline-gray-300"
          >
            <label
              htmlFor={`outcome_${index}`}
              className="bg-gray-800 text-white p-2 h-full flex-none text-center inline-block rounded-md"
              style={{minWidth: '40px'}}
            >{index + 1}</label>
            <input
              type="text"
              id={`outcome_${index}`}
              name="outcomes[]"
              value={outcome}
              onChange={outcomeInputChanged}
              onKeyDown={outcomeInputKeyDown}
              maxLength={32}
              className="grow p-2 mx-2 focus:outline-2 focus:outline-indigo-800"
            />
            <button
              id={`remove_${index}`}
              type="button"
              onClick={removeOutcome}
              className="invisible group-hover:visible flex-none hover:text-red-500"
            >&times;&nbsp;Remove</button>
          </fieldset>
        ))
      }
    </div>
  )
}