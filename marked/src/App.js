import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import marked from 'marked'
class Test extends Component {
  render() {
    return <textarea 
    onChange={this.changeTitle.bind(this)} 
    value = {this.props.content}/>
  }
  changeTitle(e){
    this.props.onChange(e)
  }
}
class App extends Component {
  constructor(){
    super()
    this.state = {
      value:`# 一个react的简易markdown
      
练练手,没啥多余作用
      `
    }
  }
  render(){
    return (
      <div id='marked'>
        <div>
           <Test content={this.state.value}  onChange={this.changeTitle.bind(this)}/>
        </div>
        <div>
           <span dangerouslySetInnerHTML={this.rawMarkup(this.state.value)} />
        </div>
      </div>
    )
  }
  rawMarkup(value){
    var rawMarkup = marked(value, {sanitize: true});
    return { __html: rawMarkup };
  }
  changeTitle(e){
    this.setState({
      value:e.target.value
    })
  }
}

export default App;
