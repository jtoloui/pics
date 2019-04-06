import React, { Suspense } from "react";
import Unsplash from "../api/unsplash";
import SearchBar from "./SearchBar";
import LineBreak from './LineBreak';
const ImageList = React.lazy(() => import("./ImageList"));

class App extends React.Component {
  state = { images: [] };
  onSearchSubmit = async term => {
    const response = await Unsplash.get("/search/photos", {
      params: {
        query: term,
        per_page: 20
      }
    });
    this.setState({ images: response.data.results });
  };
  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <Suspense
          fallback={
            <div className="ui active dimmer">
              <div className="ui big text loader">Loading...</div>
            </div>
          }
        >
          <SearchBar onSubmit={this.onSearchSubmit} />
          <LineBreak class="col-9 col-sm-11 col-md-11"></LineBreak>
          <ImageList images={this.state.images} />
        </Suspense>
      </div>
    );
  }
}

export default App;
