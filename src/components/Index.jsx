import React, { useState } from "react";
// import "./style.css";
import "./style.css"
import axios from "axios";

const Index = () => {
    const [inputData, setInputData] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [page, setPage] = useState(1);

    const accessKey = "c90E7JhPQuh1iIvCNywQnXnaI3Nu6XQVYOeTjB2aDgiv6QPCTicD18pO";

    const searchImages = () => {
        const url = `https://api.pexels.com/v1/search?page=${page}&query=${inputData}`;

        axios
            .get(url, {
                headers: {
                    Authorization: accessKey,
                },
            })
            .then((response) => {
                const newResults = response.data.photos;
                setSearchResults(page === 1 ? newResults : searchResults.concat(newResults));
            })
            .catch((error) => {
                console.error("Error fetching images:", error);
            })
            .finally(() => {
                setPage(page + 1);
            });
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setPage(1);
        setSearchResults([]);
        searchImages();
    };

    return (
        <div className="image-search-app">
            <div className="searchContainer">
                <h1 className="image-search-app__title">Image Search App</h1>
                <form onSubmit={handleSearchSubmit} className="image-search-app__form">
                    <input
                        type="text"
                        id="search-input"
                        className="image-search-app__input"
                        placeholder="Search images"
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                    />
                    <button type="submit" id="search-button" className="image-search-app__button">Search</button>
                </form>
            </div>

            <div className="image-search-app__results">
                {searchResults.map((photo) => (
                    <div className="image-search-app__result" key={photo.id}>
                        <img
                            src={photo.src.medium}
                            alt={photo.alt || "Image"}
                            className="image-search-app__image"
                        />
                        <a
                            href={photo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="image-search-app__link"
                        >
                            {photo.alt || "View Image"}
                        </a>
                    </div>
                ))}
            </div>

            {page > 1 && (
                <button
                    id="show-more-button"
                    onClick={searchImages}
                    className="image-search-app__show-more-button">
                    Show more
                </button>
            )}
        </div>

    );
};

export default Index;