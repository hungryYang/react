import React,{Component} from 'react'

const cityCode = 101010100

class Weather extends Component {
    constructor(){
        super(...arguments)

        this.state = {weather:null}
    }
    //一般会在挂载完成之中进行ajax请求
    componentDidMount(){
       const apiUrl = `/data/cityinfo/${cityCode}.html`
        fetch(apiUrl).then((response)=>{
            if(response.status !== 200){
                throw new Error('Fail to get response with status ' + response.status);
            }

            response.json().then((responseJson)=>{
                this.setState({weather:responseJson.weatherinfo})
            }).catch((error)=>{
                this.setState({weather:null})
            })
        }).catch((error)=>{
            this.setState({weather:null})
        })
    }

    render(){
        if(!this.state.weather){
            return <div>正在加载数据</div>
        }

        const {city,weather,temp1,temp2} = this.state.weather

        return (
            <div>
                {city} {weather} 最低气温 {temp1} 最高气温 {temp2}
            </div>                
        )
    }
}

export default Weather