import { Activity } from "../types"

export type ActivityActions = 
    {type : 'saveActivity',payload : {newActivity : Activity}} | //payload is the data that we want to save
    {type: 'setActiveId', payload: {id: Activity['id']}} |
    {type: 'deleteActivity', payload: {id: Activity['id']}} |
    {type: 'resetApp'}


export type ActivityState = {
    activities : Activity[],
    // name of the state and the type of the state
    activeId : Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities');

    return activities ? JSON.parse(activities) : [];
}

export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}


export const activityReducer = (
    state: ActivityState = initialState, 
    action: ActivityActions) => {

    if(action.type === 'saveActivity'){
        //update the state
      
        let updatedActivities : Activity[] = [];

        if(state.activeId){
            updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: updatedActivities,
            activeId: '' //reset the activeId
        }
    }

    if(action.type === 'setActiveId'){
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'deleteActivity'){
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if(action.type === 'resetApp'){
        return {
            activities: [],
            activeId: ''
        }
    }

    return state;
}