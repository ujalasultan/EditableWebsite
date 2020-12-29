import React, { Component } from 'react';
import classes from './research.module.css';
import SideEditor from '../SideEditor/SideEditor';
import Footertravel from '../travelBlog/footertravel/Footertravel';
import Editor from "../backdrop/Editor";
import Addblog from './addnewblg/Addblog';
import Updateblog from './updateblog/Updateblog';
import { TextareaAutosize } from '@material-ui/core';

export default class Aboutme extends Component {
    state = {
        Atext1Editor: false,
        i: null,
        research:[],
        imgs: [],
        showEditor: false,
        showAdd: false ,
        updateblog:false,

        Atext1: {
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure Lorem ipsum dolor sit amet, consectetur adipisicing elit, incididunt ut labore et dolore magna aliqua accusantium doloremque laudantium.Class aptent taciti sociosqu ad litora torquent per conubia nostra Inceptos himenaeos mauris.Integer gravida ",
            fontSize: 25,
            fontFamily: "Josefin Sans",
            fontColor: "black"
          },
        }
        editorHandler = () => {
              this.setState({ showEditor: false });
            }
        addHandler = () =>{ 
          this.setState({ showAdd : false });
        }
        closeHandler = () =>{ 
          this.setState({ showAdd : false });
          this.setState({ updateblog : false });

        }
        AddBlog =() =>{
          this.setState({ showAdd :true});
        }

        UpdateBlog =() =>{
          this.setState({ updateblog :true });
        }
        updateHandler = () =>{ 
          this.setState({ updateblog : false });
        }
          
          
        Atext1Editor = () => {
              this.setState({
                Atext1Editor: true,
                showEditor: true
              });
            }
 
    changeUpdate = (newName, name ,desc) => {   
      this.setState({
      Atext1: {
        text: newName,
        name : name,
        desc:desc
      }
    });}
    closeResearch =(i) =>{
     delete this.state.research[i];
    }
    
              
              _isMounted = false;
              async componentDidMount() {
                this._isMounted = true;
    
                await fetch("http://localhost:8080/b1td/getBlogimages", {
                  
                  method: "GET",
                  headers: {
                      "Content-Type": 'application/json'
                  },
              })
                  .then(result => {
                      return result.json();
                  }).then(resultData => {
                      if (this._isMounted) {
                          this.setState({
                              imgs: resultData.imgs
                          });
                      }
                  })
                  .catch(err => {
                      console.log(err);
                  })
    
                  fetch("http://localhost:8080/b1td/getTravelData" , {
                  method: "GET",
                  headers: {
                  "Content-Type": 'application/json'
                },}).then(result => {
                    return result.json();
                  }).then(resultData => {
                    if (this._isMounted) {
                      this.setState({
                      research :resultData.data.research,
                    });
                  }
                })
                .catch(err => {
                  console.log(err);
                })
            }
            componentWillUnmount() {
                this._isMounted = false;
            }
    
    render() {
      
      let displayBlogtravel= this.state.research.reverse().map((blog,i) =>{
        var img=this.state.imgs.reverse();
        return (
          <div className={classes.aboutcol1} key={i}>
           <img className={classes.img} src={'data:image/jpg;base64,' + img[i]} />&nbsp;&nbsp;&nbsp;&nbsp;
          <div className={classes.aboutmetext}>
            <p 
            className={classes.close}
            onClick={()=> {this.closeResearch(i ) ; this.setState({ i:i }) } }
            > x </p>
            <p className={classes.other}  onClick={()=> {this.UpdateBlog() ; this.setState({ i:i }) } } > {blog.text}</p>
            <p className={classes.other}  onClick={()=> {this.UpdateBlog() ; this.setState({ i:i }) } }> {blog.more}</p>
          </div></div>
        )
      
       })
        let textEditor = <SideEditor editorHandler={this.editorHandler} />
        let updateEditor = <Updateblog updateHandler={this.updateHandler} />

        
        if (this.state.Atext1Editor === true) {
              updateEditor = <Updateblog  closeHandler={() => { this.setState({ updateblog: false }) }} changeHandler={(newName,name) => this.changeAtext1(newName,  name)} data={this.changeAtext1}/>
            }
        if (this.state.showEditor === false) {
                textEditor = null;
          }
          if (this.state.showAdd === true ) {
            textEditor = <Editor closeHandler={() => { this.setState({ showAdd: false }) }}/>
      }
    return (
        <div className={classes.rootCont}>
          <Editor fullsize={true} enableBackdropEditor={this.state.showAdd} backdropHandler={this.toggleAddProduct} >
            <Addblog addHandler={() => this.AddBlog()} closeHandler={this.addHandler} />
          </Editor>
          <Editor fullsize={true} enableBackdropEditor={this.state.updateblog} backdropHandler={this.toggleAddProduct} >
            <Updateblog closeHandler={() => { this.setState({ updateblog: false }) }} changeHandler={(newName,name,desc ) => this.changeUpdate(newName,  name,desc )} data={this.state.research[this.state.i] }/>
            
          </Editor>
             <div> {textEditor} </div>
             <div className={this.state.showEditor ? classes.spacer : ''} />
             <div className={classes.content} style={this.state.showEditor ? { width: "65%" } : { width: "100%" }}>
           
            <p className={classes.aboutcol}>RESEARCHES</p>
            <div className={classes.ha2}>
              <p className={classes.home}>Home</p>
              <p className={classes.link}>/Researches</p>
            </div>
            <div className={classes.researches}> 
            {displayBlogtravel}
            </div>
            <img onClick={this.AddBlog} style={{ height:'100px', marginLeft:'45%'}}src="/img/addImage.png"/>          
        <Footertravel/>
        </div>
        </div>

);}}