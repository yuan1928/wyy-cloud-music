import React from "react";
import {getOfficialRanks,getRankInfo} from "../../../../../apis/rankPage";
import OfficialRankList from "./OfficialRankList/OfficialRankList";
import ShowFramI from "../../../common/ShowFramI/ShowFramI";
import './RankPage.css'
import MenuBar from "../MenuBar/MenuBar";

interface Song{
    title:string,
    alias:string,
    singer:string,
    id:number
}
interface Official{
    name:string,
    id:number,
    cover:string,
    songs:Song[]
}
interface Global{
    title:string,
    id:number,
    imgUrl:string,
    description:string,
    playCount:number
}

interface State{
    officialRankID:number[],
    globalRankID:number[],
    officialRank:Official[],
    globalRank:Global[],
    timer:any
}
class RankPage extends React.Component<any, any>{
    state:State={
        officialRankID:[],
        globalRankID:[],
        officialRank:[],
        globalRank:[],
        timer:null
    }
    componentDidMount() {
        this.getInfo()
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
    }

    getInfo=()=>{
        getOfficialRanks().then(res=>{
            let cur
            for(let rank of res.data.list)
            {
                cur=rank.name
                if(cur==="飙升榜" || cur==="新歌榜" || cur==="原创榜" || cur==="热歌榜")
                {this.state.officialRankID.push(rank.id)}
                else
                {this.state.globalRankID.push(rank.id)}
            }
        }).then(()=>{
            for(let id of this.state.officialRankID){this.getOfficialRank(id)}
            for(let id of this.state.globalRankID){this.getGlobalRank(id)}
            this.forceUpdate()
        })
    }

    getOfficialRank=(id:number)=>{
        getRankInfo(id).then(res=>{
            this.state.officialRank.push({
                name:res.data.playlist.name,
                id:res.data.playlist.id,
                cover:res.data.playlist.coverImgUrl,
                songs:res.data.playlist.tracks.slice(0,5).map((item:any)=>({
                    title:item.name,
                    alias:(item.alia[0]!==undefined)?item.alia[0]:"",
                    singer:item.ar[0].name,
                    id:item.id//不确定是item.id还是item.al.id
                }))
            })
            this.forceUpdate()
        })
    }

    getGlobalRank=(id:number)=>{
        getRankInfo(id).then(res=>{
            const data=res.data.playlist
            this.state.globalRank.push({
                title:data.name,
                id:data.id,
                imgUrl:data.coverImgUrl,
                description:data.description,
                playCount:data.playCount
            })
            this.forceUpdate()
        })
    }


    render() {
        return (
            <div
                style={{width:"100%", height:"80vh", display:"flex",flexWrap:"wrap",
                    justifyContent:"center",position:"relative",overflowY:"scroll"}}>

                <div style={{width:"100%",marginBottom:'10px'}}>
                    <MenuBar current="4"/>
                </div>

                <div  style={{fontSize:"20px", fontWeight:"bolder", width:"100%", display:"flex",padding:'20px'}}>官方榜</div>

                {this.state.officialRank.map(item=>(
                    <div style={{width:"100%",margin:"20px 0 20px 0",padding:'20px'}}>
                        <OfficialRankList rank={item}/>
                    </div>
                ))}

                <div  style={{fontSize:"20px", fontWeight:"bolder", width:"100%", display:"flex",padding:'20px'}}>全球榜</div>

                <div style={{width:"100%", display:"flex", flexWrap:"wrap",padding:'20px'}}>
                    {this.state.globalRank.map(item=>(
                        <div className="rankListPageSongListItem">
                            <ShowFramI
                                item={item}
                                titlePos="220px"
                            />
                        </div>
                    ))}
                </div>


            </div>
        )
    }
}

export default RankPage