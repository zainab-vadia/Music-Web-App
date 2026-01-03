/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Zainab Mustak Vadia
 *      Student ID: 119574234
 *      Date:       19/03/2024
 */

// All of our data is available on the global `window` object.

// Create local variables to work with it in this file.
const { artists, songs } = window;

document.addEventListener("DOMContentLoaded", function () {
  function createArtistButton() {
    const menu = document.getElementById("menu");

    if (artists && artists.length) {
      artists.forEach((artist) => {
        const button = document.createElement("button");
        button.textContent = artist.name;
        button.addEventListener("click", () => displayArtistSongsInfo(artist));
        menu.appendChild(button);
      });
    }
  }

  function createSongCard(song) {
    const songCardContainer = document.createElement("div");
    songCardContainer.classList.add("card");

    const imageLink = document.createElement("a");
    imageLink.href = song.url;
    imageLink.target = "_blank";

    const img = document.createElement("img");
    img.classList.add("card-image");
    img.src = song.imageUrl;
    img.alt = song.title;

    imageLink.appendChild(img);
    songCardContainer.appendChild(imageLink);

    const horizontalLine = document.createElement("hr");
    horizontalLine.classList.add("horizontal-line");
    songCardContainer.appendChild(horizontalLine);

    const songInfo = document.createElement("div");
    songInfo.classList.add("song-info");

    const songTitleLink = document.createElement("a");
    songTitleLink.href = song.url;
    songTitleLink.textContent = song.title;
    songTitleLink.target = "_blank";
    songTitleLink.classList.add("song-title");

    songInfo.appendChild(songTitleLink);

    const yearDurationContainer = document.createElement("div");
    yearDurationContainer.classList.add("year-duration-container");

    const yearReleased = document.createElement("time");
    yearReleased.classList.add("year-released");
    yearReleased.textContent = song.year;
    yearDurationContainer.appendChild(yearReleased);

    const duration = document.createElement("span");
    duration.classList.add("duration");
    duration.textContent = durationMinutesSeconds(song.duration);
    yearDurationContainer.appendChild(duration);
    songInfo.appendChild(yearDurationContainer);

    songCardContainer.appendChild(songInfo);

    return songCardContainer;
  }

  function displayArtistSongsInfo(artist) {
    const selectedArtist = document.getElementById("selected-artist");
    selectedArtist.textContent = artist.name;
    const artistLinks = artist.urls
      .map((link) => `<a href="${link.url}" target="_blank">${link.name}</a>`)
      .join(", ");
    selectedArtist.innerHTML += ` (${artistLinks})`;

    const cardContainer = document.getElementById("cards");
    cardContainer.innerHTML = "";

    const filteredSongs = songs.filter(
      (song) => song.artistId === artist.artistId && !song.explicit,
    );

    filteredSongs.forEach((song) => {
      const songCard = createSongCard(song);
      cardContainer.appendChild(songCard);
    });
  }

  function durationMinutesSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemain = seconds % 60;
    return `${minutes}:${secondsRemain.toString().padStart(2, "0")}`;
  }

  createArtistButton();
  displayArtistSongsInfo(window.artists[0]);
  const container = document.getElementById("request");

  const buttonLink = document.createElement("a");
  buttonLink.href = "requestArtist.html";
  buttonLink.textContent = "Request a New Artist";
  container.appendChild(buttonLink);
});
