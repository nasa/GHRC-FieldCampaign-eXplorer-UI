import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment/moment";
import { JulianDate } from "cesium";

import * as thunk from "../../constants/thunk";
import { Resources, mapStateToProps } from "./redux";
import { bodyForPost, validationCheck, tokenGenerator } from "./helper";

import { mapStateToProps as mapStateToPropsNew, actionDispatchers } from "./redux/wsMessage";

import { WSEndpoint } from "../../config";

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

class SubsettingTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: "",
            end: "",
            validationMessage: ""
        };
    }

    JulainToISO(julianDate) {
        let cJulianDate = JulianDate.clone(julianDate);
        let iso8601Date = JulianDate.toIso8601(cJulianDate);
        return iso8601Date;
    }

    isoToGeroian(date) {
        return moment(date).utc().format('MMMM Do YYYY, h:mm:ss a');
    }

    handleStart = (event) => {
        event.stopPropagation();
        // if text input, take date from text field
        if (event.target.value) {
            this.setState({start: event.target.value})
        }
        // else if button pressed, take date from cesium viewer
        else if (this.props.cesiumViewer.viewer) {
            // get the clock time from cesium, and assign it to start state
            let currentTime = this.JulainToISO(this.props.cesiumViewer.viewer.clock.currentTime);
            let formattedCurrentTime = moment(currentTime).utc().format('YYYY-MM-DD HH:mm:ss') + " UTC";
            this.setState({start: formattedCurrentTime});
        }
    }

    handleStop = (event) => {
        event.stopPropagation();
        // if text input, take date from text field
        if (event.target.value) {
            this.setState({end: event.target.value})
        }
        // if button pressed, take date from cesium viewer
        else if (this.props.cesiumViewer.viewer) {
            // get the clock time from cesium, and assign it to end state
            let currentTime = this.JulainToISO(this.props.cesiumViewer.viewer.clock.currentTime);
            let formattedCurrentTime = moment(currentTime).utc().format('YYYY-MM-DD HH:mm:ss') + " UTC";
            this.setState({end: formattedCurrentTime});
        }
    }

    handleSubmit = (event) => {
        event.stopPropagation();
        const {start, end} = this.state;
        if (!validationCheck(start, end, this.validationMessageSet)) return;
        const { triggerSubsettingTool } = Resources;
        const wsTokenId = tokenGenerator();
        triggerSubsettingTool.body = bodyForPost(start, end, wsTokenId);
        this.handleWebsocketConnection(wsTokenId);
        this.props.Post(triggerSubsettingTool); // Note: updating the redux state, implicitly done, by POST thunk. Cool!
        this.setState({start: "", end: "", validationMessage: ""});
    }

    handleWebsocketConnection = (wsTokenId = "random12345id") => {
        let url = WSEndpoint;
        let webSocket = new WebSocket(url);
        webSocket.onopen = (e) => {
            // set the websocket Token Id; a unique identifier for ws connection.
            let afterConnectMsg = {
                action: "afterconnect", wsTokenId
            }
            webSocket.send(JSON.stringify(afterConnectMsg));
            // webSocket.send(JSON.stringify({"action":"sendmessage", "data":"hello world!!!!!"}))
          };

        webSocket.onmessage = (event) => {
            // use this data to show progress bar for each subsets.
            this.props.updateProgressbar(JSON.parse(event.data));
        };
    }

    validationMessageSet = (message) => {
        this.setState({validationMessage: message})
    }

    render() {
      return (
        <div>
            <div>
                <TextField id="standard-basic" style={{width: "100%"}} label="Start:" value={this.state.start && (this.state.start)} onChange={this.handleStart}/>
                <TextField id="standard-basic" style={{width: "100%"}} label="End:" value={this.state.end && (this.state.end)} onChange={this.handleStop}/>
                <FormHelperText error={true}>{this.state.validationMessage}</FormHelperText>
            </div>
            <div className="center_horizontally_child">
                <ButtonGroup aria-label="small outlined button group">
                    <Button onClick={this.handleStart}>Start</Button>
                    <Button onClick={this.handleStop}>Stop</Button>
                </ButtonGroup>
                <Button variant="outlined" color="primary" onClick={this.handleSubmit}> Submit </Button>
            </div>
        </div>
      )
    }
}
  
export default connect(mapStateToPropsNew, actionDispatchers)(connect(mapStateToProps, {...thunk})(SubsettingTool));
  