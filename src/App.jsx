import { Component } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
let jsonData = [{
  id: 0,
  content: "Дата",
}
]
let idSave=0

class ListView extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitx = this.handleSubmitx.bind(this);
    this.state = {flag:''}
  }

  handleSubmitx(event) {
    //функция удаления с сервера по id
    async function fdelete(id) {
      let res = await fetch('http://localhost:7070/notes/'+id,{method: 'DELETE',});  
    }

    for (let i = jsonData.length; i--; ) {
      if (jsonData[i].content === event.target.getElementsByTagName('textarea')[0].value){
        //Удаление fetch DELETE 
        fdelete(jsonData[i].id)
        jsonData.splice(i, 1)
      }
    }
    this.setState({flag: 5});
    event.preventDefault();
  }


  render() {
    return (
      <> 
        {jsonData.map(product => ( 
          <form className="out"  onSubmit={this.handleSubmitx}>         
            <textarea  rows={5} cols={75} value={product.content} />
            <input  className="buttonx" type="submit" value="X" />
          </form>
        ))}
      </>
   );
  }
} 

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {valfirst: '', flag:''};
    this.handleChangeFirst = this.handleChangeFirst.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitxx = this.handleSubmitxx.bind(this)
  }
  handleSubmitxx(event){
    //обновление/загрузка записей с сервера 
    async function fread() {
      let response = await fetch('http://localhost:7070/notes');
      jsonData == JSON.parse(response.json);
    }
    fread()
    this.setState({flag: 5});
    event.preventDefault();

  }


  handleChangeFirst(event) {
    this.setState({valfirst: event.target.value});
  }

  handleSubmit(event) {
    //добавление новой заметки fetch POST 
    async function f(idV,contentV) {
      let user = {
        id: idV,
        content: contentV
      };
      let response = await fetch('http://localhost:7070/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });
    }
    // f(this.state.valsecond,this.state.valfirst); 
    idSave=idSave+1
    f(idSave,this.state.valfirst);   
    jsonData.push({id:idSave,content:this.state.valfirst});

    this.setState({flag: 5});
    event.preventDefault();
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmitxx}> 
          <input className="buttonxx" type="submit" value="обновить" />
        </form> 
        <form onSubmit={this.handleSubmit}>
          <label className="first">
            New Note:
            <br />
            <textarea type="text" cols={75} rows={5} value={this.state.valfirst} onChange={this.handleChangeFirst} />
          </label>
          <br />
          <br />     
          <input className="button" type="submit" value=">>" />
        </form>
        <ListView />
      </>
    );
  }
}

export default NameForm 