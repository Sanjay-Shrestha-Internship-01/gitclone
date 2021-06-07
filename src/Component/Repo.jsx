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
    languageInput: "",
    typeInput: "",
    languages: [],
    searchInput: "",
    filterRepos: [],
  };
  handleSearchInput = (event) => {
    const searchInput = event.target.value;
    this.setState({ searchInput: searchInput });
    this.filterRepos(
      this.state.languageInput,
      this.state.typeInput,
      searchInput
    );
  };
  handleTypeInput = (event) => {
    const typeInput = event.target.value;
    this.setState({ typeInput: typeInput });
    this.filterRepos(
      this.state.languageInput,
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

  filterRepos = (languageInput, typeInput, searchInput) => {
    console.log(languageInput, typeInput, searchInput);
    const filterRepos = this.state.repos
      .filter((repo) => {
        if (languageInput == "") {
          return true;
        } else if (languageInput == repo.language) {
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
        } else if (typeInput == "public" && !repo.private) {
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
        } else if (repo.name.toLowerCase().indexOf(searchInput.toLowerCase())> -1) {
          return true;
        } else {
          return false;
        }
      });
      this.setState({filterRepos});
  };

  componentDidMount() {
    axios.get("https://api.github.com/users/sanjshres/repos").then((res) => {
      console.log(res.data);
      this.setState({ repos: res.data, filterRepos: res.data  });
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
    console.log("language", this.state.languages);
  };

  render() {
    return (
      <div className="repo-contain">
        <form action="">
          <input
            type="text"
            id="searchInput"
            value = {this.state.searchInput}
            onChange={this.handleSearchInput}
            placeholder="Find a repository..."
          />

          <select  onChange={this.handleLanguageInput}>
            <optgroup label="Select Type">
              {this.state.languages.map((language) => (
                <option
                  value={this.state.languageInput}
                >
                  {language}
                </option>
              ))}
            </optgroup>
          </select>

          <select  onChange={this.handleTypeInput}>
            <optgroup>
              <option
               
                value={this.state.typeInput}
              >
                All
              </option>
              <option
                value={this.state.typeInput}
              >
                Private
              </option>
              <option
                
                value={this.state.typeInput}
              >
                Public
              </option>
              <option
                
                value={this.state.typeInput}
              >
                Fork
              </option>
            </optgroup>
          </select>
        </form>
        <ul>
          {this.state.filterRepos.map((repo) => (
            <form className="repo-form">
              <div className="repo-title">{repo.name}</div>
              <div>
                <div>{repo.language}</div>
                <div>
                  <relative-time
                    datetime={repo.updated_at}
                    className="no-wrap"
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
