import {useState} from "react";
import { useForm } from "react-hook-form";

export default function Query() {
  const { register, handleSubmit, formState: { errors }, getValues, watch } = useForm();
  const [submitNow, setSubmitNow] = useState(false);
  const [output, setOutput] = useState('');

  const onSubmit = (data) => {
    console.log('howdy')
    console.log(data)
    const requestConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    // After CORS put back the whole resource url
    //fetch('http://localhost:3000/query', requestConfig)
    fetch('https://m2hhpqtg56.execute-api.us-east-1.amazonaws.com/Prod/query', requestConfig)
      .then(response => response.text())
      .then(data => {
        console.log(data);
        setSubmitNow(false);
        setOutput(data);
      });
    setSubmitNow(true);
  }

  return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Sex register={register} errors={errors} watch={watch}/>
          <Age register={register} errors={errors} />
          <ChiefComplaint register={register} errors={errors} />
          <OnsetDate register={register} errors={errors} />
          <PainRating register={register} errors={errors} />
          <Symptoms register={register} errors={errors} />
          <ModifyingFactors register={register} errors={errors} />
          <button type="submit">Submit</button>
        </form>
        {submitNow && <p>Loading</p>}
        <QueryOutput value={output} />
      </div>
  )
  /*<div>
    <QueryInput value={queryValue[]}  type="text" onChange={handleTextChange}/>
    <QueryInput value={queryValue} type="text" onChange={handleTextChange}/>
    <Submit onSubmitClick={handleSubmitClick}/>

  </div>*/
}

function Sex({register, errors, watch}) {
  const currSex = watch('sex')
  return (
      <div>
        <div className="form-input">
          <label>Sex<span className="required">*</span></label>
          <select defaultValue="" {...register('sex', { required: true})}>
            <option value="" disabled>-</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-input">
          {currSex === "other" && <label></label>}
          {currSex === "other" && <input className="extra" {...register('otherSex', { required: true })}></input>}
        </div>
        <div>
          {errors.sex && <p className="error-message">Please select a sex</p>}
        </div>
      </div>
  )
}

function Age({register, errors}) {
  return (
      <div>
        <div className="form-input">
          <label>Age<span className="required">*</span></label>
          <input type="number" {...register('age', { required: true, min: 0, max: 120 })}></input>
        </div>
        <div>
          {errors.age && <p className="error-message">Age must be between 0 and 120</p> }
        </div>
      </div>
  )
}

function ChiefComplaint({register, errors}) {
  return <BasicInput register={register} errors={errors}
                     title="Chief Complaint" name="chiefComplaint"
                     isRequired={true} inputType="text"
                     errorMessage="Please enter a chief complaint" />
  /*return (
      <div>
        <label>Chief Complaint</label>
        <input {...register('chiefComplaint', { required: true })}></input>
      </div>
  )*/
}

function OnsetDate({register, errors}) {
  return <BasicInput register={register} errors={errors}
                     title="Onset Date" name="onsetDate"
                     isRequired={true} inputType="date"
                     errorMessage="Please select an onset date" />
}

function Symptoms({register, errors}) {
  return <BasicTextareaInput register={register} errors={errors}
                             title="Symptoms" name="symptoms"
                             isRequired={true}
                             errorMessage="Please enter symptoms"/>
}

function ModifyingFactors({register, errors}) {
  return <BasicTextareaInput register={register} errors={errors}
                             title="Modifying Factors" name="modifyingFactors"
                             isRequired={false}/>
}

function BasicTextareaInput({register, errors, title, name, isRequired, errorMessage}) {
  return (
      <div>
        <div className="form-input">
          <label>{title}{isRequired && <span className="required">*</span>}</label>
          <textarea {...register(name, { required: isRequired })}/>
        </div>
        <div>
          {errors[name] && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
  )
}

function BasicInput({register, errors, title, name, isRequired, inputType, errorMessage}) {
  return (
      <div>
        <div className="form-input">
          <label>{title}<span className="required">*</span></label>
          <input type={inputType} {...register(name, { required: isRequired })}></input>
        </div>
        <div>
          {errors[name] && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
  )
}

function PainRating({register, errors}) {
  return (
      <div className="form-input">
        <label>Pain Rating</label>
        <select defaultValue="" {...register('painRating')} >
          <option value="" disabled>-</option>
          {[...Array(10).keys()].map((x) =>
              <option value={x + 1} >{x + 1}</option>
          )}
        </select>
      </div>
  )
}

function Submit( {onSubmitClick}) {
  return <button className="submit" onClick={onSubmitClick}>Submit</button>
}

function QueryOutput({ value }) {
  return <p>{value}</p>
}