const Filter = ({setSearch}) => {

    const handleSearch = (event) => {
      const searchInput = event.target.value;
      setSearch(searchInput);
  };
    return (
        <div>
        <form>
          <div>
            filter shown with <input className="search" onChange={handleSearch} />
          </div>
        </form>

        </div>
    )
}

export default Filter
