import React, { Component }  from "react";
import axios from 'axios';
import Modal  from './Modal.js'

const logado = localStorage.getItem("token");

class Projetos extends Component {

    constructor() {
        super();
        this.state = {
          show: false,
          staProje: [],
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
      }
    
      showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ show: false });
      };
   

    
      async componentDidMount() {
        const response = await axios.get('http://localhost:8080/projetos/listar',{
            headers: {
              authorization: 'Bearer ' + logado
            }
          });

    
        this.setState({ staProje: response.data });
      }

      render() {

        const { staProje } = this.state;
    
        if(logado){

        return (
            <>
            <header>
               <h3 >Lista Projetos Zallpy React.js </h3>
              </header>

              <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Modal</p>
        </Modal>
              <button type="button" onClick={this.showModal}>Open</button>

            <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome do Projeto</th>
                        <th>Total Horas</th>
                    </tr>
                </thead>

                <tbody>
                    {staProje.map((projeto, index) => (

                        <tr data-index={index} key={index}>
                            <td>{projeto.idProjeto}</td>
                            <td>{projeto.nome}</td>
                            <td>{projeto.horas}</td>
                        </tr>

                    ))}
                </tbody>
                    
                </table>
            </div>
            </>
          
              );
            } else {
                return (
                    <>
                    </>
                )
            }
        }
    
}

export default Projetos;

/*

function projetos() {

    if(logado){

     fetch('http://localhost:8080/projetos/listar',{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + logado,
            }
            }).then( (response) => {
             var promo = Promise.resolve( response.json());
             promo.then(function(value) {
                 return JSON.stringify(value);
             }).then( function(json){
                 console.log(json);
                 lista = json;
             })
           })
        

       console.log(lista);


        return (
            <>
            <header>
               <h3 >Lista Projetos Zallpy React.js </h3>
              </header>

            <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome do Projeto</th>
                        <th>Total Horas</th>
                    </tr>
                </thead>

                <tbody>
                    {lista.map((projeto, index) => (

                        <tr data-index={index} key={index}>
                            <td>{projeto.idProjeto}</td>
                            <td>{projeto.nome}</td>
                            <td>{projeto.horas}</td>
                        </tr>

                    ))}
                </tbody>
                    
                </table>
            </div>


            </>
          );
    } else {
        return (
            <>
            </>
        );
    }

}

export default projetos;*/