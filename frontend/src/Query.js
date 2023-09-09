import {useState} from "react";

export default function Query() {
  const [queryValue, setQueryValue] = useState('');
  const [output, setOutput] = useState('');
  const handleTextChange = (e) => {
    setQueryValue(e.target.value);
  }

  const handleSubmitClick = () => {
    console.log('howdy')
    const requestConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: queryValue })
    };
    // After CORS put back the whole resource url
    fetch('https://m2hhpqtg56.execute-api.us-east-1.amazonaws.com/Prod/query', requestConfig)
      .then(response => response.text())
      .then(data => {
        console.log(data);
        setOutput(data);
      });
  }

  return <div>
    <QueryInput value={queryValue} onChange={handleTextChange}/>
    <Submit onSubmitClick={handleSubmitClick}/>
    <QueryOutput value={output} />
  </div>
}

function QueryInput({value, onChange}) {
  return <label>
    Please enter your query:
    <textarea className="big-text" value={value} onChange={event => onChange(event)} />
  </label>
}

function Submit( {onSubmitClick}) {
  return <button className="submit" onClick={onSubmitClick}>Submit</button>
}

function QueryOutput({ value }) {
  return <p>{value}</p>
}