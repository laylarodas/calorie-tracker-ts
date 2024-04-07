import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'
import { categories } from '../database/categories'
import { Activity } from '../types'
import { useActivity } from '../hooks/useActivity'


const initialState : Activity = {
    id: uuidv4(),
    category: 1,
    description: '',
    calories: 0
}

export const Form = () => {

    const {state, dispatch} = useActivity();
    const [activity, setActivity] = useState<Activity>(initialState);

    useEffect(() => {

        if(state.activeId){
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]

            setActivity(selectedActivity);
        }
    }
    , [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        
        const isNumberField = ['calories', 'category'].includes(e.target.id); // Check if the field is a number field

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { description, calories } = activity;
        return description.trim() !== '' && calories > 0;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({type: 'saveActivity', payload : { newActivity: activity}});

        setActivity({
            ...initialState,
            id: uuidv4()
        });
    }

    return (
        <form action="" onSubmit={handleSubmit} className=' space-y-5 bg-white shadow p-10 rounded-lg'>
            <div className='grid grid-cols-1 gap-3'>
                <label htmlFor="category" className=' font-bold'>Category:</label>
                <select name="" id="category" value={activity.category} onChange={handleChange} className=' border border-slate-300 rounded-lg w-full bg-white p-2 '>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

            </div>
            <div className='grid grid-cols-1 gap-3'>
                <label htmlFor="description" className=' font-bold'>Description:</label>
                <input type="text" id='description' value={activity.description} onChange={handleChange} className=' border border-slate-300 rounded-lg w-full bg-white p-2' placeholder='Ex. Food: Fruit, Juice, Salad. Exercise: Weight, Spinning, Running' />
            </div>
            <div className='grid grid-cols-1 gap-3'>
                <label htmlFor="calories" className=' font-bold'>Calories:</label>
                <input type="number" id='calories' value={activity.calories} onChange={handleChange} className=' border border-slate-300 rounded-lg w-full bg-white p-2' placeholder='Ex. 100' />
            </div>

            <input type='submit' className=' bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white rounded-lg cursor-pointer disabled:opacity-30' value={activity.category === 1 ? 'Save Food' : 'Save Exercise'} disabled={!isValidActivity()}/>

        </form>
    )
}
