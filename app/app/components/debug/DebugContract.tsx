import {useState} from 'react';
import type {TAbiItem} from '~/types/solidity';

interface DebugContractProps {
  onSubmit: (event: any) => void;
  formId: string;
  abi: Array<TAbiItem>;
  defaultContractAddress?: string;
}

export default function DebugContract(props: DebugContractProps) {
  const [selectedFunction, setSelectedFunction] = useState('');

  const onSubmit = () => props.onSubmit(props.formId);

  const renderSelectedFunction = () => {
    if (!selectedFunction) return null;

    const abiForFunction = props.abi.find((func) =>
      func.name === selectedFunction);
    
    if (!abiForFunction) return <div>missing abi</div>;

    return (
      <>
        <p>Mutability: {abiForFunction.stateMutability}</p>
        {
          abiForFunction.inputs.map((func, index) => (
            <input
              id={func.name}
              key={func.name}
              name={`arg-${index}`}
              type={func.type.includes('int') ? 'number' : 'text'}
              placeholder={`${func.name} (${func.type})`}
              className="rounded-md p-2 outline outline-1 mx-2"
            />
          ))
        }
        {
          abiForFunction.stateMutability === 'payable' && (
            <input
              name="value"
              type="number"
              placeholder="value (eth)"
              className="rounded-md p-2 outline outline-1 mx-2"
            />
          )
        }
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-md p-2 outline-2 outline-offset-1 outline-black bg-indigo-500 text-white hover:bg-indigo-900 transition" 
        >submit</button>
      </>
    )
  };

  return (
    <form id={props.formId}>
      <input
        className="rounded-md p-2 outline outline-1 mx-2"
        placeholder="contract address"
        name="contractAddress"
        id="contractAddress"
        defaultValue={props.defaultContractAddress || ''}
      />
      <select
        className="rounded-md p-2 outline outline-1 mx-2"
        id="contractMethod"
        name="contractMethod"
        onChange={(event) => setSelectedFunction(event.target.value)}
      >
        {
          props.abi.map((item) => (
            <option
              key={item.name || 'constructor'}
              value={item.name}
            >{item.name || 'constructor'}</option>
          ))
        }
      </select>
      { renderSelectedFunction() }
    </form>
  );
}