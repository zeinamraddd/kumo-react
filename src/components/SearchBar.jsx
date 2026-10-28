export default function SearchBar({ city, setCity, onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearch();
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label htmlFor="city-input">
        City name
      </label>

      <div className="search-row">
        <input
          id="city-input"
          name="city"
          type="text"
          placeholder="Try Beirut, Paris, Tokyo..."
          autoComplete="off"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button type="submit">
          Search
        </button>
      </div>
    </form>
  );
}
