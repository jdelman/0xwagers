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
  const timeoutEnds = new Date(time + ms).toISOString();

  return (
    <>
      <label htmlFor="set_timeout">set a time limit</label>
      <fieldset id="set_timeout">
        <input
          type="text"
          id="timeout"
          name="timeout"
          placeholder=""
          onChange={onValueChange}
          value={timeoutValue}
        />
        <label htmlFor="timeout">days</label>
      </fieldset>
      <span id="timeoutEnds">ends on {timeoutEnds}</span>
    </>
  )
}