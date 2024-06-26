import { Form } from "./components/Form"
import { useEffect, useMemo } from "react"
import { ActivitiesList } from "./components/ActivitiesList";
import { CalorieTracker } from "./components/CalorieTracker";
import { useActivity } from "./hooks/useActivity";


function App() {


  const {state, dispatch} = useActivity();

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities]);


  const canResetApp = () => useMemo (() => state.activities.length, [state.activities]);

  return (
    <>
      <header className=" bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold text-white uppercase text-center">
            Calories Counter
          </h1>

          <button className=" bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10" disabled={!canResetApp()} onClick={() => dispatch({type: 'resetApp'})}>
            <span className="text-white">Restart App</span>
          </button>

        </div>
      </header>

      <section className=" bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>
      </section>

      <section className=" bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivitiesList />
      </section>
    </>
  )
}

export default App
