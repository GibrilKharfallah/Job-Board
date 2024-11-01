const FormFilterAds = ({ search, handleChange }) => {
    return (
        <form action="" className="form-filter-ads">
            <input
                name="search"
                type="text"
                placeholder="Search anything"
                value={search}
                onChange={handleChange}
            />
        </form>
    );
};

export default FormFilterAds;
