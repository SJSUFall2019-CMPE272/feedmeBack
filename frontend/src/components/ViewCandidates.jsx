import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import NavBar from "./leftbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Route } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import ListGroup from "react-bootstrap/ListGroup";

class ViewCandidates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pname: "",
      desc: "",
      skills: "",
      jobid: "",
      candidates: [],
      completed: [],
      pending: []
    };
  }
  componentDidMount() {
    const { result } = this.props.location.state;
    console.log("passed value is ", result);
    let currentComponent = this;
    currentComponent.setState({
      pname: result.pname,
      desc: result.desc,
      skills: result.skills,
      jobid: result.jobid
    });
    let jobid = result.jobid;
    let data = {
      jobid: jobid
    };
    //console.log("jobid is ", jobid);
    let url = "http://localhost:5000/getCandidateDetails";
    /* axios
      .get(url, data)
      .then(response => {
        console.log("response is..........", response.data);
        this.setState({
          candidates: this.state.candidates.concat(response.data.candidates)
        });
        let candidates = response.data.candidates;
        let completed = [];
        let pending = [];
        let l = candidates.length;
        for (let i = 0; i < l; i++) {
          if (candidates[i].status == "completed") {
            completed.push(candidates[i]);
          } else {
            pending.push(candidates[i]);
          }
        }
        this.setState({
          completed: this.state.completed.concat(completed),
          pending: this.state.pending.concat(pending)
        });
      })
      .catch(err => console.log(err));*/
    let response = {
      candidates: [
        {
          email: "kanika.khanna@gmail.com",
          name: "Kanika Khanna",
          status: "completed"
        },
        {
          email: "bansari.tailor@sjsu.edu",
          name: "Bansari Tailor",
          status: "completed"
        },
        {
          email: "vishishtha.soni@sjsu.edu",
          name: "Vishishtha Soni",
          status: "awaited"
        },
        {
          email: "sruthi.duvvuri@sjsu.edu",
          name: "Sruthi Duvvuri",
          status: "pending"
        },
        {
          email: "pushpak.venkat@sjsu.edu",
          name: "Venkat Pushpak",
          status: "scheduled"
        }
      ]
    };
    this.setState({
      candidates: this.state.candidates.concat(response.candidates)
    });
    let candidates = response.candidates;
    //console.log("candidates are: ", candidates);
    let completed = [];
    let pending = [];
    let l = candidates.length;
    //console.log("length is ", l);
    for (let i = 0; i < l; i++) {
      if (candidates[i].status == "completed") {
        completed.push(candidates[i]);
      } else {
        pending.push(candidates[i]);
      }
    }
    this.setState({
      completed: this.state.completed.concat(completed),
      pending: this.state.pending.concat(pending)
    });
    //console.log("completed are ", completed);
    //console.log("pending are ", pending);
  }

  render() {
    /* let completed = [];
    let pending = [];
    completed = this.state.completed;
    pending = this.state.pending;
    console.log("completed are ", completed);
    console.log("pending are ", pending);*/
    let details_completed = this.state.completed.map(completed => {
      return (
        <Table bordered>
          <tr>
            <td width="40%">{completed.name}</td>
            <td width="40%">{completed.email}</td>
            <td width="40%">Link for report</td>
          </tr>
        </Table>
      );
    });
    let details_pending = this.state.pending.map(pending => {
      return (
        <Table bordered>
          <tr>
            <td width="50%">{pending.name}</td>
            <td width="50%">{pending.email}</td>
          </tr>
        </Table>
      );
    });
    let redirectVar = null;
    /* if (localStorage.getItem("name") == null) {
          redirectVar = <Redirect to="/" />;
        }*/
    return (
      <div>
        {" "}
        {redirectVar}
        <NavBar />
        <br />
        <br />
        <br />
        <br />
        <Table borderless>
          <tr>
            <td>
              <ListGroup variant="flush" style={group}>
                <ListGroup.Item action href="./homeAdmin">
                  <p style={para}> Home </p>
                </ListGroup.Item>
                <ListGroup.Item action href="./scheduleInterview">
                  <p style={para}> Schedule Interview </p>
                </ListGroup.Item>
                <ListGroup.Item action href="./assignInterview">
                  <p style={para}> Assign Interview </p>
                </ListGroup.Item>
              </ListGroup>
            </td>
            <td style={para} width="700">
              <p style={para}>Process Completed</p>
              <tr>
                <td width="37%" style={para1}>
                  Name
                </td>
                <td width="37%" style={para1}>
                  Email
                </td>
                <td width="35%" style={para1}>
                  Feedback Report
                </td>
              </tr>
              {details_completed}
              <p style={para}>Process Pending</p>
              <tr>
                <td width="500" style={para1}>
                  Name
                </td>
                <td width="500" style={para1}>
                  Email
                </td>
              </tr>
              {details_pending}
            </td>
          </tr>
        </Table>
      </div>
    );
  }
}
const group = {
  width: 320,
  height: 700
};
const para = {
  fontfamily: "Arial, Helvetica, sans-serif",
  fontSize: 30,
  textAlign: "center",
  padding: 10,
  margin: 10,
  display: "inline-block",
  verticalAllign: "middle"
};
const para1 = {
  fontfamily: "Arial, Helvetica, sans-serif",
  fontSize: 20,
  textAlign: "center",
  padding: 10,
  margin: 10,

  verticalAllign: "middle"
};
export default ViewCandidates;