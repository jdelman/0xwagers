import {useState, useEffect, useCallback} from "react";

export default function Timeout() {
  const [time, setTime] = useState(0);
  const [timeoutValue, setTimeoutValue] = useState('30');

  useEffect(() => {
    setInterval(() => {
      setTime(Date.now());
    }, 1000);
  }, []);

  const onValueChange = useCallback((event) => {
    setTimeoutValue(event.target.value);
  }, []);

  const ms = (parseInt(timeoutValue) || 0) * 24 * 60 * 60 * 1000;
  const timeoutEnds = new Date(time + ms).toLocaleString();

  return (
    <div className="mt-6">
      <label htmlFor="set_timeout" className="block mb-2 font-semibold">set a time limit</label>
      <div className="flex justify-between">
        <fieldset id="set_timeout">
          <input
            type="number"
            id="timeout"
            name="timeout"
            placeholder=""
            className="p-3 outline outline-1 outline-gray-200 hover:outline-gray-300 rounded-lg text-center mr-3 focus:outline-2 focus:outline-indigo-800"
            onChange={onValueChange}
            value={timeoutValue}
            style={{width: '100px'}}
          />
          <label htmlFor="timeout">days</label>
        </fieldset>
        <div id="timeoutEnds" className="p-3">
          <p>ends on {timeoutEnds}</p>
        </div>
      </div>
    </div>
  )
}