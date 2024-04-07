import { Activity } from "../types"
import { categories } from "../database/categories"
import { useMemo, Dispatch } from "react"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"


type ActivitiesListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export const ActivitiesList = ({ activities, dispatch }: ActivitiesListProps) => {

    const categoryName = useMemo(() =>
        (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
        , [activities])

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

    return (
        <>
            <h2 className=' text-4xl font-bold text-slate-600 text-center mb-12'> Food and Activities</h2>

            {

                isEmptyActivities ? 
                <p className='text-center text-lg font-semibold text-slate-500'>No activities yet</p>
                    :
                    activities.map(activity => (
                        <div key={activity.id} className='bg-white shadow p-8 rounded-lg flex justify-between my-5'>
                            <div className="space-y-1 relative ">
                                <p className={`absolute -top-8 -left-8 px-8 py-1 font-bold text-white ${activity.category === 1 ? ' bg-orange-600' : ' bg-blue-400'}`}>
                                    {categoryName(+activity.category)}
                                </p>

                                <h3 className=' font-semibold text-lg  capitalize'>{activity.description}</h3>
                                <p className=' text-xl font-bold  text-slate-500 uppercase'>  {activity.calories} Calories</p>
                            </div>
                            <div className="flex gap-5 items-center">
                                <button onClick={() => dispatch({ type: "setActiveId", payload: { id: activity.id } })}>
                                    <PencilSquareIcon className={`h-6 w-6 ${activity.category === 1 ? ' text-orange-500 hover:text-orange-600' :
                                        ' text-blue-500 hover:text-blue-700'}`} />
                                </button>

                                <button onClick={() => dispatch({ type: "deleteActivity", payload: { id: activity.id } })}>
                                    <XCircleIcon className={`h-6 w-6 text-red-500 hover:text-red-700`} />
                                </button>
                            </div>
                        </div>
                    ))
            }
        </>
    )
}
