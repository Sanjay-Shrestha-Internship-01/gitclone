import React, { Component } from "react";
import axios from "axios";
import { configure } from "@testing-library/dom";

export default class Repo extends Component {
  constructor() {
    super();
  }
  state = {
    repos: [],
    copyRepos: [],
    lanuguageInput: "",
    typeInput: "",
    language: [],
    searchInput: "",
  };
  handleSearchInput = (event) => {
    const searchInput = event.target.value;
    this.setState({ searchInput: searchInput });
    this.filterRepos(
      this.state.lanugaugeInput,
      this.state.typeInput,
      searchInput
    );
  };
  handleTypeInput = (event) => {
    const typeInput = event.target.value;
    this.setState({ typeInput: typeInput });
    this.filterRepos(
      this.state.lanuguageInput,
      typeInput,
      this.state.searchInput
    );
  };
  handleLanguageInput = (event) => {
    const languageInput = event.target.value;
    this.setState({ languageInput: languageInput });
    this.filterRepos(
      languageInput,
      this.state.typeInput,
      this.state.searchInput
    );
  };

  filterRepos = (lanuguageInput, typeInput, searchInput) => {
    const filterRepos = this.state.repos
      .filter((repo) => {
        if (lanuguageInput == "") {
          return true;
        } else if (lanuguageInput == repo.language) {
          return true;
        } else {
          return false;
        }
      })
      .filter((repo) => {
        if (typeInput == "") {
          return true;
        } else if (typeInput == "private" && repo.private) {
          return true;
        } else if (typeInput == "public" && repo.private) {
          return true;
        } else if (typeInput == "fork" && repo.fork) {
          return true;
        } else {
          return false;
        }
      })
      .filter((repo) => {
        if (searchInput === "") {
          return true;
        } else if (repo.name.toLowerCase().indexOf(searchInput.toLowerCse())) {
          return true;
        } else {
          return false;
        }
      });
  };

  componentDidMount() {
    axios.get("https://api.github.com/users/sanjshres/repos").then((res) => {
      console.log(res.data);
      this.setState({ repos: res.data });
      this.setState({ copyRepos: res.data });
    });
  }

  setLanguageData = () => {
    const uniqueLanguages = this.state.repos.map((repo) => repo.language);
    console.log("uniqueLanguage", uniqueLanguages);
    const language = [];
    if (uniqueLanguages.indexOf(language) === -1) {
      uniqueLanguages.push(language);
    }
    this.setState({
      language: language,
    });
    console.log("language", this.state.language);
  };

  render() {
    return (
      <div class="repo-contain">
        <form action="">
          <input
            type="text"
            id="searchInput"
            value=""
            onchange= {this.handleSearchInput}
            placeholder="Find a repository..."
          />

          <select name="" id="" onChange={this.setLanguageData}>
            <optgroup label="Select Type">
              
              {this.state.language.map((repo) => (
                <option id="language" value="" onchange= {this.handleLanguageInput}>
                  {repo}
                </option>
              ))}
            </optgroup>
          </select>


          <select name="" id="">
              <optgroup>
                  <option onChange={this.handleTypeInput} value="">All</option>
                  <option onChange={this.handleTypeInput} value="">Private</option>
                  <option onChange={this.handleTypeInput} value="">Public</option>
                  <option onChange={this.handleTypeInput} value="">Fork</option>
              </optgroup>
          </select>
        </form>
        <ul>
          {this.state.repos.map((repo) => (
            <form class="repo-form">
              <div className="repo-title">{repo.name}</div>
              <div>
                <div>{repo.language}</div>
                <div>
                  <relative-time
                    datetime={repo.updated_at}
                    class="no-wrap"
                    title="May 20, 2021, 3:56 PM GMT+5:45"
                  ></relative-time>
                  {repo.updated_at}
                </div>
              </div>
            </form>
          ))}
        </ul>
      </div>
    );
  }
}
