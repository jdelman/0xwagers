import {useState, useCallback} from "react";

interface EditOutcomesProps {
  outcomes: Array<string>
}

export default function EditOutcomes() {
  const [outcomes, setOutcomes] = useState([
    'True',
    'False'
  ]);

  const addOutcome = useCallback((event) => {
    console.log('addOutcome');
    setOutcomes(current => [...current, '']);
  }, []);

  const removeOutcome = useCallback((event) => {
    const index = parseInt(event.target.id.replace('remove_', ''), 10);
    console.log('deleting outcome at', index);
    setOutcomes(current => {
      const newOutcomes = current.slice();
      newOutcomes.splice(index, 1);
      return newOutcomes;
    });
  }, []);

  const outcomeInputChanged = useCallback((event) => {
    console.log('outcomeInputChanged');
    const index = parseInt(event.target.id.replace('outcome_', ''), 10);
    const value = event.target.value;
    setOutcomes(current => {
      const newOutcomes = current.slice();
      newOutcomes[index] = value;
      return newOutcomes;
    });
  }, []);

  return (
    <>
      <label htmlFor="outcomes">outcomes</label>
      <button id="add_outcome" type="button" onClick={addOutcome}>+ add an outcome</button>

      {
        outcomes.map((outcome, index) => (
          <fieldset key={`outcome_${index}`}>
            <label htmlFor={`outcome_${index}`}>{index + 1}</label>
            <input
              type="text"
              id={`outcome_${index}`}
              name="outcomes"
              value={outcome}
              onChange={outcomeInputChanged}
              maxLength={32}
            />
            <button
              id={`remove_${index}`}
              type="button"
              onClick={removeOutcome}
            >X</button>
          </fieldset>
        ))
      }
    </>
  )
}