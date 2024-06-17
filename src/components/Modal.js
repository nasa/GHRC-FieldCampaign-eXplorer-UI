import React,{useState} from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom'
//import {Background} from './FilteredData'
//import ReactPlayer from 'react-player';
//import geoJson from '../components/common/mb-map-explore/chicago-parks2.json';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import geoJson from '../data/chicago-parks2.json'
import ReactPlayer from 'react-player';

const ModalBackground = styled.div`
width: 95vw;
height: 95vh;
background-color: rgba(200, 200, 200,0.6);
position: relative;
display: flex;
justify-content: center;
align-items: center;
z-index:999;
border-radius: 12px;
bottom:90vh;
`
const Button = styled.button`
position:absolute;
z-index:10000;
top:1rem;
right:1rem;
padding:5px;
cursor:pointer;
background-color: Transparent;
background-repeat:no-repeat;
border: none;
font-weight:bold;
`
const Backward = styled.button`
position:absolute;
z-index:10000;
left:0.5rem;
cursor:pointer;
height:75px;
width:75px;
font-weight:bold;
border:1px solid;
font-size: 40px;

background-color: transparent;
background-repeat:no-repeat;
border: none;
font-weight:bold;
dispaly:flex;
justify-content:center;
align-items:center;
text-align:center;
`
const Forward = styled.button`
position:absolute;
z-index:10000;
right:0.5rem;
cursor:pointer;
height:75px;
width:75px;
font-weight:bold;
border:1px solid;
font-size: 40px;

background-color: transparent;
background-repeat:no-repeat;
border: none;
font-weight:bold;
dispaly:flex;
justify-content:center;
align-items:center;
text-align:center;
`

const ImageContainer = styled.div`
background-image:url(${(props)=>props.background})
// background-repeat: no-repeat;
`

const Modal = (props) =>{
    let id = props.id.split('-')[1]
    const [index, setIndex] = useState(id)
    const [modal, setModal] = useState(true); 

    const backwardHandler = () =>{
        if(index === 0){
            setIndex(geoJson.fieldCampaignImages.length - 1)
        }else{
            setIndex(index - 1)
        }
    }
    
    const forwardHandler = () =>{
        if(index === geoJson.fieldCampaignImages.length - 1){
            setIndex(0)
        }else{
            setIndex(index + 1)
        }

    }

    let portal = document.getElementById('portal')
    if (!portal) {
        portal = document.createElement('div')
        portal.setAttribute('id', 'portal')
        document.body.appendChild(portal)
    }

    return ReactDOM.createPortal(
        <div style={{position:"fixed", width: "100vw", height: "100vh", zIndex: "2000", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", borderRadius: "12px"}}>
            {modal && <ModalBackground>
                <Button title="Close" onClick={()=>setModal(false)}>
                    &#9587;
                </Button>
                {geoJson.fieldCampaignImages[index].type === 'image' &&
                <div style={{backgroundImage:'url('+geoJson.fieldCampaignImages[index].imageURL+')', backgroundRepeat:'no-repeat', borderRadius:'15px', justifyContent:'center', alignItems:'center', maxHeight:'90%', maxWidth:'90%'}}>
                    <img src={geoJson.fieldCampaignImages[index].imageURL} style={{visibility:'hidden', maxHeight:'90%', maxWidth:'90%'}}/>
                </div>
                }
                {geoJson.fieldCampaignImages[index].type === 'video' &&
                <div style={{justifyContent:'center', alignItems:'center', maxHeight:'100%', maxWidth:'100%'}}>
                    <ReactPlayer url={geoJson.fieldCampaignImages[index].imageURL} controls />
                </div>                    
                }                
                <Backward onClick={backwardHandler} title="Previous">&#8249;</Backward>
                <Forward onClick={forwardHandler} title="Next">&#8250;</Forward>
            </ModalBackground>}        
        </div>,
        portal
    )
}

export default Modal