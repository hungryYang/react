import React,{Component} from 'react'
import {Menu,Input,Modal,Button} from 'antd'
import ReactDom from 'react-dom'
import './app.css'
const SubMenu = Menu.SubMenu;

class Box extends Component {
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
      let recipes = this.props.recipes
      return (
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          selectedKeys={[this.state.current]}
          style={{ width: 240 }}
          onOpenChange={this.onOpenChange}
          onClick={this.handleClick}
        >
          {
            recipes.map(function(item,index){
              let menuItem = []
              for(var i=0;i<item.content.length;i++){
                menuItem.push(
                  <Menu.Item key={i+item['content'][i]}>{item['content'][i]}</Menu.Item>
                ) 
              }
              return <SubMenu  key={`${item}${index}`} title={<span>{item.title}</span>}>
              {menuItem}
              </SubMenu>
            })
          }
        </Menu>
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
    let input1 = document.getElementById('input1').value
    let input2 = document.getElementById('input2').value.split(',')
    let recipes = this.props.recipes
    let newList = {title:input1,content:input2}
    let flag = true
    if(recipes.length===0){
      this.props.recipes.push(newList)
      this.setState({  
        visible: false,
      });
      update(this.props.recipes)
      return;
    }else{
      for(let i=0;i<recipes.length;i++){
        if(recipes[i].title === input1){
          Object.assign(this.props.recipes[i],newList)
          flag = false
          break;
        }
      }
    }
    if(flag)
      this.props.recipes.push({title:input1,content:input2})
    this.setState({  
      visible: false,
    });
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
                <Dialog recipes={this.state.recipes} ></Dialog>
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
