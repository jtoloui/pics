import React, { Suspense } from "react";
import Unsplash from "../api/unsplash";
import SearchBar from "./SearchBar";
import LineBreak from "./LineBreak";
const ImageList = React.lazy(() => import("./ImageList"));

class App extends React.Component {
	state = {
		images: [],
		error: null,
		noImagesReturned: false,
		lastSearchTerm: "",
	};
	onSearchSubmit = async (term) => {
		try {
			const response = await Unsplash.get("/search/photos", {
				params: {
					query: term,
					per_page: 20,
				},
			});
			this.setState({ lastSearchTerm: term });
			if (response.data.total > 0) {
				this.setState({
					images: response.data.results,
					error: null,
					noImagesReturned: false,
				});
			} else {
				this.setState({
					images: [],
					error: null,
					noImagesReturned: true,
				});
			}
		} catch (error) {
			this.setState({ lastSearchTerm: term });
			this.setState({ error, images: [] });
		}
	};
	render() {
		console.log(2, this.state.images);

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
					<LineBreak class="bx--col-xs-11 bx--col-sm-11 bx--col-md-11 bx--col-lg-11" />
					{this.state.error && (
						<div class="ui error message">
							<div class="header">Whoops</div>
							<p>
								{`Looks like we are experiencing some issues with
								your search for "${this.state.lastSearchTerm}". Please try again later.`}
							</p>
						</div>
					)}
					{this.state.noImagesReturned ? (
						<div className="ui warning message">
							<div class="header">Whoops</div>
							<p>{`Looks like we could find any images for "${this.state.lastSearchTerm}". Please search for another image.`}</p>
						</div>
					) : (
						<ImageList images={this.state.images} />
					)}
				</Suspense>
			</div>
		);
	}
}

export default App;
