import React,{Component} from 'react'
import {Menu,Input,Modal,Button} from 'antd'
import ReactDom from 'react-dom'
import './app.css'
const SubMenu = Menu.SubMenu;

class Sider extends React.Component {
  state = {
    current: '1',
    openKeys: [],
  }
  handleClick = (e) => {
    console.log('Clicked: ', e);
    this.setState({ current: e.key });
  }
  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }
  render() {
    let recipesitem = this.props.recipesitem
    let keyvalue = this.props.keyvalue
    var items = []
    for (let i=0;i<recipesitem['content'].length;i++){
        items.push(
             <Menu.Item key={keyvalue+recipesitem['content'][i]}>{recipesitem['content'][i]}</Menu.Item>
        )
    }
    console.log(items)
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        style={{ width: 240 }}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
      >
        <SubMenu key={recipesitem['title']} title={recipesitem['title']}>
         {items}
        </SubMenu>
      </Menu>
    );
  }
}


class Box extends Component {
    render(){
        let items = []
        let recipes = this.props.recipes
        for(let i=0;i<recipes.length;i++){
            items.push(<Sider key={`sider${i}`} keyvalue={i} recipesitem={recipes[i]}/>  )
        }
        return (
            <div>
             {items} 
            </div>
        )      
    }
}

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
    this.props.recipes.push({title:input1,content:input2})
    this.setState({  visible: false});
    console.log(this.props.recipes)
    update(this.props.recipes)
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
                <Box recipes={this.state.recipes}/>
                <Dialog recipes={this.state.recipes}></Dialog>
            </div>
        )
    }
}
function update(recipes){


    ReactDom.render(
        <Body/>,
        document.getElementById('root')
    )
}
export default Body
