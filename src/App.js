import React, { useState } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [stubData, setStubData] = useState(null);
  const [totalPay, setTotalPay] = useState(0);
  const [stateIncome, setStateIncome] = useState(0);
  const [stateDisability, setStateDisability] = useState(0);
  const [federalIncome, setFederalIncome] = useState(0);
  const [medicare, setMedicare] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [netPay, setNetPay] = useState(0);
  const onSubmit = (data) => {
    console.log(data);

    // Calculate pay and taxes
    const calculatedTotalPay = parseFloat(data.hours) * parseFloat(data.wage) + parseFloat(data.tips);
    const calcStateDisability = calculatedTotalPay * 0.009;
    const calcMedicare = calculatedTotalPay * .0145;
    const calcSocial = calculatedTotalPay * .062;
    const estimated = calculatedTotalPay * data.occurence
    let calcStateIncome = 0;
    let calcFederalIncome = 0;
    if (estimated < 10099) {
      calcStateIncome = 0.01 * calculatedTotalPay;
    }else if (estimated < 23942){
      calcStateIncome = 100.99 + (estimated - 10099) * 0.02;
    }else if (estimated < 37788){
      calcStateIncome = 377.85 + (estimated - 23942) * 0.04;
    }else if (estimated < 52455){
      calcStateIncome = 931.69 + (estimated - 37788) * 0.06;
    }else if (estimated < 66295){
      calcStateIncome = 1811.71 + (estimated - 52455) * 0.08;
    }else if (estimated < 338369){
      calcStateIncome = 2918.91 + (estimated - 66295) * 0.093;
    }else if (estimated < 406364){
      calcStateIncome = 28246.9 + (estimated - 338369) * 0.103;
    }else if (estimated < 677275){
      calcStateIncome = 35222.58 + (estimated - 406364) * 0.113;
    }else{
      calcStateIncome = 65835.52 + (estimated - 677275) * 0.123;
    }
    if (estimated < 11000) {
      calcFederalIncome = 0.1 * calculatedTotalPay;
    }else if (estimated < 44725){
      calcFederalIncome = 1100 + (estimated - 11000) * 0.12;
    }else if (estimated < 95275){
      calcFederalIncome = 5147 + (estimated - 44725) * 0.22;
    }else if (estimated < 182100){
      calcFederalIncome = 16290 + (estimated - 95275) * 0.24;
    }else if (estimated < 231250){
      calcFederalIncome = 37104 + (estimated - 182100) * 0.32;
    }else if (estimated < 578125){
      calcFederalIncome = 52832 + (estimated - 231250) * 0.35;
    }else {
      calcFederalIncome = 174238.25 + (estimated - 406364) * 0.37;
    }
    
    const calcTotalTax = calcStateDisability + (calcStateIncome/data.occurence) + (calcFederalIncome/data.occurence) + calcMedicare +calcSocial
    const calcNetPay = calculatedTotalPay - calcTotalTax 
    // Update state with stub data and total pay
    setStubData(data);
    setTotalPay(calculatedTotalPay);
    setStateIncome(calcStateIncome/data.occurence);
    setStateDisability(calcStateDisability);
    setFederalIncome(calcFederalIncome/data.occurence);
    setMedicare(calcMedicare);
    setSocialSecurity(calcSocial);
    setTotalTax(calcTotalTax);
    setNetPay(calcNetPay);

  };

  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <div className="left-half">
            <h1>Stub Calculator</h1>
            <p className ="subtext">*assuming you live in California and are filing single</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="input-label">Hours Worked</p>
              <input
                className="input"
                type="number"
                step=".1"
                placeholder="i.e. 13.5, 40.6, etc."
                {...register('hours', {
                  required: true,
                })}
              />
              {errors.hours && (
                <span className="error">{errors.hours.type === 'required' && 'This field is required'}</span>
              )}
              <p className="input-label">Wage</p>
              <input
                className="input"
                type="number"
                step=".01"
                placeholder="i.e. 15.50, 20.00, etc."
                {...register('wage', {
                  required: true,
                })}
              />
              {errors.wage && (
                <span className="error">{errors.wage.type === 'required' && 'This field is required'}</span>
              )}

              <p className="input-label">Tips</p>
              <input
                className="input"
                type="number"
                step=".01"
                placeholder="i.e. 13.50, 40.60, etc."
                {...register('tips', {
                  required: true,
                })}
              />
              <p className="input-label">How often do you get paid a year?</p>
              <input
                className="input"
                type="number"
                step="1"
                placeholder="i.e. 12, 24"
                {...register('occurence', {
                  required: true,
                })}
              />
              {errors.occurence && (
                <span className="error">{errors.occurence.type === 'required' && 'This field is required'}</span>
              )}

              <div>
                <input className="submit" type="submit" value="Calculate my paycheck" />
              </div>
            </form>
          </div>
        </div>

        <div className="column">
          <div className="right-half">
            <h2>View Stub!</h2>
            {stubData && (
              <table>
                <tr>
                  <th>Categories</th>
                  <th>$</th>
                </tr>
                <tr>
                  <td>Total Pay</td>
                  <td>{totalPay.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>CA Income Tax</td>
                  <td>{stateIncome.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>CA Disability Ins.</td>
                  <td>{stateDisability.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Federal Income Tax</td>
                  <td>{federalIncome.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Medicare</td>
                  <td>{medicare.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Social Security</td>
                  <td>{socialSecurity.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Total Taxes</td>
                  <td>{totalTax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Net Pay</td>
                  <td>{netPay.toFixed(2)}</td>
                </tr>

                </table>
            )}
    
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
