import { useState } from "react";
import { useWorkoutContext } from "../HOOKS/useWorkoutContext";
import React from "react";
import axios from "axios";
import { useAuthContext } from "../HOOKS/useAuthContext";
interface Aworkout {
  title: string;
  load: number | null;
  reps: number;
}

const WorkoutForm = () => {
  const {user} = useAuthContext();
  const { dispatch } = useWorkoutContext();
  const [title, settitle] = useState("");
  const [load, setload] = useState(0);
  const [reps, setreps] = useState(0);
  const [emptyField, setEmptyField] = useState<String | []>([]);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //this prevent from the reload of the page when a user clicks submit button on the form
    const workout: Aworkout = { title, load, reps };
    const storedUser = localStorage.getItem('user');
    const user = storedUser ?JSON.parse(storedUser):null;
    try {
  if(user && user.token){
       axios.defaults.headers.common['Authorization']= `Bearer ${user.token}`; 
      //see the expl... in home
      }
       const response = await axios.post<Aworkout>(
        "http://localhost:8080/api/workouts",
        workout
      );
      console.log("new workouts added", response.data);
      settitle("");
      setload(0);
      setreps(0);
      setError(null);
      setEmptyField([]);
      dispatch({ type: "CREATE_WORKOUT", payload: response.data });
    } catch (err:any) {
      // console.log('umva mwana ufite error');
      setError(err.response?.data?.error);
      //   setEmptyField(json)
    }
  };

  return (
    <div className="create">
      <form action="" onSubmit={handleSubmit}>
        <h3>Add a new Workout</h3>
        <label>Excersize Title</label>
        <input
          type="text"
          onChange={(e) => settitle(e.target.value)}
          value={title}
        />
        <label>Load(in kg)</label>
        <input
          type="number"
          onChange={(e) => setload(Number(e.target.value))}
          value={load}
        />
        <label>Reps</label>
        <input
          type="number"
          onChange={(e) => setreps(Number(e.target.value))}
          value={reps}
        />
        <button>Add workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default WorkoutForm;