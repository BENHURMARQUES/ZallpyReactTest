import React from "react";
import './App.css';


function App() {

  const initialFormData = Object.freeze({
    username: "",
    password: ""
  });

  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);

   fetch('http://localhost:8080/authenticate',{
        method: 'POST',
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    }).then(function(response){
      if(response.ok){
        return response.json();
      } else {
        alert('Usuario/Senha incorretos');
      }
    }).then(function(myJson) {


      console.log(myJson);

      localStorage.setItem("token", myJson.token);
      localStorage.setItem("usuario", myJson.nome);
      window.location.reload();

    }).catch(error => {
      console.log(error)
    })

  };

  const logado = localStorage.getItem("token");
  if(logado){
      
      return (
        <>
        </>
      );

    } else {
        return (
          <>
          <header>
            <h3 >Projeto Zallpy React.js </h3>
            </header>
            <label>
              Username
              <input name="username" onChange={handleChange} />
            </label>
            <br />
            <label>
              Password
              <input name="password" onChange={handleChange} />
            </label>
            <br />
            <button onClick={handleSubmit}>Submit</button>
          </>
        );
    }
}




export default App;






