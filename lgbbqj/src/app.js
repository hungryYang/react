import React,{Component} from 'react'
import {Input,Modal,Button} from 'antd'

import './app.css'


class Dialog extends Component {
  state = {
    loading: false,
    visible: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  add = () => {
    var input1 = document.getElementById('input1').value
    var input2 = document.getElementById('input2').value.split(',')
    console.log(input1,input2)
    this.props.recipes.push({title:input1,content:input2})
    this.setState({  visible: false});
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
            Add Recipe
        </Button>
        <Modal
            visible={this.state.visible}
            title="Add a Recipe"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.add}>
                    Add Recipe
                </Button>,
                <Button key="back" size="large" onClick={this.handleCancel}>Close</Button>,
            ]}
        >
            <div>
                <h3>Recipe</h3>
                <Input id='input1' type="textarea" placeholder="Recipe Name" autosize />
                <h3>Ingredients</h3>
                <Input id='input2' type="textarea" placeholder="Enter Ingredients,Separated,By Commas" autosize={{ minRows: 2, maxRows: 6 }} />
            </div>
        </Modal>
      </div>
    );
  }
}

class Body extends Component {
    constructor(){
        super()
        this.state = {
            recipes:[]
        }
    }
    render(){
        return (
            <div>
                <Dialog recipes={this.state.recipes}></Dialog>
            </div>
        )
    }
}

export default Body
