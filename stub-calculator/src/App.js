import './App.css';
import { useForm } from 'react-hook-form';


function App() {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    } 
  } = useForm();
  const onSubmit = data => console.log(data)

  return (
    <div className="container">
      <div className='row'>


      <div className='column'>
        <div className ="left-half">
          <h1>Stub Calculator</h1>
          <p>Fill out the form below and we will calculate your paystub!</p>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className = "input-label">Hours Worked</p>
            <input 
              className='input'
              type='number'
              step=".1"
              placeholder="i.e. 13.5, 40.6, etc."
              {...register("hours", {
                required: true,
              })}
            />
              {errors.hours && 
                <span className = "error">
                  {errors.hours.type === "required" && "This field is required"}
                </span>
              }
            <p className = "input-label">Wage</p>
            <input 
              className='input'
              type='number'
              step=".01"
              placeholder="i.e. 15.50, 20.00, etc."
              {...register("wage", {
                required: true,
              })}
            />
              {errors.wage && 
                <span className = "error">
                  {errors.wage.type === "required" && "This field is required"}
                </span>
              }
            
            <p className = "input-label">Tips</p>
            <input 
              className='input'
              type='number'
              step=".01"
              placeholder="i.e. 13.50, 40.60, etc."
              {...register("tips", {
                required: true,
              })}
            />


              
              <div>
                <input className='submit' type='submit' value='Calculate my paycheck' />

              </div>
          </form>
          
        </div>
      </div>

      <div className = 'column'>
              
      
      </div>


      </div>
    </div>
  );
}

export default App;
