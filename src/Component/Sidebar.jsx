import React, { Component } from "react";
import axios from "axios";
import { configure } from "@testing-library/dom";

export default class Sidebar extends Component {
  constructor() {
    super();
  }
  state = {
    user: {},
    editUser: {
      bio: "",
      company: "",
      location: "",
      email: "",
      website: "",
      twitterUsername: "",
    },
    star: [],
    isEditMode: false,
  };
  handleOnChange = (event) => {
    this.setState({ bio: event.target.value });
    console.log(this.state.bio);
  };

  handleOnEdit = () => {
    this.setState({ isEditMode: true });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    const editUser = this.state.editUser;
    axios
      .patch(
        "https://api.github.com/user",
        { ...editUser },
        {
          headers: new Headers({
            Authorization:
              "Bearer " + "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",
            // "Content-Type": "application/json",
          }),
        }
      )
      .then((res) => {
        this.setState({
          editUser: {
            bio: "",
            company: "",
            location: "",
            email: "",
            website: "",
            twitterUsername: "",
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ isEditMode: false });
  };

  handleOnCancel = () => {
    this.setState({ isEditMode: false });
  };

  componentDidMount() {
    axios.get("https://api.github.com/users/sanjshres").then((profile) => {
      console.log(profile);
      this.setState({ user: profile.data });
    });
    axios
      .get("https://api.github.com/users/sanjshres/starred")
      .then((starred) => {
        console.log(starred);
        this.setState({ star: starred.data });
      });
  }

  render() {
    return (
      <div className="sidebar">
        <div>
          <img class="profile-pic" src={this.state.user.avatar_url} alt="" />

          <h1>{this.state.user.login}</h1>

          {this.state.isEditMode ? (
            <>
              <form onSubmit={this.handleOnSubmit}>
                <textarea
                  defaultValue={this.state.user.bio}
                  onChange={this.handleOnChange}
                  id="bio"
                ></textarea>
                <div>
                  <label htmlFor="company"></label>
                  <input type="text" id="company" placeholder="Company" />
                </div>
                <div>
                  <label htmlFor="location"></label>
                  <input type="text" id="location" placeholder="Location" />
                </div>
                <div>
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={this.state.user.email}
                  />
                </div>
                <div>
                  <label htmlFor="website"></label>
                  <input type="text" id="website" placeholder="Website" />
                </div>
                <div>
                  <label htmlFor="twitterUsername"></label>
                  <input
                    type="text"
                    id="twitterUsername"
                    placeholder="Twitter username"
                  />
                </div>
                <button type="submit">Save</button>
                <button onClick={() => this.handleOnCancel()}>Cancel</button>
              </form>
            </>
          ) : (
            <>
              <p>{this.state.user.bio}</p>
              <button onClick={() => this.handleOnEdit()}>Edit Profile</button>
              <span>{this.state.user.followers} follower</span>
              <span>{this.state.user.following} following</span>
              <span>{this.state.star.length}</span>
              <p>{this.state.user.email}</p>
            </>
          )}
        </div>
      </div>
    );
  }
}
