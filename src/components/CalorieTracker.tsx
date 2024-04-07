import { useMemo } from 'react'
import type { Activity } from '../types'
import { CalorieDisplay } from './CalorieDisplay'


type CalorieTrackerProps = {
    activities: Activity[]
}

export const CalorieTracker = ({ activities }: CalorieTrackerProps) => {

    //counters

    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities]);

    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities]);

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities]);

    return (
        <>
            <h2 className="text-4xl font-bold text-white text-center">Calorie summary</h2>

            <div className='flex flex-col items-center md:flex-row md:justify-around gap-5 mt-10'>
                <CalorieDisplay calories={caloriesConsumed} text='Consumed' />

                <CalorieDisplay calories={caloriesBurned} text='Exercise' />

                <CalorieDisplay calories={netCalories} text='Difference' />

                
            </div>

        </>
    )
}
