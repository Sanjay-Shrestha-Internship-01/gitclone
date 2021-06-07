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
    this.setState((prevState) => ({
      editUser: {
        ...prevState.editUser,
        [event.target.id]: event.target.value,
      },
    }));
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
          headers: {
            Authorization:
              "Bearer " + "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",
          },
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
        this.setState({ user: res.data });
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
                  <input
                    type="text"
                    id="company"
                    defaultValue={this.state.user.company}
                    onChange={this.handleOnChange}
                    placeholder="Company"
                  />
                </div>
                <div>
                  <label htmlFor="location"></label>
                  <input
                    type="text"
                    id="location"
                    defaultValue={this.state.user.location}
                    onChange={this.handleOnChange}
                    placeholder="Location"
                  />
                </div>
                <div>
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={this.state.user.email}
                    onChange={this.handleOnChange}
                  />
                </div>
                <div>
                  <label htmlFor="website"></label>
                  <input
                    type="text"
                    id="website"
                    defaultValue={this.state.user.website}
                    onChange={this.handleOnChange}
                    placeholder="Website"
                  />
                </div>
                <div>
                  <label htmlFor="twitterUsername"></label>
                  <input
                    type="text"
                    id="twitterUsername"
                    defaultValue={this.state.user.twitterUsername}
                    onChange={this.handleOnChange}
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
