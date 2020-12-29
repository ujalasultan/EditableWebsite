import React, { Component } from 'react';
import classes from './addblog.module.css';
import TextField from "@material-ui/core/TextField";
import $ from "jquery";

export default class Addblog extends Component {

    state = {
        selectedFile: null
    }

    componentDidMount() {
        $(".custom-file-input").on("change", function () {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let name = document.getElementById('name').value;
        let text = document.getElementById("text").value;
        let more = document.getElementById("more").value;
        let img = this.state.selectedFile;
        const formData = new FormData();
        formData.append('img', img);
        formData.append('name', name);
        formData.append('text', text);
        formData.append('more', more);
        formData.append('featured', true);
        formData.append('id', localStorage.getItem('id'));
        fetch("http://localhost:8080/b1td/addTravelblog", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
            },
            body: formData
        })
            .then(result => {
                if (result.status == 200) {
                    this.props.closeHandler();
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        
        return (
            <form style={{ width: "100%" }} method="POST" onSubmit={this.handleSubmit}>
                <div className={classes.rootCont}>
                    <div className={classes.closeCont}>
                        <h1 style={{ color: "white" }}>!</h1>
                        <h1 className={classes.editorHead}>Add New Blog</h1>
                        <p onClick={this.props.closeHandler} className={classes.close}>X</p>
                    </div>

                    <div className={classes.formField}>
                        <TextField
                            style={{ width: "80%" }}
                            label="Blog Name"
                            id="name"
                            type="text"
                        />
                    </div>

                   

                    <div className={classes.formField}>
                        <TextField
                            style={{ width: "80%" }}
                            label="Blog Description"
                            multiline
                            rows={2}
                            rowsMax={3}
                            id="text"
                            type="text"
                        />
                    </div>
                    <div className={classes.formField}>
                        <TextField
                            style={{ width: "80%" }}
                            label="More detail "
                            multiline
                            rows={2}
                            rowsMax={4}
                            id="more"
                            type="text"
                        />
                    </div>

                    <div className={classes.formField}>
                        <div style={{ width: "80%", marginTop: "20px" }} className="custom-file">
                            <input onChange={(e) => this.setState({ selectedFile: e.target.files[0] })} type="file" className="custom-file-input" id="customFile" />
                            <label className="custom-file-label" htmlFor="customFile">Choose blog Image</label>
                        </div>
                    </div>
                    <button type="submit" className={classes.introButton}>Add</button>
                </div>
            </form >
        );
    }
}