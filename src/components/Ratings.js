import React, { Component } from 'react';
import { ref, push, set, onValue } from "firebase/database";

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSongId: '',
      rating: '1',
      comment: '',
      selectedSong: null,
      fetchedRatings: []
    };

    this.handleSongChange = this.handleSongChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchRatings();
  }

  fetchRatings = () => {
    const ratingsRef = ref(this.props.database, 'ratings');
    onValue(ratingsRef, (snapshot) => {
      const data = snapshot.val();
      const ratingsList = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key],
        submittedAt: new Date(data[key].submittedAt)
      })) : [];
      // Sort ratings by submittedAt in descending order
      ratingsList.sort((a, b) => b.submittedAt - a.submittedAt);
      this.setState({ fetchedRatings: ratingsList });
    });
  };

  handleSongChange(event) {
    const selectedSong = this.props.hits.find(song => song.rank.toString() === event.target.value);
    this.setState({ selectedSongId: event.target.value, selectedSong });
  }

  handleRatingChange(event) {
    this.setState({ rating: event.target.value });
  }

  handleCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const newRatingRef = push(ref(this.props.database, 'ratings'));
    set(newRatingRef, {
      songId: this.state.selectedSongId,
      songTitle: this.state.selectedSong.title,
      songArtist: this.state.selectedSong.artist,
      songImageUrl: this.state.selectedSong.imageUrl,
      rating: this.state.rating,
      comment: this.state.comment,
      submittedAt: new Date().toISOString()
    })
    .then(() => {
      alert("Your rating has been successfully submitted!");
      this.fetchRatings(); // Re-fetch ratings to include the new submission
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      alert("Error submitting your rating. Please try again.");
    });
  }

  renderSongOptions() {
    return this.props.hits.map((song, index) => (
      <option key={index} value={song.rank}>
        {song.title} by {song.artist}
      </option>
    ));
  }

  renderStars(rating) {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? 'rgb(252, 204, 49)' : 'grey' }}>★</span>
      );
    }
    return stars;
  }

  render() {
    const { selectedSong, fetchedRatings } = this.state;

    return (
      <div className="ratings-content">
        <h2>Leave a Rating</h2>
        <h3>Select a song and rate it!</h3>

        <div className="select-song">
          <label htmlFor="song-select">Select a Song: </label>
          <select className="song-select-bar" value={this.state.selectedSongId} onChange={this.handleSongChange}>
            <option value="">- Please choose a song -</option>
            {this.renderSongOptions()}
          </select>
        </div>

        {selectedSong && (
          <div className="album-cover">
            <img src={selectedSong.imageUrl} alt={`${selectedSong.title} by ${selectedSong.artist} Album Cover`} />
          </div>
        )}

        <div className="forum-box">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="rating">Your Rating:</label>
              <select id="rating" value={this.state.rating} onChange={this.handleRatingChange}>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <div>
              <label htmlFor="comment">Your Comment:</label>
              <textarea id="comment" name="comment" rows="4" value={this.state.comment} onChange={this.handleCommentChange} placeholder="Type your message here..."></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>

        {/* Display fetched ratings */}
        <div className="ratings-list">
          {fetchedRatings.map(rating => (
            <div key={rating.id} className="rating-item">
              <img src={rating.songImageUrl} alt="Album cover" style={{ width: "50px", height: "50px" }} />
              <p><strong>{rating.songTitle} by {rating.songArtist}</strong></p>
              <p>{this.renderStars(rating.rating)}</p>
              <p>"{rating.comment}"</p>
              <p>{rating.submittedAt.toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Ratings;
