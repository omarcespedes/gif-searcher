import React, { Component } from "react";
import "./App.css";
import axios from "axios";

import Gif from "./components/Gif";

class App extends Component {
  state = {
    searchText: "",
    gifs: []
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Search a gif</h1>
        <div>
          <input
            type="text"
            placeholder="Suprise me"
            value={this.state.searchText}
            onChange={this.handleChangeSearchText}
            onKeyPress={this.onSearchGif}
          />
        </div>
        <div>
          {this.state.gifs.map((gif, i) => (
            <Gif key={i} source={gif.source} />
          ))}
        </div>
      </div>
    );
  }

  handleChangeSearchText = ev => {
    this.setState({
      searchText: ev.target.value
    });
  };

  onSearchGif = ev => {
    console.log(ev.key);
    if (ev.key === "Enter") {
      this.setState({ gifs: [] });
      axios
        .get("http://api.giphy.com/v1/gifs/search", {
          params: {
            q: this.state.searchText,
            api_key: "rQGDiebjqunPegOuuQnRSXAJ4NjjbVSU",
            limit: 8
          }
        })
        .then(response => {
          const gifs = response.data.data.map(gif => ({
            source: gif.images.fixed_width.webp
          }));
          this.setState({
            gifs
          });
        });
    }
  };
}

export default App;
