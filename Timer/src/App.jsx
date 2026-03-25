import { useRef, useState } from "react";

const TimerFactors = {
  Hours: "hh",
  Minutes: "mm",
  Seconds: "ss",
  MilliSeconds: "ms",
};

const Config = {
  [TimerFactors.Hours]: {
    value: undefined,
    factor: 60 * 60 * 1000,
    placeholder: "HH",
  },
  [TimerFactors.Seconds]: {
    value: undefined,
    factor: 1000,
    placeholder: "SS",
  },
  [TimerFactors.Minutes]: {
    value: undefined,
    factor: 60 * 1000,
    placeholder: "MM",
  },
};

const OrderOfTime = [
  TimerFactors.Hours,
  TimerFactors.Minutes,
  TimerFactors.Seconds,
];

function App() {
  const [config, setConfig] = useState(structuredClone(Config));
  const [time, setTime] = useState(0);

  const intervalRef = useRef(null);
  const timeSpentRef = useRef(0);

  function handleChange({ key }) {
    return (event) => {
      const newConfig = structuredClone(config);
      newConfig[key].value = event.target.value;

      setConfig(newConfig);
    };
  }

  function handleStart() {
    let totalTimeInMilliSeconds = 0;

    OrderOfTime.forEach((key) => {
      const data = config[key];

      const value = data.value;
      const factor = data.factor;

      if (value && !isNaN(value)) {
        totalTimeInMilliSeconds += Number(value) * factor;
      }
    });

    // start the timer

    timeSpentRef.current = Date.now() + totalTimeInMilliSeconds

    intervalRef.current = setInterval(() => {
      setTime(() => {
        return timeSpentRef.current - new Date().getTime();
      })
    }, 10)

    // alert(totalTimeInMilliSeconds);
  }

  function handlePause() {
    clearInterval(intervalRef.current)
    intervalRef.current = null;
  }

  function handleReset() {
    clearInterval(intervalRef.current)
    intervalRef.current = null;
    setTime(0);
    timeSpentRef.current = 0;
    setConfig(structuredClone(Config))
  }

  function formatTime(time) {
    const ms = Math.floor((time%1000)/10);
    const mm = Math.floor(time / (60 * 1000) % 60)
    const ss = Math.floor((time / 1000) % 60)
    const hh = Math.floor(time / (60 * 60 * 1000));

    return `${hh}: ${mm}: ${ss}: ${ms}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

        {/* Inputs */}
        <div className="flex gap-4 justify-center mb-6">
          {OrderOfTime.map((orderKey, index) => {
            const data = config[orderKey];
            return (
              <div key={index}>
                <input
                  onChange={handleChange({ key: orderKey, index })}
                  type="text"
                  list={`${orderKey}-datalist`}
                  value={data.value || ""}
                  placeholder={data.placeholder}
                  className="w-20 text-center px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <datalist id={`${orderKey}-datalist`}>
                  <option value="5" />
                  <option value="10" />
                  <option value="15" />
                  <option value="25" />
                  <option value="35" />
                </datalist>
              </div>
            );
          })}
        </div>

        {formatTime(time)}

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleStart}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            Start
          </button>

          <button
            onClick={handlePause}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
          >
            Pause
          </button>

          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;