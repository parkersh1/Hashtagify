import React from 'react';

function TableBody({ data }) {
  const bodyContent = data.map((song, index) => (
    <tr key={index} className={index === 0 ? "first-ranked-row" : ""}>
      <td>{song.rank}</td>
      <td>
        <a href={song.spotifyLink} target="_blank" rel="noopener noreferrer">
          <img src={song.imageUrl} alt={`${song.title} by ${song.artist} Album cover`} />
        </a>
      </td>
      <td>{song.artist}</td>
      <td>{song.title}</td>
    </tr>
  ));

  return <tbody>{bodyContent}</tbody>;
}

function Home({ hits }) {
  return (
    <section className="home">
      <h2>pythBillboard Top 100 Hits</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Cover</th>
            <th>Artist</th>
            <th>Title</th>
          </tr>
        </thead>
        <TableBody data={hits} />
      </table>
    </section>
  );
}

export default Home;
