import React from 'react'

class Welcome extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            date:new Date()
        }
        setInterval(()=>{
            this.setState({
                date : new Date()
            })
        },1000)

        console.log('我已经在 constructor 里将 props 和 state 初始化好了')  
    }
    render(){
        console.log('嗯，这里是 render')
        return(
             <div>
                <h1>Hello,{this.props.name}</h1>
                <h2>{this.state.date.toString()}</h2>
            </div>
        )
           
    }
    componentDidMount(){
        console.log('已经挂载到页面里了')
    }
}


export default Welcome