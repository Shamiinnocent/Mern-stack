import  {FC,useEffect} from "react"
import { useWorkoutContext } from "../HOOKS/useWorkoutContext";
import axios from "axios";
//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";



interface Workout{
    _id?:any,
    title:string,
    reps:number;
    load:number;  
    createdAt?:Date;   
    updatedAt?:Date
}


const WorkOutDetails:FC<Workout> = ({_id,title,reps,load,createdAt}) =>{
    const { dispatch } = useWorkoutContext();

    // const handledelete = async()=>{
    //     axios.delete("http://localhost:8080/api/workouts"+workout._id) 
    //     }
//     const handledelete = async()=>{
//         const response = await fetch('/api/workouts/'+_id,{
//             method:'DELETE'
//         })
//         const json = await response.json()
// if(response.ok){
//     dispatch({type:'DELETE_WORKOUT',payload:json})
// }
// }       
const handledelete = async () =>{
    try{
        const response =await axios.delete(`http://localhost:8080/api/workouts/${_id}`);
        if(response.status === 200){
            console.log(response)
            dispatch({type:'DELETE_WORKOUT',payload:response.data});
        }
        window.location.reload();//this reloads the page after the delete functionhave been successfull
    }
    catch(error){
        console.log(error)
    }
}




return <div className="box">
    <h4>{title}</h4>
    <p><strong>load(kg) :</strong>{load}</p>
    <p><strong>Reps  :</strong>{reps}</p>
    {/* <p>{createdAt?.toString()}</p> */}
    <p>{createdAt && formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
   <button><span onClick={handledelete}>delete</span> </button>
</div>
}

export default WorkOutDetails