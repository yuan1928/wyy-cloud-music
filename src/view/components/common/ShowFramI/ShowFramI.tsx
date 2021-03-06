import React from "react";
import 'antd/dist/antd.css'
import {PlayCircleOutlined,UserOutlined} from '@ant-design/icons'
import {withRouter} from "react-router";

class ShowFramI extends React.Component<any, any>{
    click=(id:number)=>{
        this.props.history.push("/song-list/"+id)
    }

    render() {
        return (
            <div className={this.props.className} key={this.props.item.id} onClick={()=>{this.click(this.props.item.id)}} style={{marginBottom:"20px"}}>
                <img style={{width:"100%",objectFit:"cover",top:0,borderRadius:"5px",cursor:"pointer"}} src={this.props.item.imgUrl} alt=""/>
                <div style={{textAlign:"start"}}>
                    {this.props.item.title}
                </div>
                {
                    this.props.item.size!==undefined?
                        <div style={{textAlign:"start",color:'rgba(0,0,0,0.4)'}}>
                            {this.props.item.size}首
                        </div>:null
                }
                <div style={{position:"absolute",top:'5px',right:"5px",color:"white"}}>
                    {(this.props.item.playCount!==undefined && this.props.item.playCount>=10000)?
                        (Math.ceil(this.props.item.playCount/10000)+"万"):null}
                    {(this.props.item.playCount!==undefined && this.props.item.playCount<10000)? (this.props.item.playCount):null}
                    {(this.props.item.playCount!==undefined)?<PlayCircleOutlined/> :null}
                </div>
                <div style={{position:"absolute",bottom:'86px',left:"25px",color:"white"}}>
                    {(this.props.item.author!==undefined)?<UserOutlined/>:null}
                    {(this.props.item.author!==undefined)?(this.props.item.author):null}
                </div>
            </div>
        )
    }
}

export default withRouter(ShowFramI)